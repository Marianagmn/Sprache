import { lessons } from '../data/lessons.js';

const lessonsByActivityId = Object.fromEntries(
  lessons.map((lesson) => [lesson.activityId, lesson]),
);

export function getLessonByActivityId(activityId) {
  return lessonsByActivityId[activityId] ?? null;
}
