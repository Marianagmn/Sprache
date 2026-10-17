import assert from 'node:assert/strict';
import test from 'node:test';
import { activities } from '../data/Activities.js';
import { lessons, vocabularyLesson } from '../data/lessons.js';
import { getActivities, filterActivities, getRecommendedActivity } from '../services/activityService.js';
import { getLessonByActivityId } from '../services/lessonService.js';
import { buildLessonCompletion, calculateSessionSummary } from '../services/lessonProgressService.js';
import { getSpacedReviewLesson } from '../services/lessonService.js';
import { calculateNextReview, getDueWords } from '../services/spacedRepetitionService.js';
import { evaluatePlacement, PLACEMENT_QUESTIONS, skipPlacementAssessment } from '../services/placementAssessmentService.js';
import { getLearningPath, LEARNING_LEVELS } from '../services/learningPathService.js';
import { deriveProgress, getWeeklyActivity, recordActivity, resetProgress } from '../services/progressService.js';
import { getAchievements, getExperience, getNewlyUnlockedAchievements, getWeeklyChallenges } from '../services/achievementService.js';

const referenceDate = new Date(2026, 9, 14, 12, 0, 0);

const emptyUser = {
  dailyGoal: 10,
  sessions: [],
  todayMinutes: 0,
  studiedMinutes: 0,
  learnedWords: 0,
  streak: 0,
};

test('el catálogo tiene IDs únicos y cada actividad apunta a una lección', () => {
  const listedActivities = getActivities();
  const ids = listedActivities.map((activity) => activity.id);

  assert.deepEqual(ids, activities.map((activity) => activity.id));
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(listedActivities.every((activity) => getLessonByActivityId(activity.id)));
  assert.equal(getRecommendedActivity([]).id, vocabularyLesson.activityId);
});

test('las diez lecciones nuevas están completas y accesibles desde el catálogo y la ruta', () => {
  assert.equal(lessons.length, 26);
  assert.equal(activities.length, 26);
  assert.ok(lessons.every((lesson) => lesson.questions.length >= 3));
  assert.ok(lessons.every((lesson) => lesson.questions.every((question) => (
    question.options.includes(question.answer)
    && question.vocabulary?.term
    && question.vocabulary?.translation
    && question.hint
  ))));
  assert.equal(LEARNING_LEVELS[1].activityIds.length, 21);
});

test('los filtros devuelven solo la categoría seleccionada', () => {
  const vocabActivities = activities.filter((activity) => activity.category === 'Vocabulario');
  const readingActivities = activities.filter((activity) => activity.category === 'Lectura');
  const grammarActivities = activities.filter((activity) => activity.category === 'Gramática');

  assert.deepEqual(filterActivities(activities, 'Todos'), activities);
  assert.deepEqual(filterActivities(activities, 'Vocabulario'), vocabActivities);
  assert.deepEqual(filterActivities(activities, 'Lectura'), readingActivities);
  assert.deepEqual(filterActivities(activities, 'Gramática'), grammarActivities);
});

test('una actividad desconocida no abre otra lección por defecto', () => {
  assert.equal(getLessonByActivityId('not-yet-implemented'), null);
});

