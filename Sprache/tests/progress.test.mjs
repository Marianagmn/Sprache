import assert from 'node:assert/strict';
import test from 'node:test';
import { activities } from '../data/Activities.js';
import { vocabularyLesson } from '../data/lessons.js';
import { getActivities, filterActivities, getRecommendedActivity } from '../services/activityService.js';
import { getLessonByActivityId } from '../services/lessonService.js';
import { buildLessonCompletion, calculateSessionSummary } from '../services/lessonProgressService.js';
import { getSpacedReviewLesson } from '../services/lessonService.js';
import { calculateNextReview, getDueWords } from '../services/spacedRepetitionService.js';
import { deriveProgress, getWeeklyActivity, recordActivity, resetProgress } from '../services/progressService.js';

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
    },
    buch: {
      term: 'Buch',
      translation: 'libro',
      correctAnswers: 0,
      mistakes: 1,
      hints: 0,
      lastPracticedAt: referenceDate.toISOString(),
    },
    'guten morgen': {
      term: 'Guten Morgen',
      translation: 'buenos días',
      correctAnswers: 1,
      mistakes: 0,
      hints: 1,
      lastPracticedAt: referenceDate.toISOString(),
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
