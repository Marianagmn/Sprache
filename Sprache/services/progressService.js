export function recordActivity(user, session = {}) {
  const minutes = Number.isFinite(session.minutes) ? Math.max(0, session.minutes) : 0;
  const words = Number.isFinite(session.words) ? Math.max(0, Math.floor(session.words)) : 0;
  const todayMinutes = user.todayMinutes ?? 0;
  const studiedMinutes = user.studiedMinutes ?? 0;
  const learnedWords = user.learnedWords ?? 0;

  return {
    ...user,
    todayMinutes: Math.min(todayMinutes + minutes, user.dailyGoal ?? Infinity),
    studiedMinutes: studiedMinutes + minutes,
    learnedWords: learnedWords + words,
  };
}

