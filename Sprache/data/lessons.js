export const vocabularyLesson = { 

  id: 'vocabulary-basics', 

  title: 'Vocabulario básico', 

  activityId: 'vocabulary', 

  durationMinutes: 5,

  questions: [ 

    { 

      id: 'q1', 

      prompt: '¿Cómo se dice "casa" en alemán?', 

      word: 'casa', 

      options: ['Haus', 'Baum', 'Stuhl', 'Wasser'], 

      answer: 'Haus', 
      vocabulary: { term: 'Haus', translation: 'casa' },

      hint: 'Empieza por la letra H.', 

    }, 

    { 

      id: 'q2', 

      prompt: '¿Qué significa "Buch"?', 

      word: 'Buch', 

      options: ['Libro', 'Puerta', 'Mesa', 'Ventana'], 

      answer: 'Libro', 
      vocabulary: { term: 'Buch', translation: 'libro' },

      hint: 'Es algo que puedes leer.', 

    }, 

    { 

      id: 'q3', 

      prompt: 'Completa: Guten ___', 

      word: 'Guten ___', 

      options: ['Morgen', 'Nacht', 'Welt', 'Tag'], 

      answer: 'Morgen', 
      vocabulary: { term: 'Guten Morgen', translation: 'buenos días' },

      hint: 'Es el saludo que usamos por la mañana.', 

    }, 

  ], 

}; 