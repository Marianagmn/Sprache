import { calculateNextReview } from './spacedRepetitionService.js';

function toDate(value, fallback = new Date()) {
  const date = value ? new Date(value) : fallback;
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getSessionDateKey(session) {
  return dateKey(toDate(session.completedAt));
}

export function deriveProgress(user, now = new Date()) {
  const sessions = Array.isArray(user.sessions) ? user.sessions : [];
  const todayKey = dateKey(now);
  const todaySeconds = sessions.reduce(
    (total, session) => total + (getSessionDateKey(session) === todayKey ? (session.durationSeconds || 0) : 0),
    0,
  );
  const studiedSeconds = sessions.reduce((total, session) => total + (session.durationSeconds || 0), 0);
  const totalQuestions = sessions.reduce((total, session) => total + (session.totalQuestions || 0), 0);
  const correctAnswers = sessions.reduce((total, session) => total + (session.correctAnswers || 0), 0);
  const learnedWords = new Map();
  const activeDays = new Set();
  const goalProgressByDay = new Map();

  sessions.forEach((session) => {
    const sessionDay = getSessionDateKey(session);
    activeDays.add(sessionDay);
    if (Number.isFinite(session.dailyGoalMinutes) && session.dailyGoalMinutes > 0) {
      const dayProgress = goalProgressByDay.get(sessionDay) || { seconds: 0, goalMinutes: session.dailyGoalMinutes };
      dayProgress.seconds += session.durationSeconds || 0;
      dayProgress.goalMinutes = session.dailyGoalMinutes;
      goalProgressByDay.set(sessionDay, dayProgress);
    }
    (session.learnedWords || []).forEach((word) => {
      const term = typeof word === 'string' ? word : word.term;
      if (term) {
        learnedWords.set(term.trim().toLocaleLowerCase(), word);
      }
    });
  });

  const streakStart = new Date(now);
  if (!activeDays.has(todayKey)) {
    streakStart.setDate(streakStart.getDate() - 1);
  }

  let streak = 0;
  const streakDate = new Date(streakStart);
  while (activeDays.has(dateKey(streakDate))) {
    streak += 1;
    streakDate.setDate(streakDate.getDate() - 1);
  }

  return {
    todaySeconds,
    todayMinutes: todaySeconds / 60,
    studiedSeconds,
    studiedMinutes: studiedSeconds / 60,
    totalSessions: sessions.length,
    totalQuestions,
    correctAnswers,
    accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    goalDaysReached: Array.from(goalProgressByDay.values()).filter(
      (day) => day.seconds >= day.goalMinutes * 60,
    ).length,
    goalDaysTracked: goalProgressByDay.size,
    learnedWords: learnedWords.size,
    streak,
  };
}

export function getWeeklyActivity(sessions = [], now = new Date()) {
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const mondayOffset = (weekStart.getDay() + 6) % 7;
  weekStart.setDate(weekStart.getDate() - mondayOffset);
  const totalsByDate = new Map();

  sessions.forEach((session) => {
    const key = getSessionDateKey(session);
    const totals = totalsByDate.get(key) || { seconds: 0, sessions: 0 };
    totals.seconds += session.durationSeconds || 0;
    totals.sessions += 1;
    totalsByDate.set(key, totals);
  });

  const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return labels.map((label, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const key = dateKey(date);
    const totals = totalsByDate.get(key) || { seconds: 0, sessions: 0 };
    return {
      date: key,
      label,
      seconds: totals.seconds,
      minutes: totals.seconds / 60,
      sessions: totals.sessions,
      active: totals.sessions > 0,
    };
  });
}

export function recordActivity(user, session, now = new Date()) {
  if (!session || typeof session !== 'object') {
    throw new Error('La sesión debe incluir los datos de la actividad completada.');
  }

  const completedAt = toDate(session.completedAt, now);
  const totalQuestions = Number.isFinite(session.totalQuestions)
    ? Math.max(0, Math.floor(session.totalQuestions))
    : 0;
  const correctAnswers = Number.isFinite(session.correctAnswers)
    ? Math.min(totalQuestions, Math.max(0, Math.floor(session.correctAnswers)))
    : 0;
  const durationSeconds = Number.isFinite(session.durationSeconds)
    ? Math.max(0, Math.floor(session.durationSeconds))
    : 0;
  const learnedWords = Array.isArray(session.learnedWords)
    ? session.learnedWords.filter((word) => typeof word?.term === 'string' && word.term.trim())
    : [];
  const sessions = Array.isArray(user.sessions) ? user.sessions : [];
  const newSession = {
    id: `${completedAt.getTime()}-${sessions.length + 1}`,
    activityId: session.activityId || 'unknown',
    completedAt: completedAt.toISOString(),
    durationSeconds,
    durationSource: 'measured',
    dailyGoalMinutes: Number.isFinite(session.dailyGoalMinutes)
      ? Math.max(1, session.dailyGoalMinutes)
      : (Number.isFinite(user.dailyGoal) ? Math.max(1, user.dailyGoal) : 10),
    correctAnswers,
    totalQuestions,
    learnedWords,
    wordResults: Array.isArray(session.wordResults) ? session.wordResults : [],
  };
  const wordProgress = { ...(user.wordProgress || {}) };
  newSession.wordResults.forEach((result) => {
    if (typeof result?.term !== 'string' || !result.term.trim()) {
      return;
    }

    const term = result.term.trim();
    const key = term.toLocaleLowerCase();
    const previous = wordProgress[key] || {};
    const schedule = calculateNextReview(previous, result, completedAt);
    wordProgress[key] = {
      term: previous.term || term,
      translation: result.translation || previous.translation || '',
      correctAnswers: (previous.correctAnswers || 0) + (result.correct ? 1 : 0),
      mistakes: (previous.mistakes || 0) + (result.correct ? 0 : 1),
      hints: (previous.hints || 0) + (result.hintUsed ? 1 : 0),
      lastPracticedAt: completedAt.toISOString(),
      ...schedule,
    };
  });
  const updatedUser = {
    ...user,
    sessions: [...sessions, newSession],
    wordProgress,
    activeLessonProgress: null,
  };

  return { ...updatedUser, ...deriveProgress(updatedUser, completedAt) };
}

export function resetProgress(user) {
  return {
    ...user,
    sessions: [],
    wordProgress: {},
    failedWords: {},
    learningProgress: { readings: {}, theory: {}, pronunciation: {} },
    activeLessonProgress: null,
    todaySeconds: 0,
    todayMinutes: 0,
    studiedSeconds: 0,
    studiedMinutes: 0,
    totalSessions: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    goalDaysReached: 0,
    goalDaysTracked: 0,
    learnedWords: 0,
    streak: 0,
  };
}
