import { getWeeklyActivity } from './progressService.js';

const WEEKLY_CHALLENGES = [
  { id: 'practice-days', title: 'Ritmo propio', description: 'Practica en 3 días distintos', target: 3 },
  { id: 'completed-sessions', title: 'Pequeños pasos', description: 'Completa 3 prácticas', target: 3 },
  { id: 'practice-time', title: 'Tiempo para ti', description: 'Dedica 15 minutos a practicar', target: 15 },
  { id: 'new-words', title: 'Nuevas palabras', description: 'Aprende 5 palabras distintas', target: 5 },
];

function validSessions(sessions) {
  return (Array.isArray(sessions) ? sessions : []).filter((session) => (
    session && Number.isFinite(new Date(session.completedAt).getTime())
  ));
}

function getLongestStreak(sessions) {
  const dates = [...new Set(validSessions(sessions).map((session) => {
    const date = new Date(session.completedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }))].sort();

  let longest = 0;
  let current = 0;
  let previousDate = null;
  dates.forEach((key) => {
    const date = new Date(`${key}T00:00:00`);
    const difference = previousDate ? (date.getTime() - previousDate.getTime()) / 86400000 : null;
    current = difference === 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previousDate = date;
  });
  return longest;
}

export function getAchievements(sessions = []) {
  const valid = validSessions(sessions);
  const uniqueWords = new Set();
  let hasPerfectSession = false;
  const practicedSeconds = valid.reduce((total, session) => (
    total + (Number.isFinite(session.durationSeconds) ? Math.max(0, session.durationSeconds) : 0)
  ), 0);
  valid.forEach((session) => {
    (session.learnedWords || []).forEach((word) => {
      const term = typeof word === 'string' ? word : word?.term;
      if (typeof term === 'string' && term.trim()) uniqueWords.add(term.trim().toLocaleLowerCase());
    });
    hasPerfectSession ||= session.totalQuestions > 0 && session.correctAnswers === session.totalQuestions;
  });

  const checks = [
    { id: 'first-session', title: 'Primer paso', description: 'Completaste tu primera práctica.', earned: valid.length >= 1, icon: 'flag' },
    { id: 'ten-sessions', title: 'Constancia', description: 'Completaste 10 prácticas.', earned: valid.length >= 10, icon: 'ribbon' },
    { id: 'practice-hour', title: 'Tiempo bien invertido', description: 'Acumulaste 60 minutos de práctica real.', earned: practicedSeconds >= 3600, icon: 'time' },
    { id: 'ten-words', title: 'Colección de palabras', description: 'Acertaste al menos 10 palabras distintas.', earned: uniqueWords.size >= 10, icon: 'book' },
    { id: 'perfect-session', title: 'Todo correcto', description: 'Lograste una práctica perfecta.', earned: hasPerfectSession, icon: 'star' },
    { id: 'three-day-streak', title: 'Tres días de práctica', description: 'Practicaste tres días seguidos.', earned: getLongestStreak(valid) >= 3, icon: 'flame' },
  ];

  return checks.map((badge) => ({ ...badge, earned: Boolean(badge.earned) }));
}

export function getExperience(sessions = []) {
  const valid = validSessions(sessions);
  const correctAnswers = valid.reduce((total, session) => (
    total + (Number.isFinite(session.correctAnswers) ? Math.max(0, session.correctAnswers) : 0)
  ), 0);
  const practicedMinutes = valid.reduce((total, session) => (
    total + Math.min(20, Math.floor(Math.max(0, session.durationSeconds || 0) / 60))
  ), 0);
  const xp = valid.length * 20 + correctAnswers * 10 + practicedMinutes;
  return {
    xp,
    correctAnswers,
    completedSessions: valid.length,
    practicedMinutes,
    nextLevelXp: 100,
    level: Math.floor(xp / 100) + 1,
    progressToNextLevel: xp % 100,
  };
}

export function getWeeklyChallenges(sessions = [], now = new Date()) {
  const valid = validSessions(sessions);
  const week = getWeeklyActivity(valid, now);
  const activeDays = week.filter((day) => day.sessions > 0).length;
  const weekDates = new Set(week.map((day) => day.date));
  let completedSessions = 0;
  let practicedSeconds = 0;
  const learnedTerms = new Set();

  valid.forEach((session) => {
    const date = new Date(session.completedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (!weekDates.has(`${year}-${month}-${day}`)) return;

    completedSessions += 1;
    practicedSeconds += Number.isFinite(session.durationSeconds) ? Math.max(0, session.durationSeconds) : 0;
    (session.learnedWords || []).forEach((word) => {
      const term = typeof word === 'string' ? word : word?.term;
      if (typeof term === 'string' && term.trim()) learnedTerms.add(term.trim().toLocaleLowerCase());
    });
  });

  const values = {
    'practice-days': activeDays,
    'completed-sessions': completedSessions,
    'practice-time': Math.floor(practicedSeconds / 60),
    'new-words': learnedTerms.size,
  };

  return WEEKLY_CHALLENGES.map((challenge) => ({
    ...challenge,
    progress: Math.min(values[challenge.id], challenge.target),
    completed: values[challenge.id] >= challenge.target,
  }));
}

export function getNewlyUnlockedAchievements(previousSessions = [], currentSessions = [], now = new Date()) {
  const previousBadges = new Set(
    getAchievements(previousSessions).filter((badge) => badge.earned).map((badge) => badge.id),
  );
  const newBadges = getAchievements(currentSessions)
    .filter((badge) => badge.earned && !previousBadges.has(badge.id))
    .map((badge) => ({
      id: `badge-${badge.id}`,
      title: `¡Nueva insignia: ${badge.title}!`,
      message: badge.description,
      icon: badge.icon,
    }));

  const previousChallenges = new Set(
    getWeeklyChallenges(previousSessions, now).filter((challenge) => challenge.completed).map((challenge) => challenge.id),
  );
  const newChallenges = getWeeklyChallenges(currentSessions, now)
    .filter((challenge) => challenge.completed && !previousChallenges.has(challenge.id))
    .map((challenge) => ({
      id: `challenge-${challenge.id}`,
      title: `¡Reto completado: ${challenge.title}!`,
      message: 'Tu constancia también merece celebrarse.',
      icon: 'sparkles',
    }));

  return [...newBadges, ...newChallenges];
}