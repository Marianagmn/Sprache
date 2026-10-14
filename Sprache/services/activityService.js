import { activities, getActivityById } from '../data/Activities';

export function getActivities() {
  return activities;
}

export function getRecommendedActivity() {
  return getActivityById('vocabulary');
}