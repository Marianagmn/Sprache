import {
  vocabularyLesson,
  vocabularyLessonDaily,
  readingLessonCity,
  readingLessonCafe,
  grammarLessonArticles,
  grammarLessonWordOrder,
} from './lessons.js';

export const activities = [
  {
    id: vocabularyLesson.activityId,
    title: vocabularyLesson.title,
    description: 'Amplía y repasa palabras en alemán.',
    time: `${vocabularyLesson.durationMinutes} min`,
    iconName: 'file-tray-stacked',
    category: 'Vocabulario',
  },
  {
    id: vocabularyLessonDaily.activityId,
    title: vocabularyLessonDaily.title,
    description: 'Practica palabras útiles para tu día a día.',
    time: `${vocabularyLessonDaily.durationMinutes} min`,
    iconName: 'time-outline',
    category: 'Vocabulario',
  },
  {
    id: readingLessonCity.activityId,
    title: readingLessonCity.title,
    description: 'Lee un texto corto sobre la vida en la ciudad.',
    time: `${readingLessonCity.durationMinutes} min`,
    iconName: 'book-outline',
    category: 'Lectura',
  },
  {
    id: readingLessonCafe.activityId,
    title: readingLessonCafe.title,
    description: 'Comprende una conversación en un café.',
    time: `${readingLessonCafe.durationMinutes} min`,
    iconName: 'chatbox-ellipses-outline',
    category: 'Lectura',
  },
  {
    id: grammarLessonArticles.activityId,
    title: grammarLessonArticles.title,
    description: 'Revisa artículos y género con ejemplos claros.',
    time: `${grammarLessonArticles.durationMinutes} min`,
    iconName: 'school-outline',
    category: 'Gramática',
  },
  {
    id: grammarLessonWordOrder.activityId,
    title: grammarLessonWordOrder.title,
    description: 'Practica la estructura correcta de las frases.',
    time: `${grammarLessonWordOrder.durationMinutes} min`,
    iconName: 'construct-outline',
    category: 'Gramática',
  },
];

export function getActivityById(activityId) {
  return activities.find((activity) => activity.id === activityId);
}