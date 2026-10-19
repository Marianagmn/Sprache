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

export function isQuestionAnswerCorrect(question, submittedAnswer) {
  if (!question || typeof submittedAnswer !== 'string') {
    return false;
  }

  const expectedAnswer = question.type === 'listening'
    ? question.questions?.[0]?.correctAnswer
    : question.answer;

  if (typeof expectedAnswer !== 'string') {
    return false;
  }

  if (['dictation', 'fill-blanks', 'write-response'].includes(question.type)) {
    return submittedAnswer.trim().toLocaleLowerCase()
      === expectedAnswer.trim().toLocaleLowerCase();
  }

  return submittedAnswer === expectedAnswer;
}

export function updateFailedWords(failedWords = {}, question, correct, now = new Date()) {
  const term = question?.vocabulary?.term || question?.word;
  if (typeof term !== 'string' || !term.trim()) {
    return failedWords;
  }

  const normalizedTerm = term.trim();
  const key = normalizedTerm.toLocaleLowerCase();
  const nextFailedWords = { ...failedWords };

  if (correct) {
    delete nextFailedWords[key];
    return nextFailedWords;
  }

  const previous = nextFailedWords[key] || {};
  nextFailedWords[key] = {
    term: normalizedTerm,
    translation: question.vocabulary?.translation || previous.translation || '',
    question: { ...question },
    mistakes: (previous.mistakes || 0) + 1,
    lastFailedAt: now.toISOString(),
  };

  return nextFailedWords;
}

export function buildLessonCompletion(
  lesson,
  submittedAnswers,
  activityId = lesson?.activityId,
  hintUsage = [],
  durationSeconds = 0,
) {
  const questions = Array.isArray(lesson?.questions) ? lesson.questions : [];
  const answers = Array.isArray(submittedAnswers) ? submittedAnswers : [];
  const usedHints = Array.isArray(hintUsage) ? hintUsage : [];
  const correctAnswers = questions.reduce(
    (total, question, index) => total + (isQuestionAnswerCorrect(question, answers[index]) ? 1 : 0),
    0,
  );
  const summary = calculateSessionSummary(correctAnswers, questions.length);
  const learnedWords = questions.reduce((words, question, index) => {
    if (isQuestionAnswerCorrect(question, answers[index]) && question.vocabulary?.term) {
      words.push(question.vocabulary);
    }
    return words;
  }, []);
  const wordResults = questions.reduce((results, question, index) => {
    const term = question.vocabulary?.term || question.word;
    if (typeof term === 'string' && term.trim()) {
      results.push({
        term: term.trim(),
        translation: question.vocabulary?.translation || '',
        correct: isQuestionAnswerCorrect(question, answers[index]),
        hintUsed: Boolean(usedHints[index]),
      });
    }
    return results;
  }, []);

  return {
    activityId,
    durationSeconds: Number.isFinite(durationSeconds) ? Math.max(0, Math.floor(durationSeconds)) : 0,
    learnedWords,
    wordResults,
    ...summary,
  };
}