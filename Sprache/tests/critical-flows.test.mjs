import assert from 'node:assert/strict';
import test from 'node:test';
import { createAuthService } from '../services/authServiceCore.js';
import { buildLessonCompletion } from '../services/lessonProgressService.js';
import { getLessonByActivityId } from '../services/lessonService.js';
import { updateProfile } from '../services/profileService.js';
import { recordActivity } from '../services/progressService.js';

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem: async (key) => values.get(key) ?? null,
    setItem: async (key, value) => values.set(key, value),
    removeItem: async (key) => values.delete(key),
  };
}

function createTestCrypto() {
  let saltSeed = 0;
  return {
    CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
    getRandomBytesAsync: async (length) => {
      saltSeed += 1;
      return Uint8Array.from({ length }, (_, index) => (saltSeed + index) % 256);
    },
    digestStringAsync: async (algorithm, value) => `${algorithm}:${value}`,
  };
}

function createTestAuthService(storage, crypto) {
  return createAuthService({ storage, crypto });
}

test('crear perfil valida los datos y restaura la sesión tras reiniciar el servicio', async () => {
  const storage = createMemoryStorage();
  const crypto = createTestCrypto();
  const app = createTestAuthService(storage, crypto);

  const user = await app.register({
    name: '  Ana  ',
    email: ' ANA@EXAMPLE.COM ',
    password: 'lernen123',
    level: 'A1',
    dailyGoal: 15,
    motivation: 'Viajar',
  });

  assert.equal(user.name, 'Ana');
  assert.equal(user.email, 'ana@example.com');
  assert.equal(user.level, 'Nivel A1');
  assert.equal(user.dailyGoal, 15);
  assert.equal(user.preferences.hapticsEnabled, false);
  await assert.rejects(
    app.register({ name: 'Otra Ana', email: 'ana@example.com', password: 'lernen123' }),
    /Ya hay una cuenta/,
  );

  // Una instancia nueva representa el arranque de la app con el mismo almacenamiento persistente.
  const restartedApp = createTestAuthService(storage, crypto);
  const restoredUser = await restartedApp.restoreSession();
  assert.equal(restoredUser.email, user.email);
  assert.equal(restoredUser.name, user.name);
  assert.equal(restoredUser.totalSessions, 0);

  await restartedApp.updateStoredUser((currentUser) => updateProfile(currentUser, {
    preferences: { hapticsEnabled: true },
  }));
  const lessonDraft = {
    activityId: 'vocabulary-greetings',
    questionIndex: 1,
    selectedAnswer: 'Guten Tag',
    answered: false,
    submittedAnswers: ['Hallo'],
    hintUsage: [],
    textInputValue: '',
    orderedWords: [],
    elapsedActiveMs: 42000,
  };
  await restartedApp.updateStoredUser((currentUser) => ({
    ...currentUser,
    activeLessonProgress: lessonDraft,
  }));
  const nextRestart = createTestAuthService(storage, crypto);
  const userWithHapticsEnabled = await nextRestart.restoreSession();
  assert.equal(userWithHapticsEnabled.preferences.hapticsEnabled, true);
  assert.equal(userWithHapticsEnabled.preferences.notificationsEnabled, false);
  assert.deepEqual(userWithHapticsEnabled.activeLessonProgress, lessonDraft);
});

test('completar lección sin red guarda progreso local; logout y login conservan el progreso', async () => {
  const storage = createMemoryStorage();
  const crypto = createTestCrypto();
  const app = createTestAuthService(storage, crypto);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error('No hay conexión de red en esta prueba');
  };

  try {
    await app.register({ name: 'Lena', email: 'lena@example.com', password: 'deutsch123' });
    await app.updateStoredUser((user) => ({
      ...user,
      activeLessonProgress: { activityId: 'vocabulary-greetings', questionIndex: 1 },
    }));
    const lesson = getLessonByActivityId('vocabulary-greetings');
    assert.ok(lesson, 'la lección debe estar disponible desde el catálogo local');

    const completion = buildLessonCompletion(
      lesson,
      lesson.questions.map((question) => question.answer),
      lesson.activityId,
      [],
      95,
    );
    const completedUser = await app.updateStoredUser((user) => (
      recordActivity(user, completion, new Date('2026-10-18T12:00:00.000Z'))
    ));

    assert.equal(completedUser.totalSessions, 1);
    assert.equal(completedUser.totalQuestions, lesson.questions.length);
    assert.equal(completedUser.correctAnswers, lesson.questions.length);
    assert.equal(completedUser.studiedSeconds, 95);
    assert.equal(completedUser.activeLessonProgress, null);
    assert.ok(completedUser.learnedWords > 0);

    const restartedApp = createTestAuthService(storage, crypto);
    const restoredUser = await restartedApp.restoreSession();
    assert.equal(restoredUser.sessions[0].activityId, lesson.activityId);
    assert.equal(restoredUser.sessions[0].durationSeconds, 95);
    assert.equal(restoredUser.totalSessions, 1);
    assert.equal(restoredUser.totalQuestions, lesson.questions.length);
    assert.ok(Object.keys(restoredUser.wordProgress).length > 0);

    await restartedApp.logout();
    assert.equal(await restartedApp.restoreSession(), null);

    const signedOutApp = createTestAuthService(storage, crypto);
    const loggedInUser = await signedOutApp.login({ email: 'LENA@example.com', password: 'deutsch123' });
    assert.equal(loggedInUser.totalSessions, 1);
    assert.equal(loggedInUser.sessions[0].activityId, lesson.activityId);
    assert.ok(Object.keys(loggedInUser.wordProgress).length > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});