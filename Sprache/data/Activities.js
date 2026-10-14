import { vocabularyLesson } from './lessons';

export const activities = [
  {
    id: vocabularyLesson.activityId,
    title: vocabularyLesson.title,
    description: 'Amplía y repasa palabras en alemán.',
    time: '5 min',
    iconName: 'file-tray-stacked',
  },
];

export function getActivityById(activityId) {
  return activities.find((activity) => activity.id === activityId);
}