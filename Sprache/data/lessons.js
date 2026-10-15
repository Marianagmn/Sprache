export const vocabularyLesson = {
  id: 'vocabulary-basics',
  title: 'Vocabulario básico',
  activityId: 'vocabulary',
  durationMinutes: 5,
  questions: [
    {
      id: 'vocab-q1',
      prompt: '¿Cómo se dice "casa" en alemán?',
      word: 'casa',
      options: ['Haus', 'Baum', 'Stuhl', 'Wasser'],
      answer: 'Haus',
      vocabulary: { term: 'Haus', translation: 'casa' },
      hint: 'Empieza por la letra H.',
    },
    {
      id: 'vocab-q2',
      prompt: '¿Qué significa "Buch"?',
      word: 'Buch',
      options: ['Libro', 'Puerta', 'Mesa', 'Ventana'],
      answer: 'Libro',
      vocabulary: { term: 'Buch', translation: 'libro' },
      hint: 'Es algo que puedes leer.',
    },
    {
      id: 'vocab-q3',
      prompt: 'Completa: Guten ___',
      word: 'Guten ___',
      options: ['Morgen', 'Nacht', 'Welt', 'Tag'],
      answer: 'Morgen',
      vocabulary: { term: 'Guten Morgen', translation: 'buenos días' },
      hint: 'Es el saludo que usamos por la mañana.',
    },
  ],
};

export const vocabularyLessonDaily = {
  id: 'vocabulary-daily-routine',
  title: 'Rutina diaria',
  activityId: 'vocabulary-daily',
  durationMinutes: 6,
  questions: [
    {
      id: 'daily-q1',
      prompt: '¿Cómo se dice "despertarse" en alemán?',
      word: 'despertarse',
      options: ['aufwachen', 'laufen', 'arbeiten', 'essen'],
      answer: 'aufwachen',
      vocabulary: { term: 'aufwachen', translation: 'despertarse' },
      hint: 'Sucede al empezar el día.',
    },
    {
      id: 'daily-q2',
      prompt: '¿Qué significa "Frühstück"?',
      word: 'Frühstück',
      options: ['Desayuno', 'Cena', 'Trabajo', 'Compañero'],
      answer: 'Desayuno',
      vocabulary: { term: 'Frühstück', translation: 'desayuno' },
      hint: 'Se toma por la mañana.',
    },
    {
      id: 'daily-q3',
      prompt: '¿Cómo se dice "trabajo" en alemán?',
      word: 'trabajo',
      options: ['Arbeit', 'Schule', 'Wasser', 'Film'],
      answer: 'Arbeit',
      vocabulary: { term: 'Arbeit', translation: 'trabajo' },
      hint: 'Es lo que haces para ganar dinero.',
    },
  ],
};

export const readingLessonCity = {
  id: 'reading-city',
  title: 'Lectura: La ciudad',
  activityId: 'reading-city',
  durationMinutes: 7,
  questions: [
    {
      id: 'reading-city-q1',
      prompt: '¿Dónde vive Laura?',
      word: 'Laura',
      options: ['En una ciudad pequeña', 'En un pueblo del campo', 'En la montaña', 'En una isla'],
      answer: 'En una ciudad pequeña',
      vocabulary: { term: 'Stadt', translation: 'ciudad' },
      hint: 'Piense en el entorno urbano.',
    },
    {
      id: 'reading-city-q2',
      prompt: '¿Qué hace Laura por la tarde?',
      word: 'por la tarde',
      options: ['Va al parque y lee', 'Va al mercado y cocina', 'Va a la escuela y estudia', 'Se queda en casa todo el día'],
      answer: 'Va al parque y lee',
      vocabulary: { term: 'Park', translation: 'parque' },
      hint: 'Relaciona con tiempo libre y relajación.',
    },
    {
      id: 'reading-city-q3',
      prompt: '¿Cuál es la idea principal del texto?',
      word: 'idea principal',
      options: ['Laura disfruta un día tranquilo en la ciudad', 'Laura va a vivir al campo', 'Laura trabaja todo el día', 'Laura no sale de casa'],
      answer: 'Laura disfruta un día tranquilo en la ciudad',
      vocabulary: { term: 'ruhig', translation: 'tranquilo' },
      hint: 'Busca la sensación general del relato.',
    },
  ],
};

