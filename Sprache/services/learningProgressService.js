export function updateLearningProgress(current = {}, section, key, value) {
  if (!['readings', 'theory', 'pronunciation'].includes(section) || !key || !value || typeof value !== 'object') {
    throw new Error('La sección y el progreso de aprendizaje deben ser válidos.');
  }

  return {
    ...current,
    [section]: {
      ...(current[section] || {}),
      [key]: {
        ...(current[section]?.[key] || {}),
        ...value,
      },
    },
  };
}

export function getCompletedTheoryLessonCount(theoryProgress = {}) {
  return Object.values(theoryProgress).reduce(
    (total, module) => total + (module.completedLessonIds || []).length,
    0,
  );
}
