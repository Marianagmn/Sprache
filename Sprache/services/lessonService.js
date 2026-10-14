import { vocabularyLesson } from '../data/lessons';

export function getLessonByActivityId(activityId) {
  if (activityId === vocabularyLesson.activityId) {
    return vocabularyLesson;
  }

  return vocabularyLesson;
}
