import { vocabularyLesson } from '../data/lessons';

const lessonsByActivityId = {
  [vocabularyLesson.activityId]: vocabularyLesson,
};

export function getLessonByActivityId(activityId) {
  return lessonsByActivityId[activityId] ?? null;
}
