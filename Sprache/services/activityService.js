import { activities, getActivityById } from '../data/activities'; 

 

export function getActivities() { 

  return activities; 

} 

 

export function getRecommendedActivity() { 

  return getActivityById('vocabulary'); 

} 