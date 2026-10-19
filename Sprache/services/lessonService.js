import { lessons } from '../data/lessons.js';
import { getDueWords } from './spacedRepetitionService.js';

const lessonsByActivityId = Object.fromEntries(
  lessons.map((lesson) => [lesson.activityId, lesson]),
);

export function getLessonByActivityId(activityId) {
  return lessonsByActivityId[activityId] ?? null;
}

function normalizeTerm(value) {
  return typeof value === 'string' ? value.trim().toLocaleLowerCase() : '';
}

export function getSpacedReviewLesson(wordProgress, now = new Date(), limit = 5) {
  const dueWords = getDueWords(wordProgress, now, limit);
  const allQuestions = lessons.flatMap((lesson) => lesson.questions || []);
  const reviewQuestions = dueWords.reduce((questions, dueWord, index) => {
    const expectedTerm = normalizeTerm(dueWord.term);
    const template = allQuestions.find((question) => (
      normalizeTerm(question.vocabulary?.term) === expectedTerm
      || normalizeTerm(question.word) === expectedTerm
    ));

    if (template) {
      questions.push({ ...template, id: `review-${index}-${template.id}` });
    }
    return questions;
  }, []);

  if (!reviewQuestions.length) return null;

  return {
    id: 'spaced-review',
    title: 'Repaso de palabras',
    activityId: 'spaced-review',
    durationMinutes: Math.max(1, Math.ceil(reviewQuestions.length * 0.5)),
    questions: reviewQuestions,
  };
}

export function getFailedWordsReviewLesson(failedWords, limit = 10) {
  const reviewQuestions = Object.entries(failedWords || {})
    .sort(([, first], [, second]) => (
      new Date(first.lastFailedAt || 0).getTime() - new Date(second.lastFailedAt || 0).getTime()
    ))
    .slice(0, Math.max(0, limit))
    .flatMap(([key, failedWord], index) => (
      failedWord?.question
        ? [{ ...failedWord.question, id: `failed-review-${index}-${key}` }]
        : []
    ));

  if (!reviewQuestions.length) return null;

  return {
    id: 'failed-words-review',
    title: 'Repasar palabras',
    activityId: 'failed-words-review',
    durationMinutes: Math.max(1, Math.ceil(reviewQuestions.length * 0.5)),
    questions: reviewQuestions,
  };
}
