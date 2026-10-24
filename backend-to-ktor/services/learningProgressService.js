export function updateLearningProgress(current = {}, section, key, value) {
  if (!['readings', 'theory', 'pronunciation'].includes(section) || !key || !value || typeof value !== 'object') {
    throw new Error('La sección y el progreso de aprendizaje deben ser válidos.');
  }

  const previous = current[section]?.[key] || {};
  const nextValue = { ...previous };
  Object.entries(value).forEach(([property, next]) => {
    if (property === 'playCountIncrement') {
      if (Number.isFinite(next) && next > 0) {
        nextValue.playCount = (previous.playCount || 0) + next;
      }
      return;
    }
    if (next === undefined) return;
    if (Array.isArray(next) && Array.isArray(previous[property])) {
      nextValue[property] = [...new Set([...previous[property], ...next])];
      return;
    }
    if (property === 'completed' && previous.completed === true) {
      nextValue.completed = true;
      return;
    }
    nextValue[property] = next;
  });

  return {
    ...current,
    [section]: {
      ...(current[section] || {}),
      [key]: nextValue,
    },
  };
}

export function getCompletedTheoryLessonCount(theoryProgress = {}) {
  return Object.values(theoryProgress).reduce(
    (total, module) => total + (module.completedLessonIds || []).length,
    0,
  );
}