test('completar una lección registra duración real, aciertos, vocabulario y práctica por palabra', () => {
  const completion = buildLessonCompletion(vocabularyLesson, ['Haus', 'Puerta', 'Morgen'], undefined, [true, false, true], 93);
  const updatedUser = recordActivity(emptyUser, completion, referenceDate);
  const [session] = updatedUser.sessions;

  assert.equal(session.activityId, vocabularyLesson.activityId);
  assert.equal(session.completedAt, referenceDate.toISOString());
  assert.equal(session.durationSeconds, 93);
  assert.equal(session.durationSource, 'measured');
  assert.equal(session.correctAnswers, 2);
  assert.equal(session.totalQuestions, vocabularyLesson.questions.length);
  assert.deepEqual(session.learnedWords, [
    vocabularyLesson.questions[0].vocabulary,
    vocabularyLesson.questions[2].vocabulary,
  ]);
  assert.deepEqual(updatedUser.wordProgress, {
    haus: {
      term: 'Haus',
      translation: 'casa',
      correctAnswers: 1,
      mistakes: 0,
      hints: 1,
      lastPracticedAt: referenceDate.toISOString(),
      reviewStreak: 0,
      intervalMinutes: 240,
      nextReviewAt: new Date(referenceDate.getTime() + 4 * 60 * 60 * 1000).toISOString(),
    },
    buch: {
      term: 'Buch',
      translation: 'libro',
      correctAnswers: 0,
      mistakes: 1,
      hints: 0,
      lastPracticedAt: referenceDate.toISOString(),
      reviewStreak: 0,
      intervalMinutes: 10,
      nextReviewAt: new Date(referenceDate.getTime() + 10 * 60 * 1000).toISOString(),
    },
    'guten morgen': {
      term: 'Guten Morgen',
      translation: 'buenos días',
      correctAnswers: 1,
      mistakes: 0,
      hints: 1,
      lastPracticedAt: referenceDate.toISOString(),
      reviewStreak: 0,
      intervalMinutes: 240,
      nextReviewAt: new Date(referenceDate.getTime() + 4 * 60 * 60 * 1000).toISOString(),
    },
  });
  assert.equal(updatedUser.studiedSeconds, 93);
  assert.equal(updatedUser.studiedMinutes, 93 / 60);
  assert.equal(updatedUser.learnedWords, 2);
  assert.equal(updatedUser.todaySeconds, 93);
  assert.equal(updatedUser.totalSessions, 1);
  assert.equal(updatedUser.totalQuestions, 3);
  assert.equal(updatedUser.correctAnswers, 2);
  assert.equal(updatedUser.accuracy, 67);
  assert.equal(updatedUser.streak, 1);
});

