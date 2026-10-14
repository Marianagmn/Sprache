export function calculateSessionSummary(correctAnswers, totalQuestions) {
  const safeTotal = Number.isFinite(totalQuestions) ? Math.max(0, Math.floor(totalQuestions)) : 0;
  const safeCorrect = Number.isFinite(correctAnswers)
    ? Math.min(safeTotal, Math.max(0, Math.floor(correctAnswers)))
    : 0;

  return {
    correctAnswers: safeCorrect,
    totalQuestions: safeTotal,
    percentage: safeTotal > 0 ? Math.round((safeCorrect / safeTotal) * 100) : 0,
  };
}

export function buildLessonCompletion(lesson, submittedAnswers, activityId = lesson?.activityId) {
  const questions = Array.isArray(lesson?.questions) ? lesson.questions : [];
  const answers = Array.isArray(submittedAnswers) ? submittedAnswers : [];
  const correctAnswers = questions.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
    0,
  );
  const summary = calculateSessionSummary(correctAnswers, questions.length);
  const learnedWords = questions.reduce((words, question, index) => {
    if (answers[index] === question.answer && question.vocabulary?.term) {
      words.push(question.vocabulary);
    }
    return words;
  }, []);

  return {
    activityId,
    durationMinutes: Number.isFinite(lesson?.durationMinutes) ? Math.max(0, lesson.durationMinutes) : 0,
    learnedWords,
    ...summary,
  };
}