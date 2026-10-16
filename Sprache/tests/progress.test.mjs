import assert from 'node:assert/strict';
import test from 'node:test';
import { activities } from '../data/Activities.js';
import { vocabularyLesson } from '../data/lessons.js';
import { getActivities, filterActivities, getRecommendedActivity } from '../services/activityService.js';
import { getLessonByActivityId } from '../services/lessonService.js';
import { buildLessonCompletion, calculateSessionSummary } from '../services/lessonProgressService.js';
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

test('completar una lección registra duración, aciertos, vocabulario y práctica por palabra', () => {
  const completion = buildLessonCompletion(vocabularyLesson, ['Haus', 'Puerta', 'Morgen'], undefined, [true, false, true]);
  const updatedUser = recordActivity(emptyUser, completion, referenceDate);
  const [session] = updatedUser.sessions;

  assert.equal(session.activityId, vocabularyLesson.activityId);
  assert.equal(session.completedAt, referenceDate.toISOString());
  assert.equal(session.durationMinutes, vocabularyLesson.durationMinutes);
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
  assert.equal(updatedUser.studiedMinutes, vocabularyLesson.durationMinutes);
  assert.equal(updatedUser.learnedWords, 2);
  assert.equal(updatedUser.todayMinutes, vocabularyLesson.durationMinutes);
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

test('el progreso semanal y la racha se derivan de fechas de sesiones', () => {
  const yesterday = new Date(2026, 9, 13, 12, 0, 0).toISOString();
  const today = referenceDate.toISOString();
  const sessions = [
    { completedAt: yesterday, durationMinutes: 8, learnedWords: [{ term: 'Haus' }] },
    { completedAt: today, durationMinutes: 5, learnedWords: [{ term: 'Buch' }] },
  ];
  const metrics = deriveProgress({ ...emptyUser, sessions }, referenceDate);
  const week = getWeeklyActivity(sessions, referenceDate);

  assert.equal(metrics.studiedMinutes, 13);
  assert.equal(metrics.todayMinutes, 5);
  assert.equal(metrics.learnedWords, 2);
  assert.equal(metrics.streak, 2);
  assert.equal(week.length, 7);
  assert.equal(week[1].minutes, 8);
  assert.equal(week[2].minutes, 5);
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
    sessions: [{ completedAt: referenceDate.toISOString(), durationMinutes: 5, learnedWords: [] }],
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
  assert.equal(reset.todayMinutes, 0);
  assert.equal(reset.studiedMinutes, 0);
  assert.equal(reset.learnedWords, 0);
  assert.equal(reset.streak, 0);
});
