export const PLACEMENT_QUESTIONS = [
  {
    id: 'placement-vocabulary',
    prompt: '¿Qué significa “Haus”?',
    options: ['Casa', 'Agua', 'Libro', 'Árbol'],
    answer: 'Casa',
  },
  {
    id: 'placement-articles',
    prompt: 'Elige la frase correcta: “___ Tisch ist neu.”',
    options: ['Der', 'Die', 'Das', 'Ein'],
    answer: 'Der',
  },
  {
    id: 'placement-word-order',
    prompt: '¿Cuál frase tiene el orden correcto en alemán?',
    options: [
      'Ich gehe morgen zur Uni.',
      'Morgen ich gehe zur Uni.',
      'Zur Uni ich gehe morgen.',
      'Gehe ich morgen zur Uni.',
    ],
    answer: 'Ich gehe morgen zur Uni.',
  },
];

export function evaluatePlacement(answers, now = new Date()) {
  const submittedAnswers = Array.isArray(answers) ? answers : [];
  const correctAnswers = PLACEMENT_QUESTIONS.reduce(
    (total, question, index) => total + (submittedAnswers[index] === question.answer ? 1 : 0),
    0,
  );

  return {
    recommendedLevel: correctAnswers >= 2 ? 'A2' : 'A1',
    correctAnswers,
    totalQuestions: PLACEMENT_QUESTIONS.length,
    assessedAt: now.toISOString(),
    source: 'assessment',
    version: 1,
  };
}

export function skipPlacementAssessment(now = new Date()) {
  return {
    recommendedLevel: 'A1',
    correctAnswers: null,
    totalQuestions: PLACEMENT_QUESTIONS.length,
    assessedAt: now.toISOString(),
    source: 'self-selected',
    version: 1,
  };
}