export const readingLessonCafe = {
  id: 'reading-cafe',
  title: 'Lectura: Café y amigos',
  activityId: 'reading-cafe',
  durationMinutes: 7,
  questions: [
    {
      id: 'reading-cafe-q1',
      prompt: '¿Qué están haciendo los amigos en el café?',
      word: 'amigos',
      options: ['Hablan y toman café', 'Estudian matemáticas', 'Corren por la calle', 'Viajan en tren'],
      answer: 'Hablan y toman café',
      vocabulary: { term: 'Kaffee', translation: 'café' },
      hint: 'Es una escena social muy común.',
    },
    {
      id: 'reading-cafe-q2',
      prompt: '¿Qué recomienda Marta?',
      word: 'Marta',
      options: ['Probar el pastel de manzana', 'Ir a la biblioteca', 'Comprar un libro', 'Llamar al médico'],
      answer: 'Probar el pastel de manzana',
      vocabulary: { term: 'Apfelkuchen', translation: 'pastel de manzana' },
      hint: 'Es una comida dulce del menú.',
    },
    {
      id: 'reading-cafe-q3',
      prompt: '¿Qué tono tiene la historia?',
      word: 'tono',
      options: ['Amigable y relajado', 'Trágico y serio', 'Enojado y agresivo', 'Técnico y formal'],
      answer: 'Amigable y relajado',
      vocabulary: { term: 'entspannt', translation: 'relajado' },
      hint: 'La escena sugiere conversación tranquila.',
    },
  ],
};

export const grammarLessonArticles = {
  id: 'grammar-articles',
  title: 'Artículos y género',
  activityId: 'grammar-articles',
  durationMinutes: 8,
  questions: [
    {
      id: 'grammar-articles-q1',
      prompt: 'Completa: ___ Tisch ist neu.',
      word: 'Tisch',
      options: ['Der', 'Die', 'Das', 'Ein'],
      answer: 'Der',
      vocabulary: { term: 'der Tisch', translation: 'la mesa' },
      hint: 'El género masculino usa der.',
    },
    {
      id: 'grammar-articles-q2',
      prompt: 'Completa: ___ Katze ist schwarz.',
      word: 'Katze',
      options: ['Der', 'Die', 'Das', 'Ein'],
      answer: 'Die',
      vocabulary: { term: 'die Katze', translation: 'el gato' },
      hint: 'La palabra es femenina.',
    },
    {
      id: 'grammar-articles-q3',
      prompt: 'Completa: ___ Buch ist interessant.',
      word: 'Buch',
      options: ['Der', 'Die', 'Das', 'Eine'],
      answer: 'Das',
      vocabulary: { term: 'das Buch', translation: 'el libro' },
      hint: 'El género neutro usa das.',
    },
  ],
};

export const grammarLessonWordOrder = {
  id: 'grammar-word-order',
  title: 'Orden de palabras',
  activityId: 'grammar-word-order',
  durationMinutes: 8,
  questions: [
    {
      id: 'grammar-word-order-q1',
      prompt: '¿Cuál es el orden correcto en alemán? "mañana / ich / la universidad / voy"',
      word: 'orden',
      options: ['Ich gehe morgen zur Uni.', 'Morgen ich gehe zur Uni.', 'Zur Uni ich gehe morgen.', 'Gehe ich morgen zur Uni.'],
      answer: 'Ich gehe morgen zur Uni.',
      vocabulary: { term: 'zur Uni', translation: 'a la universidad' },
      hint: 'El verbo suele ir en segunda posición.',
    },
    {
      id: 'grammar-word-order-q2',
      prompt: 'Completa: Heute ___ ich früh auf.',
      word: 'heute',
      options: ['stehe', 'bin', 'mache', 'war'],
      answer: 'stehe',
      vocabulary: { term: 'aufstehen', translation: 'levantarse' },
      hint: 'Es la acción que haces al despertar.',
    },
    {
      id: 'grammar-word-order-q3',
      prompt: '¿Qué oración es correcta?',
      word: 'oración',
      options: ['Wir essen heute im Restaurant.', 'Heute essen wir im Restaurant.', 'Essen wir heute im Restaurant.', 'Wir heute essen im Restaurant.'],
      answer: 'Wir essen heute im Restaurant.',
      vocabulary: { term: 'Restaurant', translation: 'restaurante' },
      hint: 'La estructura sigue el patrón sujeto + verbo + resto.',
    },
  ],
};

export const vocabularyLessons = [vocabularyLesson, vocabularyLessonDaily];
export const readingLessons = [readingLessonCity, readingLessonCafe];
export const grammarLessons = [grammarLessonArticles, grammarLessonWordOrder];
export const lessons = [...vocabularyLessons, ...readingLessons, ...grammarLessons];
