import { activities, getActivityById } from '../data/Activities.js';

export function getActivities() {
  return [...activities];
}

export function filterActivities(activityList, category = 'Todos') {
  if (category === 'Todos') {
    return activityList;
  }

  return activityList.filter((activity) => activity.category === category);
}

export function filterActivitiesByLevel(activityList, levelCode = 'Todos') {
  if (levelCode === 'Todos') {
    return activityList;
  }

  return activityList.filter((activity) => activity.levelCode === levelCode);
}

export function getRecommendedActivity(sessions = []) {
  const activityCounts = new Map();
  const lastCompleted = new Map();

  sessions.forEach((session) => {
    activityCounts.set(session.activityId, (activityCounts.get(session.activityId) || 0) + 1);
    const completedAt = new Date(session.completedAt).getTime();
    const previous = lastCompleted.get(session.activityId) ?? 0;
    lastCompleted.set(session.activityId, Math.max(previous, Number.isFinite(completedAt) ? completedAt : 0));
  });

  return [...activities].sort((left, right) => {
    const countDifference = (activityCounts.get(left.id) || 0) - (activityCounts.get(right.id) || 0);
    if (countDifference !== 0) {
      return countDifference;
    }
    return (lastCompleted.get(left.id) || 0) - (lastCompleted.get(right.id) || 0);
  })[0] ?? getActivityById('vocabulary');
}