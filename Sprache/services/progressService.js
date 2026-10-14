export function recordActivity(user, { minutes = 0, words = 0 }) {
  return {
    ...user,
    todayMinutes: Math.min(user.todayMinutes + minutes, user.dailyGoal),
    studiedMinutes: user.studiedMinutes + minutes,
    learnedWords: user.learnedWords + words,
  };
}

