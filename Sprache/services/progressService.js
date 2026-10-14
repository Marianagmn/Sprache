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
  const todayMinutes = sessions.reduce(
    (total, session) => total + (getSessionDateKey(session) === todayKey ? (session.durationMinutes || 0) : 0),
    0,
  );
  const studiedMinutes = sessions.reduce((total, session) => total + (session.durationMinutes || 0), 0);
  const learnedWords = new Map();
  const activeDays = new Set();

  sessions.forEach((session) => {
    activeDays.add(getSessionDateKey(session));
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
    todayMinutes,
    studiedMinutes,
    learnedWords: learnedWords.size,
    streak,
  };
}

export function getWeeklyActivity(sessions = [], now = new Date()) {
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const mondayOffset = (weekStart.getDay() + 6) % 7;
  weekStart.setDate(weekStart.getDate() - mondayOffset);
  const minutesByDate = new Map();

  sessions.forEach((session) => {
    const key = getSessionDateKey(session);
    minutesByDate.set(key, (minutesByDate.get(key) || 0) + (session.durationMinutes || 0));
  });

  const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return labels.map((label, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const key = dateKey(date);
    const minutes = minutesByDate.get(key) || 0;
    return { date: key, label, minutes, active: minutes > 0 };
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
  const durationMinutes = Number.isFinite(session.durationMinutes)
    ? Math.max(0, session.durationMinutes)
    : 0;
  const learnedWords = Array.isArray(session.learnedWords)
    ? session.learnedWords.filter((word) => typeof word?.term === 'string' && word.term.trim())
    : [];
  const sessions = Array.isArray(user.sessions) ? user.sessions : [];
  const newSession = {
    id: `${completedAt.getTime()}-${sessions.length + 1}`,
    activityId: session.activityId || 'unknown',
    completedAt: completedAt.toISOString(),
    durationMinutes,
    correctAnswers,
    totalQuestions,
    learnedWords,
  };
  const updatedUser = { ...user, sessions: [...sessions, newSession] };

  return { ...updatedUser, ...deriveProgress(updatedUser, completedAt) };
}

export function resetProgress(user) {
  return {
    ...user,
    sessions: [],
    todayMinutes: 0,
    studiedMinutes: 0,
    learnedWords: 0,
    streak: 0,
  };
}

