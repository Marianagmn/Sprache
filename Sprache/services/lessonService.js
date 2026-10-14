const lessons = {
  '1': {
    title: 'Vocabulario',
    questions: [
      { word: 'Guten Morgen', prompt: '¿Qué significa esta expresión?', answer: 'Buenos días', options: ['Buenas noches', 'Buenos días', 'Hasta luego'], hint: 'Se dice al saludar por la mañana.' },
      { word: 'Danke', prompt: '¿Qué significa esta palabra?', answer: 'Gracias', options: ['Por favor', 'Gracias', 'Perdón'], hint: 'Una forma amable de expresar gratitud.' },
      { word: 'Wasser', prompt: '¿Qué significa esta palabra?', answer: 'Agua', options: ['Leche', 'Agua', 'Pan'], hint: 'Es una bebida esencial.' },
    ],
  },
  '2': {
    title: 'Comprensión auditiva',
    questions: [
      { word: 'Wie geht es dir?', prompt: 'Elige la traducción correcta.', answer: '¿Cómo estás?', options: ['¿Cómo estás?', '¿Dónde vives?', '¿Qué hora es?'], hint: 'Es una pregunta sobre el estado de ánimo.' },
      { word: 'Ich verstehe', prompt: 'Elige la traducción correcta.', answer: 'Entiendo', options: ['No lo sé', 'Entiendo', 'Estoy aprendiendo'], hint: 'El verbo se relaciona con comprender.' },
    ],
  },
  '3': {
    title: 'Pronunciación',
    questions: [
      { word: 'Tschüss', prompt: '¿Qué expresión usarías para despedirte?', answer: 'Adiós', options: ['Hola', 'Adiós', 'Gracias'], hint: 'Es una despedida informal.' },
      { word: 'Bitte', prompt: '¿Qué significa esta palabra?', answer: 'Por favor', options: ['Por favor', 'Hasta mañana', 'Perdón'], hint: 'Se usa al pedir algo amablemente.' },
    ],
  },
  '4': {
    title: 'Gramática',
    questions: [
      { word: 'Ich ___ Mariana.', prompt: 'Completa la frase: «Yo soy Mariana».', answer: 'bin', options: ['bist', 'bin', 'ist'], hint: 'La forma de «sein» para «ich».' },
      { word: 'Du ___ Deutsch.', prompt: 'Completa la frase: «Tú aprendes alemán».', answer: 'lernst', options: ['lerne', 'lernt', 'lernst'], hint: 'La terminación para «du» suele ser -st.' },
    ],
  },
};

export function getLessonByActivityId(activityId) {
  return lessons[activityId] || lessons['1'];
}
