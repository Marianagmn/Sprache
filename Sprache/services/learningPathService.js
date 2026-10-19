import { activities } from '../data/Activities.js';

export const LEARNING_LEVELS = [
  {
    code: 'A1',
    title: 'Primeros pasos',
    description: 'Vocabulario cotidiano, artículos y primeras lecturas.',
    activityIds: [
      'vocabulary', 'vocabulary-greetings', 'vocabulary-food', 'vocabulary-study',
      'grammar-articles', 'vocabulary-daily', 'reading-city',
      'challenge-a1-city',
    ],
  },
  {
    code: 'A2',
    title: 'Construye frases',
    description: 'Amplía vocabulario y practica frases, lecturas y situaciones habituales.',
    activityIds: [
      'grammar-word-order', 'grammar-present', 'vocabulary-travel', 'vocabulary-shopping',
      'reading-cafe', 'reading-station', 'reading-market', 'reading-weather',
      'grammar-negation', 'grammar-accusative', 'vocabulary-family',
      'vocabulary-home', 'vocabulary-health', 'vocabulary-hobbies', 'vocabulary-work',
      'reading-doctor', 'reading-weekend', 'reading-apartment',
      'reading-conversation',
      'grammar-modal-verbs', 'grammar-dative', 'grammar-perfect',
      'challenge-a2-weekend',
    ],
  },
  {
    code: 'B1',
    title: 'Comunicación independiente',
    description: 'Cuenta experiencias, comprende información y comunica ideas con más detalle.',
    activityIds: [
      'grammar-genitive', 'grammar-subjunctive', 'story-b1-weekend', 'dictation-b1',
      'fill-blanks-b1', 'word-order-b1', 'write-response-b1', 'listening-b1',
      'challenge-b1-travel',
    ],
  },
  {
    code: 'B2',
    title: 'Expresión avanzada',
    description: 'Argumenta, interpreta matices y expresa ideas complejas con precisión.',
    activityIds: [
      'story-b2-career', 'dictation-b2', 'fill-blanks-b2', 'word-order-b2',
      'write-response-b2', 'listening-b2', 'story-b2-travel', 'challenge-b2-work',
    ],
  },
];

export function getLearningPath(sessions = [], placementAssessment = null) {
  const completedIds = new Set(
    (Array.isArray(sessions) ? sessions : [])
      .map((session) => session.activityId)
      .filter(Boolean),
  );
  const startLevelIndex = LEARNING_LEVELS.findIndex(
    (level) => level.code === placementAssessment?.recommendedLevel,
  );
  const effectiveStartIndex = startLevelIndex < 0 ? 0 : startLevelIndex;
  let previousRequiredLevelsComplete = true;

  const levels = LEARNING_LEVELS.map((level, index) => {
    const isBeforeRecommendation = index < effectiveStartIndex;
    const levelComplete = level.activityIds.every((activityId) => completedIds.has(activityId));
    const unlocked = isBeforeRecommendation || previousRequiredLevelsComplete;
    const nextActivityId = level.activityIds.find((activityId) => !completedIds.has(activityId)) || null;
    const activitiesForLevel = level.activityIds.map((activityId) => {
      const activity = activities.find((item) => item.id === activityId);
      const completed = completedIds.has(activityId);
      const unlockedLesson = completed || isBeforeRecommendation
        || (unlocked && (completed || activityId === nextActivityId));

      return {
        id: activityId,
        title: activity?.title || activityId,
        time: activity?.time || '',
        completed,
        unlocked: unlockedLesson,
      };
    });

    if (index >= effectiveStartIndex && !levelComplete) {
      previousRequiredLevelsComplete = false;
    }

    return {
      ...level,
      completedLessons: activitiesForLevel.filter((item) => item.completed).length,
      totalLessons: activitiesForLevel.length,
      status: isBeforeRecommendation ? 'review' : unlocked ? (levelComplete ? 'completed' : 'available') : 'locked',
      lessons: activitiesForLevel,
    };
  });

  const nextLesson = levels
    .slice(effectiveStartIndex)
    .flatMap((level) => level.lessons.map((lesson) => ({ ...lesson, levelCode: level.code })))
    .find((lesson) => lesson.unlocked && !lesson.completed) || null;

  return {
    recommendedLevel: LEARNING_LEVELS[effectiveStartIndex].code,
    levels,
    nextLesson,
  };
}