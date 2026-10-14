import { vocabularyLesson } from './lessons.js';

export const activities = [
  {
    id: vocabularyLesson.activityId,
    title: vocabularyLesson.title,
    description: 'Amplía y repasa palabras en alemán.',
    time: '5 min',
    iconName: 'file-tray-stacked',
    category: 'Vocabulario',
  },
];

export function getActivityById(activityId) {
  return activities.find((activity) => activity.id === activityId);
}