test('repetir una palabra acumula intentos y actualiza su última fecha', () => {
  const firstAttempt = recordActivity(emptyUser, {
    wordResults: [{ term: 'Haus', translation: 'casa', correct: false, hintUsed: true }],
  }, referenceDate);
  const nextDate = new Date(2026, 9, 15, 12, 0, 0);
  const secondAttempt = recordActivity(firstAttempt, {
    wordResults: [{ term: 'haus', translation: 'casa', correct: true, hintUsed: false }],
  }, nextDate);

  assert.deepEqual(secondAttempt.wordProgress.haus, {
    term: 'Haus',
    translation: 'casa',
    correctAnswers: 1,
    mistakes: 1,
    hints: 1,
    lastPracticedAt: nextDate.toISOString(),
    reviewStreak: 1,
    intervalMinutes: 24 * 60,
    nextReviewAt: new Date(nextDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
  });
});

test('los errores y las pistas programan repasos más próximos que los aciertos sólidos', () => {
  const difficult = calculateNextReview({}, { correct: false }, referenceDate);
  const hinted = calculateNextReview({}, { correct: true, hintUsed: true }, referenceDate);
  const mastered = calculateNextReview({ reviewStreak: 2 }, { correct: true }, referenceDate);

  assert.equal(difficult.intervalMinutes, 10);
  assert.equal(hinted.intervalMinutes, 240);
  assert.equal(mastered.intervalMinutes, 7 * 24 * 60);
  assert.equal(new Date(difficult.nextReviewAt).getTime() - referenceDate.getTime(), 10 * 60 * 1000);
});

test('el repaso elige primero las palabras difíciles que ya vencieron', () => {
  const wordProgress = {
    haus: {
      term: 'Haus', correctAnswers: 4, mistakes: 0, hints: 0,
      lastPracticedAt: referenceDate.toISOString(), nextReviewAt: new Date(referenceDate.getTime() - 1000).toISOString(),
    },
    buch: {
      term: 'Buch', correctAnswers: 1, mistakes: 3, hints: 2,
      lastPracticedAt: referenceDate.toISOString(), nextReviewAt: new Date(referenceDate.getTime() - 1000).toISOString(),
    },
    morgen: {
      term: 'Guten Morgen', correctAnswers: 0, mistakes: 1, hints: 0,
      lastPracticedAt: referenceDate.toISOString(), nextReviewAt: new Date(referenceDate.getTime() + 60000).toISOString(),
    },
  };
  const dueWords = getDueWords(wordProgress, referenceDate);
  const reviewLesson = getSpacedReviewLesson(wordProgress, referenceDate);

  assert.deepEqual(dueWords.map((word) => word.term), ['Buch', 'Haus']);
  assert.deepEqual(reviewLesson.questions.map((question) => question.vocabulary.term), ['Buch', 'Haus']);
  assert.equal(reviewLesson.activityId, 'spaced-review');
});

test('la evaluación inicial recomienda A1 o A2 según las respuestas correctas', () => {
  const beginner = evaluatePlacement(['Casa', 'incorrecta', 'incorrecta'], referenceDate);
  const readyForA2 = evaluatePlacement(PLACEMENT_QUESTIONS.map((question) => question.answer), referenceDate);
  const skipped = skipPlacementAssessment(referenceDate);

  assert.equal(beginner.recommendedLevel, 'A1');
  assert.equal(beginner.correctAnswers, 1);
  assert.equal(readyForA2.recommendedLevel, 'A2');
  assert.equal(readyForA2.correctAnswers, PLACEMENT_QUESTIONS.length);
  assert.equal(skipped.recommendedLevel, 'A1');
  assert.equal(skipped.source, 'self-selected');
});

test('la ruta desbloquea lecciones en orden y respeta el nivel recomendado', () => {
  const initialA1Path = getLearningPath([], { recommendedLevel: 'A1' });
  const a1Ids = LEARNING_LEVELS[0].activityIds;
  const completedA1Sessions = a1Ids.map((activityId) => ({ activityId }));
  const advancedPath = getLearningPath([], { recommendedLevel: 'A2' });
  const unlockedA2Path = getLearningPath(completedA1Sessions, { recommendedLevel: 'A1' });

  assert.equal(initialA1Path.nextLesson.id, a1Ids[0]);
  assert.equal(initialA1Path.levels[1].status, 'locked');
  assert.equal(advancedPath.nextLesson.levelCode, 'A2');
  assert.equal(advancedPath.levels[0].status, 'review');
  assert.equal(unlockedA2Path.nextLesson.id, LEARNING_LEVELS[1].activityIds[0]);
  assert.equal(unlockedA2Path.levels[1].status, 'available');
});

test('la ruta agrupa una sola vez todas las lecciones del catálogo', () => {
  const activityIds = LEARNING_LEVELS.flatMap((level) => level.activityIds);
  assert.equal(new Set(activityIds).size, activityIds.length);
  assert.deepEqual([...activityIds].sort(), activities.map((activity) => activity.id).sort());
});

test('el progreso semanal y la racha se derivan de fechas de sesiones', () => {
  const yesterday = new Date(2026, 9, 13, 12, 0, 0).toISOString();
  const today = referenceDate.toISOString();
  const sessions = [
    { completedAt: yesterday, durationSeconds: 480, totalQuestions: 4, correctAnswers: 3, learnedWords: [{ term: 'Haus' }] },
    { completedAt: today, durationSeconds: 300, totalQuestions: 3, correctAnswers: 2, learnedWords: [{ term: 'Buch' }] },
  ];
  const metrics = deriveProgress({ ...emptyUser, sessions }, referenceDate);
  const week = getWeeklyActivity(sessions, referenceDate);

  assert.equal(metrics.studiedMinutes, 13);
  assert.equal(metrics.studiedSeconds, 780);
  assert.equal(metrics.todayMinutes, 5);
  assert.equal(metrics.totalSessions, 2);
  assert.equal(metrics.totalQuestions, 7);
  assert.equal(metrics.correctAnswers, 5);
  assert.equal(metrics.accuracy, 71);
  assert.equal(metrics.learnedWords, 2);
  assert.equal(metrics.streak, 2);
  assert.equal(week.length, 7);
  assert.equal(week[1].seconds, 480);
  assert.equal(week[1].sessions, 1);
  assert.equal(week[2].seconds, 300);
});

test('las sesiones antiguas sin tiempo medido no suman minutos estimados', () => {
  const sessions = [{
    completedAt: referenceDate.toISOString(),
    durationMinutes: vocabularyLesson.durationMinutes,
    totalQuestions: 3,
    correctAnswers: 2,
  }];
  const metrics = deriveProgress({ ...emptyUser, sessions }, referenceDate);
  const week = getWeeklyActivity(sessions, referenceDate);

  assert.equal(metrics.studiedSeconds, 0);
  assert.equal(metrics.todaySeconds, 0);
  assert.equal(metrics.totalSessions, 1);
  assert.equal(metrics.accuracy, 67);
  assert.equal(week[2].seconds, 0);
  assert.equal(week[2].sessions, 1);
});

test('las metas diarias se comprueban con el tiempo real acumulado por día', () => {
  const anotherDay = new Date(2026, 9, 15, 12, 0, 0).toISOString();
  const sessions = [
    { completedAt: referenceDate.toISOString(), durationSeconds: 120, dailyGoalMinutes: 5 },
    { completedAt: referenceDate.toISOString(), durationSeconds: 180, dailyGoalMinutes: 5 },
    { completedAt: anotherDay, durationSeconds: 299, dailyGoalMinutes: 5 },
  ];
  const metrics = deriveProgress({ ...emptyUser, sessions }, referenceDate);

  assert.equal(metrics.goalDaysReached, 1);
  assert.equal(metrics.goalDaysTracked, 2);
});

test('la experiencia reconoce práctica completada, tiempo dedicado y aciertos', () => {
  const sessions = [
    { completedAt: referenceDate.toISOString(), correctAnswers: 3 },
    { completedAt: referenceDate.toISOString(), correctAnswers: 7 },
  ];
  const experience = getExperience(sessions);

  assert.equal(getExperience([]).xp, 0);
  assert.equal(experience.xp, 140);
  assert.equal(experience.level, 2);
  assert.equal(experience.progressToNextLevel, 40);
  assert.equal(experience.completedSessions, 2);
  assert.equal(getExperience([{
    completedAt: referenceDate.toISOString(),
    correctAnswers: 0,
    durationSeconds: 300,
  }]).xp, 25);
});

test('los retos semanales reconocen días, prácticas, tiempo y palabras distintas', () => {
  const sessions = [
    {
      completedAt: new Date(2026, 9, 12, 12).toISOString(),
      correctAnswers: 0,
      durationSeconds: 600,
      learnedWords: [{ term: 'Haus' }, { term: 'Buch' }],
    },
    {
      completedAt: new Date(2026, 9, 14, 12).toISOString(),
      correctAnswers: 0,
      durationSeconds: 300,
      learnedWords: [{ term: 'haus' }, { term: 'Morgen' }, { term: 'Brot' }],
    },
    {
      completedAt: new Date(2026, 9, 11, 12).toISOString(),
      correctAnswers: 0,
      durationSeconds: 600,
      learnedWords: [{ term: 'Wasser' }],
    },
  ];
  const challenges = getWeeklyChallenges(sessions, referenceDate);

  assert.deepEqual(challenges.map(({ id, progress, completed }) => ({ id, progress, completed })), [
    { id: 'practice-days', progress: 2, completed: false },
    { id: 'completed-sessions', progress: 2, completed: false },
    { id: 'practice-time', progress: 15, completed: true },
    { id: 'new-words', progress: 4, completed: false },
  ]);
});

test('los avisos de celebración aparecen al desbloquear retos o insignias, no en cada visita', () => {
  const previousSessions = [
    { completedAt: new Date(2026, 9, 12, 12).toISOString(), durationSeconds: 600, learnedWords: [{ term: 'Haus' }] },
    { completedAt: new Date(2026, 9, 14, 12).toISOString(), durationSeconds: 300, learnedWords: [{ term: 'Buch' }] },
  ];
  const currentSessions = [
    ...previousSessions,
    { completedAt: new Date(2026, 9, 16, 12).toISOString(), durationSeconds: 60, learnedWords: [{ term: 'Brot' }] },
  ];
  const notices = getNewlyUnlockedAchievements(previousSessions, currentSessions, referenceDate);
  const noticeIds = notices.map((notice) => notice.id);
  const firstSessionNotices = getNewlyUnlockedAchievements([], previousSessions, referenceDate).map((notice) => notice.id);

  assert.ok(firstSessionNotices.includes('badge-first-session'));
  assert.ok(noticeIds.includes('challenge-completed-sessions'));
  assert.ok(noticeIds.includes('challenge-practice-days'));
  assert.ok(!noticeIds.includes('challenge-practice-time'));
  assert.deepEqual(getNewlyUnlockedAchievements(currentSessions, currentSessions, referenceDate), []);
});

test('las insignias se obtienen por logros históricos', () => {
  const sessions = [
    { completedAt: new Date(2026, 9, 12, 12).toISOString(), correctAnswers: 3, totalQuestions: 3, learnedWords: [{ term: 'Haus' }, { term: 'Buch' }] },
    { completedAt: new Date(2026, 9, 13, 12).toISOString(), correctAnswers: 2, totalQuestions: 3, learnedWords: [{ term: 'Morgen' }] },
    { completedAt: new Date(2026, 9, 14, 12).toISOString(), correctAnswers: 1, totalQuestions: 2, learnedWords: [{ term: 'Wasser' }] },
  ];
  const badges = getAchievements(sessions);

  assert.equal(badges.find((badge) => badge.id === 'first-session').earned, true);
  assert.equal(badges.find((badge) => badge.id === 'perfect-session').earned, true);
  assert.equal(badges.find((badge) => badge.id === 'three-day-streak').earned, true);
  assert.equal(badges.find((badge) => badge.id === 'ten-sessions').earned, false);
});

test('el resumen limita aciertos y maneja sesiones sin preguntas', () => {
  assert.deepEqual(calculateSessionSummary(2, 3), {
    correctAnswers: 2,
    totalQuestions: 3,
    percentage: 67,
  });
  assert.deepEqual(calculateSessionSummary(5, 0), {
    correctAnswers: 0,
    totalQuestions: 0,
    percentage: 0,
  });
});

test('reiniciar progreso conserva perfil/meta y borra las sesiones', () => {
  const user = {
    ...emptyUser,
    name: 'Mariana',
    sessions: [{ completedAt: referenceDate.toISOString(), durationSeconds: 300, learnedWords: [] }],
    wordProgress: { haus: { correctAnswers: 2 } },
    todayMinutes: 5,
    studiedMinutes: 5,
    learnedWords: 0,
    streak: 1,
  };
  const reset = resetProgress(user);

  assert.equal(reset.name, 'Mariana');
  assert.equal(reset.dailyGoal, 10);
  assert.deepEqual(reset.sessions, []);
  assert.deepEqual(reset.wordProgress, {});
  assert.equal(reset.studiedSeconds, 0);
  assert.equal(reset.todaySeconds, 0);
  assert.equal(reset.totalSessions, 0);
  assert.equal(reset.goalDaysReached, 0);
  assert.equal(reset.goalDaysTracked, 0);
  assert.equal(reset.todayMinutes, 0);
  assert.equal(reset.studiedMinutes, 0);
  assert.equal(reset.learnedWords, 0);
  assert.equal(reset.streak, 0);
});
