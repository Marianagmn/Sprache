import { vocabularyLesson } from '../data/lessons.js';

const lessonsByActivityId = {
  [vocabularyLesson.activityId]: vocabularyLesson,
};

export function getLessonByActivityId(activityId) {
  return lessonsByActivityId[activityId] ?? null;
}
