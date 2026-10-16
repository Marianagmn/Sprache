const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const SUCCESS_INTERVAL_DAYS = [1, 3, 7, 14, 30];

export function calculateNextReview(previousProgress = {}, result = {}, now = new Date()) {
  const timestamp = now.getTime();
  const previousStreak = Number.isFinite(previousProgress.reviewStreak)
    ? Math.max(0, previousProgress.reviewStreak)
    : 0;
  let reviewStreak = 0;
  let intervalMinutes;

  if (!result.correct) {
    intervalMinutes = 10;
  } else if (result.hintUsed) {
    intervalMinutes = 4 * 60;
  } else {
    reviewStreak = previousStreak + 1;
    intervalMinutes = SUCCESS_INTERVAL_DAYS[Math.min(reviewStreak - 1, SUCCESS_INTERVAL_DAYS.length - 1)] * 24 * 60;
  }

  return {
    reviewStreak,
    intervalMinutes,
    nextReviewAt: new Date(timestamp + intervalMinutes * MINUTE_MS).toISOString(),
  };
}

function getReviewDifficulty(word) {
  const attempts = (word.correctAnswers || 0) + (word.mistakes || 0);
  const mistakeRate = attempts > 0 ? (word.mistakes || 0) / attempts : 0;
  return mistakeRate * 2 + (word.hints || 0) / Math.max(attempts, 1);
}

export function getDueWords(wordProgress = {}, now = new Date(), limit = 5) {
  const nowMs = now.getTime();
  return Object.entries(wordProgress)
    .map(([key, word]) => ({
      key,
      ...word,
      nextReviewAt: word.nextReviewAt || word.lastPracticedAt || null,
    }))
    .filter((word) => {
      const dueAt = word.nextReviewAt ? new Date(word.nextReviewAt).getTime() : Number.NaN;
      return Number.isFinite(dueAt) && dueAt <= nowMs;
    })
    .sort((first, second) => {
      const difficultyDifference = getReviewDifficulty(second) - getReviewDifficulty(first);
      if (difficultyDifference) return difficultyDifference;
      return new Date(first.nextReviewAt).getTime() - new Date(second.nextReviewAt).getTime();
    })
    .slice(0, Math.max(0, limit));
}

export function getNextReviewIntervalLabel(word, now = new Date()) {
  if (!word?.nextReviewAt) return 'Pendiente de programar';
  const remainingMs = new Date(word.nextReviewAt).getTime() - now.getTime();
  if (!Number.isFinite(remainingMs) || remainingMs <= 0) return 'Listo para repasar';
  if (remainingMs < HOUR_MS) return `En ${Math.max(1, Math.ceil(remainingMs / MINUTE_MS))} min`;
  if (remainingMs < DAY_MS) return `En ${Math.ceil(remainingMs / HOUR_MS)} h`;
  return `En ${Math.ceil(remainingMs / DAY_MS)} días`;
}