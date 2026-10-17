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

export const vocabularyLessonFood = {
  id: 'vocabulary-food',
  title: 'Comida y bebida',
  activityId: 'vocabulary-food',
  durationMinutes: 6,
  questions: [
    { id: 'food-q1', prompt: '¿Cómo se dice "manzana" en alemán?', word: 'manzana', options: ['Apfel', 'Brot', 'Käse', 'Milch'], answer: 'Apfel', vocabulary: { term: 'der Apfel', translation: 'la manzana' }, hint: 'Es una fruta que suele ser roja o verde.' },
    { id: 'food-q2', prompt: '¿Qué significa "Wasser"?', word: 'Wasser', options: ['Agua', 'Leche', 'Café', 'Jugo'], answer: 'Agua', vocabulary: { term: 'das Wasser', translation: 'el agua' }, hint: 'Es una bebida transparente.' },
    { id: 'food-q3', prompt: 'Completa: Ich esse gern ___ (pan).', word: 'pan', options: ['Brot', 'Fisch', 'Tee', 'Reis'], answer: 'Brot', vocabulary: { term: 'das Brot', translation: 'el pan' }, hint: 'Se prepara con harina y se hornea.' },
  ],
};

export const vocabularyLessonTravel = {
  id: 'vocabulary-travel',
  title: 'Viajes y transporte',
  activityId: 'vocabulary-travel',
  durationMinutes: 6,
  questions: [
    { id: 'travel-q1', prompt: '¿Cómo se dice "tren" en alemán?', word: 'tren', options: ['Zug', 'Bus', 'Fahrrad', 'Flugzeug'], answer: 'Zug', vocabulary: { term: 'der Zug', translation: 'el tren' }, hint: 'Viaja sobre raíles.' },
    { id: 'travel-q2', prompt: '¿Qué significa "Bahnhof"?', word: 'Bahnhof', options: ['Estación de tren', 'Aeropuerto', 'Hotel', 'Museo'], answer: 'Estación de tren', vocabulary: { term: 'der Bahnhof', translation: 'la estación de tren' }, hint: 'Es donde tomas el tren.' },
    { id: 'travel-q3', prompt: 'Completa: Ich fahre mit dem ___. (autobús)', word: 'autobús', options: ['Bus', 'Zug', 'Rad', 'Schiff'], answer: 'Bus', vocabulary: { term: 'der Bus', translation: 'el autobús' }, hint: 'Es un transporte público por carretera.' },
  ],
};

export const vocabularyLessonFamily = {
  id: 'vocabulary-family',
  title: 'La familia',
  activityId: 'vocabulary-family',
  durationMinutes: 5,
  questions: [
    { id: 'family-q1', prompt: '¿Cómo se dice "madre" en alemán?', word: 'madre', options: ['Mutter', 'Vater', 'Bruder', 'Sohn'], answer: 'Mutter', vocabulary: { term: 'die Mutter', translation: 'la madre' }, hint: 'Es una de tus figuras parentales.' },
    { id: 'family-q2', prompt: '¿Qué significa "die Schwester"?', word: 'die Schwester', options: ['La hermana', 'El hermano', 'La hija', 'La abuela'], answer: 'La hermana', vocabulary: { term: 'die Schwester', translation: 'la hermana' }, hint: 'Es una hija de tus mismos padres.' },
    { id: 'family-q3', prompt: '¿Cómo se dice "abuelo" en alemán?', word: 'abuelo', options: ['Großvater', 'Großmutter', 'Onkel', 'Vater'], answer: 'Großvater', vocabulary: { term: 'der Großvater', translation: 'el abuelo' }, hint: 'Es el padre de tu madre o de tu padre.' },
  ],
};

export const vocabularyLessonShopping = {
  id: 'vocabulary-shopping',
  title: 'De compras',
  activityId: 'vocabulary-shopping',
  durationMinutes: 6,
  questions: [
    { id: 'shopping-q1', prompt: '¿Cómo se dice "precio" en alemán?', word: 'precio', options: ['Preis', 'Größe', 'Farbe', 'Kasse'], answer: 'Preis', vocabulary: { term: 'der Preis', translation: 'el precio' }, hint: 'Lo preguntas para saber cuánto cuesta algo.' },
    { id: 'shopping-q2', prompt: '¿Qué significa "Ich möchte bezahlen"?', word: 'Ich möchte bezahlen', options: ['Quisiera pagar', 'Quisiera comprar', '¿Dónde está la tienda?', 'Es demasiado grande'], answer: 'Quisiera pagar', vocabulary: { term: 'bezahlen', translation: 'pagar' }, hint: 'Se dice al terminar una compra o comida.' },
    { id: 'shopping-q3', prompt: '¿Cómo se dice "tienda" en alemán?', word: 'tienda', options: ['Geschäft', 'Bahnhof', 'Küche', 'Schule'], answer: 'Geschäft', vocabulary: { term: 'das Geschäft', translation: 'la tienda' }, hint: 'Es un lugar donde compras productos.' },
  ],
};

export const readingLessonStation = {
  id: 'reading-station',
  title: 'Lectura: En la estación',
  activityId: 'reading-station',
  durationMinutes: 7,
  questions: [
    { id: 'station-q1', prompt: '¿Qué busca una persona que pregunta "Wo ist Gleis drei?"?', word: 'Gleis drei', options: ['El andén tres', 'La salida tres', 'El autobús tres', 'La habitación tres'], answer: 'El andén tres', vocabulary: { term: 'das Gleis', translation: 'el andén / la vía' }, hint: 'Es el lugar donde esperan los pasajeros para subir al tren.' },
    { id: 'station-q2', prompt: 'Si el tren sale um zehn Uhr, ¿a qué hora sale?', word: 'zehn Uhr', options: ['A las diez', 'A las doce', 'A las ocho', 'A las nueve'], answer: 'A las diez', vocabulary: { term: 'um zehn Uhr', translation: 'a las diez' }, hint: 'Zehn significa diez.' },
    { id: 'station-q3', prompt: '¿Qué significa "eine Fahrkarte kaufen"?', word: 'Fahrkarte', options: ['Comprar un billete', 'Esperar el tren', 'Leer un mapa', 'Abrir una puerta'], answer: 'Comprar un billete', vocabulary: { term: 'die Fahrkarte', translation: 'el billete' }, hint: 'Fahrkarte es el documento para viajar.' },
  ],
};

export const readingLessonMarket = {
  id: 'reading-market',
  title: 'Lectura: En el mercado',
  activityId: 'reading-market',
  durationMinutes: 7,
  questions: [
    { id: 'market-q1', prompt: 'La vendedora dice "Was möchten Sie?". ¿Qué quiere saber?', word: 'Was möchten Sie?', options: ['Qué desea el cliente', 'Dónde vive el cliente', 'Cuándo llega el tren', 'Cómo se llama el cliente'], answer: 'Qué desea el cliente', vocabulary: { term: 'möchten', translation: 'querer / desear (de forma cortés)' }, hint: 'Es una pregunta habitual al atender a alguien.' },
    { id: 'market-q2', prompt: '¿Qué significa "ein Kilo Äpfel, bitte"?', word: 'ein Kilo Äpfel', options: ['Un kilo de manzanas, por favor', 'Un litro de leche, por favor', 'Dos panes, por favor', 'Una taza de café, por favor'], answer: 'Un kilo de manzanas, por favor', vocabulary: { term: 'ein Kilo Äpfel', translation: 'un kilo de manzanas' }, hint: 'Äpfel es el plural de Apfel.' },
    { id: 'market-q3', prompt: 'Si el cliente pregunta "Wie viel kostet das?", ¿qué pregunta?', word: 'Wie viel kostet das?', options: ['¿Cuánto cuesta esto?', '¿Dónde está esto?', '¿Qué hora es?', '¿Puedo ayudarle?'], answer: '¿Cuánto cuesta esto?', vocabulary: { term: 'kosten', translation: 'costar' }, hint: 'La pregunta es sobre el precio.' },
  ],
};

export const readingLessonWeather = {
  id: 'reading-weather',
  title: 'Lectura: El tiempo',
  activityId: 'reading-weather',
  durationMinutes: 7,
  questions: [
    { id: 'weather-q1', prompt: '¿Qué significa "Heute regnet es"?', word: 'regnet', options: ['Hoy llueve', 'Hoy hace sol', 'Hoy nieva', 'Hoy hace calor'], answer: 'Hoy llueve', vocabulary: { term: 'regnen', translation: 'llover' }, hint: 'El verbo regnen describe la lluvia.' },
    { id: 'weather-q2', prompt: '¿Qué ropa conviene llevar si hace frío (es ist kalt)?', word: 'kalt', options: ['Una chaqueta', 'Un bañador', 'Unas sandalias', 'Unas gafas de sol'], answer: 'Una chaqueta', vocabulary: { term: 'kalt', translation: 'frío' }, hint: 'Elige una prenda que abriga.' },
    { id: 'weather-q3', prompt: '¿Qué significa "Die Sonne scheint"?', word: 'Die Sonne scheint', options: ['Brilla el sol', 'Cae la nieve', 'Sopla el viento', 'Hay niebla'], answer: 'Brilla el sol', vocabulary: { term: 'scheinen', translation: 'brillar' }, hint: 'Sonne significa sol.' },
  ],
};

export const grammarLessonPresent = {
  id: 'grammar-present',
  title: 'Verbos en presente',
  activityId: 'grammar-present',
  durationMinutes: 8,
  questions: [
    { id: 'present-q1', prompt: 'Completa: Ich ___ Deutsch. (hablar)', word: 'sprechen', options: ['spreche', 'sprichst', 'spricht', 'sprechen'], answer: 'spreche', vocabulary: { term: 'sprechen', translation: 'hablar' }, hint: 'Con ich, sprechen se conjuga spreche.' },
    { id: 'present-q2', prompt: 'Completa: Du ___ in Berlin. (vivir)', word: 'wohnen', options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], answer: 'wohnst', vocabulary: { term: 'wohnen', translation: 'vivir / residir' }, hint: 'Los verbos regulares suelen terminar en -st con du.' },
    { id: 'present-q3', prompt: 'Completa: Er ___ Kaffee. (beber)', word: 'trinken', options: ['trinke', 'trinkst', 'trinkt', 'trinken'], answer: 'trinkt', vocabulary: { term: 'trinken', translation: 'beber' }, hint: 'Con er, el verbo suele terminar en -t.' },
  ],
};

export const grammarLessonNegation = {
  id: 'grammar-negation',
  title: 'Negación con nicht y kein',
  activityId: 'grammar-negation',
  durationMinutes: 8,
  questions: [
    { id: 'negation-q1', prompt: 'Completa: Ich bin ___ müde. (No estoy cansado.)', word: 'müde', options: ['nicht', 'kein', 'keine', 'einen'], answer: 'nicht', vocabulary: { term: 'nicht', translation: 'no (negación)' }, hint: 'Usa nicht para negar un adjetivo.' },
    { id: 'negation-q2', prompt: 'Completa: Ich habe ___ Hund. (No tengo perro.)', word: 'Hund', options: ['keinen', 'nicht', 'keine', 'kein'], answer: 'keinen', vocabulary: { term: 'keinen Hund', translation: 'ningún perro' }, hint: 'Hund es masculino y funciona como objeto directo: kein cambia a keinen.' },
    { id: 'negation-q3', prompt: 'Completa: Sie trinkt ___ Kaffee. (Ella no bebe café.)', word: 'Kaffee', options: ['keinen', 'nicht', 'keine', 'kein'], answer: 'keinen', vocabulary: { term: 'keinen Kaffee', translation: 'ningún café' }, hint: 'Kaffee es masculino y aquí es objeto directo.' },
  ],
};

export const grammarLessonAccusative = {
  id: 'grammar-accusative',
  title: 'Artículos en acusativo',
  activityId: 'grammar-accusative',
  durationMinutes: 8,
  questions: [
    { id: 'accusative-q1', prompt: 'Completa: Ich sehe ___ Mann. (Veo al hombre.)', word: 'Mann', options: ['den', 'dem', 'die', 'das'], answer: 'den', vocabulary: { term: 'den Mann', translation: 'al hombre' }, hint: 'El artículo masculino der cambia a den en acusativo.' },
    { id: 'accusative-q2', prompt: 'Completa: Sie kauft ___ Tasche. (Ella compra el bolso.)', word: 'Tasche', options: ['die', 'den', 'dem', 'das'], answer: 'die', vocabulary: { term: 'die Tasche', translation: 'el bolso' }, hint: 'El artículo femenino die se mantiene en acusativo.' },
    { id: 'accusative-q3', prompt: 'Completa: Wir haben ___ Auto. (Tenemos un coche.)', word: 'Auto', options: ['ein', 'einen', 'eine', 'einem'], answer: 'ein', vocabulary: { term: 'ein Auto', translation: 'un coche' }, hint: 'El artículo neutro ein no cambia en acusativo.' },
  ],
};

export const vocabularyLessonHome = {
  id: 'vocabulary-home',
  title: 'La casa y sus habitaciones',
  activityId: 'vocabulary-home',
  durationMinutes: 6,
  questions: [
    { id: 'home-q1', prompt: '¿Qué significa “die Wohnung”?', word: 'Wohnung', options: ['El apartamento', 'La estación', 'La oficina', 'El jardín'], answer: 'El apartamento', vocabulary: { term: 'die Wohnung', translation: 'el apartamento' }, hint: 'Es el lugar donde vives.' },
    { id: 'home-q2', prompt: '¿Cómo se dice “cocina” en alemán?', word: 'cocina', options: ['Küche', 'Fenster', 'Zimmer', 'Tür'], answer: 'Küche', vocabulary: { term: 'die Küche', translation: 'la cocina' }, hint: 'Es la habitación donde preparas la comida.' },
    { id: 'home-q3', prompt: '¿Qué significa “das Schlafzimmer”?', word: 'Schlafzimmer', options: ['El dormitorio', 'El baño', 'El salón', 'El pasillo'], answer: 'El dormitorio', vocabulary: { term: 'das Schlafzimmer', translation: 'el dormitorio' }, hint: 'Schlaf se relaciona con dormir.' },
  ],
};

export const vocabularyLessonHealth = {
  id: 'vocabulary-health',
  title: 'Salud y bienestar',
  activityId: 'vocabulary-health',
  durationMinutes: 6,
  questions: [
    { id: 'health-q1', prompt: '¿Qué significa “der Kopf”?', word: 'Kopf', options: ['La cabeza', 'La mano', 'La espalda', 'El pie'], answer: 'La cabeza', vocabulary: { term: 'der Kopf', translation: 'la cabeza' }, hint: 'Está sobre el cuello.' },
    { id: 'health-q2', prompt: '¿Cómo se dice “médico” en alemán?', word: 'médico', options: ['Arzt', 'Lehrer', 'Koch', 'Fahrer'], answer: 'Arzt', vocabulary: { term: 'der Arzt', translation: 'el médico' }, hint: 'Visitas a esta persona cuando estás enfermo.' },
    { id: 'health-q3', prompt: '¿Qué significa “Ich bin krank”?', word: 'krank', options: ['Estoy enfermo', 'Tengo hambre', 'Estoy de viaje', 'Estoy cansado'], answer: 'Estoy enfermo', vocabulary: { term: 'krank', translation: 'enfermo' }, hint: 'Describe cómo te sientes cuando necesitas descansar.' },
  ],
};

export const vocabularyLessonHobbies = {
  id: 'vocabulary-hobbies',
  title: 'Tiempo libre y aficiones',
  activityId: 'vocabulary-hobbies',
  durationMinutes: 6,
  questions: [
    { id: 'hobbies-q1', prompt: '¿Qué significa “lesen”?', word: 'lesen', options: ['Leer', 'Cocinar', 'Bailar', 'Nadar'], answer: 'Leer', vocabulary: { term: 'lesen', translation: 'leer' }, hint: 'Lo haces cuando disfrutas de un libro.' },
    { id: 'hobbies-q2', prompt: '¿Cómo se dice “música” en alemán?', word: 'música', options: ['Musik', 'Sport', 'Film', 'Reise'], answer: 'Musik', vocabulary: { term: 'die Musik', translation: 'la música' }, hint: 'Se escucha y puede tener ritmo y melodía.' },
    { id: 'hobbies-q3', prompt: '¿Qué significa “Ich spiele gern Fußball”?', word: 'Fußball', options: ['Me gusta jugar al fútbol', 'Veo una película', 'Leo un libro', 'Cocino con gusto'], answer: 'Me gusta jugar al fútbol', vocabulary: { term: 'Fußball spielen', translation: 'jugar al fútbol' }, hint: 'Fußball es un deporte de equipo.' },
  ],
};

export const vocabularyLessonWork = {
  id: 'vocabulary-work',
  title: 'En el trabajo',
  activityId: 'vocabulary-work',
  durationMinutes: 6,
  questions: [
    { id: 'work-q1', prompt: '¿Qué significa “der Kollege”?', word: 'Kollege', options: ['El compañero de trabajo', 'El vecino', 'El cliente', 'El profesor'], answer: 'El compañero de trabajo', vocabulary: { term: 'der Kollege', translation: 'el compañero de trabajo' }, hint: 'Trabaja contigo en el mismo lugar.' },
    { id: 'work-q2', prompt: '¿Cómo se dice “reunión” en alemán?', word: 'reunión', options: ['Besprechung', 'Pause', 'Aufgabe', 'Büro'], answer: 'Besprechung', vocabulary: { term: 'die Besprechung', translation: 'la reunión' }, hint: 'Es una conversación de trabajo entre varias personas.' },
    { id: 'work-q3', prompt: '¿Qué significa “Ich arbeite von zu Hause”?', word: 'zu Hause', options: ['Trabajo desde casa', 'Trabajo en el centro', 'Voy al trabajo', 'Termino de trabajar'], answer: 'Trabajo desde casa', vocabulary: { term: 'von zu Hause arbeiten', translation: 'trabajar desde casa' }, hint: 'Zu Hause significa “en casa”.' },
  ],
};

export const readingLessonDoctor = {
  id: 'reading-doctor',
  title: 'Lectura: En la consulta médica',
  activityId: 'reading-doctor',
  durationMinutes: 7,
  questions: [
    { id: 'doctor-q1', prompt: 'El médico pregunta “Was fehlt Ihnen?”. ¿Qué quiere saber?', word: 'Was fehlt Ihnen?', options: ['Qué le pasa al paciente', 'Dónde vive el paciente', 'Cuándo viaja', 'Qué desea comer'], answer: 'Qué le pasa al paciente', vocabulary: { term: 'fehlen', translation: 'faltar / encontrarse mal' }, hint: 'Es una forma habitual de preguntar por los síntomas.' },
    { id: 'doctor-q2', prompt: 'El paciente dice “Seit gestern habe ich Fieber”. ¿Desde cuándo tiene fiebre?', word: 'seit gestern', options: ['Desde ayer', 'Desde hoy', 'Desde hace una semana', 'Desde la mañana'], answer: 'Desde ayer', vocabulary: { term: 'seit gestern', translation: 'desde ayer' }, hint: 'Gestern significa ayer.' },
    { id: 'doctor-q3', prompt: '¿Qué significa “Nehmen Sie diese Tabletten zweimal täglich”?', word: 'Tabletten', options: ['Tome estas pastillas dos veces al día', 'Descanse durante dos días', 'Vuelva la semana próxima', 'Beba agua antes de dormir'], answer: 'Tome estas pastillas dos veces al día', vocabulary: { term: 'zweimal täglich', translation: 'dos veces al día' }, hint: 'Zweimal significa dos veces y täglich, diariamente.' },
  ],
};

export const readingLessonWeekend = {
  id: 'reading-weekend',
  title: 'Lectura: Planes para el fin de semana',
  activityId: 'reading-weekend',
  durationMinutes: 7,
  questions: [
    { id: 'weekend-q1', prompt: 'Anna dice “Am Samstag fahre ich an den See”. ¿Adónde va?', word: 'See', options: ['Al lago', 'A la oficina', 'A la estación', 'Al médico'], answer: 'Al lago', vocabulary: { term: 'der See', translation: 'el lago' }, hint: 'Es un lugar con agua rodeado de tierra.' },
    { id: 'weekend-q2', prompt: '¿Qué significa “Wir treffen uns um drei Uhr”?', word: 'treffen', options: ['Nos encontramos a las tres', 'Salimos a las cuatro', 'Llegamos a las dos', 'Nos vemos mañana'], answer: 'Nos encontramos a las tres', vocabulary: { term: 'sich treffen', translation: 'encontrarse' }, hint: 'Drei Uhr indica las tres.' },
    { id: 'weekend-q3', prompt: 'Si llueve el domingo, ¿qué harán Anna y sus amigos?', word: 'regnen', options: ['Se quedarán en casa y verán una película', 'Irán al lago', 'Jugarán al fútbol fuera', 'Viajarán a otra ciudad'], answer: 'Se quedarán en casa y verán una película', vocabulary: { term: 'zu Hause bleiben', translation: 'quedarse en casa' }, hint: 'El plan alternativo es bajo techo.' },
  ],
};

export const readingLessonApartment = {
  id: 'reading-apartment',
  title: 'Lectura: Buscar apartamento',
  activityId: 'reading-apartment',
  durationMinutes: 7,
  questions: [
    { id: 'apartment-q1', prompt: 'La oferta dice “Die Wohnung hat zwei Zimmer”. ¿Cuántas habitaciones tiene?', word: 'zwei Zimmer', options: ['Dos', 'Una', 'Tres', 'Cuatro'], answer: 'Dos', vocabulary: { term: 'das Zimmer', translation: 'la habitación' }, hint: 'Zwei significa dos.' },
    { id: 'apartment-q2', prompt: '¿Qué significa “Die Miete beträgt 800 Euro”?', word: 'Miete', options: ['El alquiler es de 800 euros', 'El piso tiene 800 metros', 'La visita es a las ocho', 'El piso está en el centro'], answer: 'El alquiler es de 800 euros', vocabulary: { term: 'die Miete', translation: 'el alquiler' }, hint: 'Miete es el dinero que pagas por vivir en una vivienda.' },
    { id: 'apartment-q3', prompt: 'El anuncio dice “Die Wohnung ist ab Juni frei”. ¿Desde cuándo está disponible?', word: 'ab Juni', options: ['Desde junio', 'Hasta junio', 'Desde julio', 'Durante un año'], answer: 'Desde junio', vocabulary: { term: 'frei sein', translation: 'estar disponible' }, hint: 'Ab indica desde un momento.' },
  ],
};

export const grammarLessonModalVerbs = {
  id: 'grammar-modal-verbs',
  title: 'Verbos modales: können y müssen',
  activityId: 'grammar-modal-verbs',
  durationMinutes: 8,
  questions: [
    { id: 'modal-q1', prompt: 'Completa: Ich ___ heute länger arbeiten. (Tengo que trabajar más tiempo.)', word: 'müssen', options: ['muss', 'musst', 'müssen', 'kann'], answer: 'muss', vocabulary: { term: 'müssen', translation: 'tener que' }, hint: 'Con ich, müssen se conjuga muss.' },
    { id: 'modal-q2', prompt: 'Completa: ___ du mir helfen? (¿Puedes ayudarme?)', word: 'können', options: ['Kannst', 'Kann', 'Können', 'Musst'], answer: 'Kannst', vocabulary: { term: 'können', translation: 'poder' }, hint: 'La pregunta va dirigida a du.' },
    { id: 'modal-q3', prompt: '¿Dónde va el infinitivo en “Wir können heute ___”?', word: 'infinitivo', options: ['Al final de la frase', 'Antes del sujeto', 'Justo después del sujeto', 'No se usa infinitivo'], answer: 'Al final de la frase', vocabulary: { term: 'der Infinitiv', translation: 'el infinitivo' }, hint: 'El verbo modal conjugado ocupa la segunda posición.' },
  ],
};

export const grammarLessonDative = {
  id: 'grammar-dative',
  title: 'El dativo en frases cotidianas',
  activityId: 'grammar-dative',
  durationMinutes: 8,
  questions: [
    { id: 'dative-q1', prompt: 'Completa: Ich helfe ___ Mann. (Ayudo al hombre.)', word: 'helfen', options: ['dem', 'den', 'der', 'das'], answer: 'dem', vocabulary: { term: 'dem Mann', translation: 'al hombre (dativo)' }, hint: 'Helfen rige dativo y Mann es masculino.' },
    { id: 'dative-q2', prompt: 'Completa: Sie spricht mit ___ Freundin. (Habla con la amiga.)', word: 'mit', options: ['der', 'die', 'dem', 'den'], answer: 'der', vocabulary: { term: 'mit der Freundin', translation: 'con la amiga' }, hint: 'Mit siempre va seguido de dativo; Freundin es femenino.' },
    { id: 'dative-q3', prompt: '¿Qué significa “Das Buch gehört dem Kind”?', word: 'gehören', options: ['El libro pertenece al niño', 'El niño lee el libro', 'El libro está sobre el niño', 'El niño compra el libro'], answer: 'El libro pertenece al niño', vocabulary: { term: 'gehören', translation: 'pertenecer' }, hint: 'Gehören expresa a quién pertenece algo.' },
  ],
};

export const grammarLessonPerfect = {
  id: 'grammar-perfect',
  title: 'Pasado: Perfekt con haben y sein',
  activityId: 'grammar-perfect',
  durationMinutes: 8,
  questions: [
    { id: 'perfect-q1', prompt: 'Completa: Ich ___ gestern Deutsch gelernt.', word: 'lernen', options: ['habe', 'bin', 'hat', 'seid'], answer: 'habe', vocabulary: { term: 'lernen', translation: 'aprender' }, hint: 'Lernen forma el Perfekt con haben.' },
    { id: 'perfect-q2', prompt: 'Completa: Wir ___ nach Berlin gefahren.', word: 'fahren', options: ['sind', 'haben', 'ist', 'seid'], answer: 'sind', vocabulary: { term: 'fahren', translation: 'ir / viajar en vehículo' }, hint: 'Los verbos de desplazamiento suelen formar el Perfekt con sein.' },
    { id: 'perfect-q3', prompt: '¿Dónde suele colocarse el participio en “Sie hat einen Film gesehen”?', word: 'Partizip II', options: ['Al final de la frase', 'Antes del sujeto', 'Después del sujeto', 'No aparece'], answer: 'Al final de la frase', vocabulary: { term: 'gesehen', translation: 'visto' }, hint: 'El participio suele ir al final en una oración principal.' },
  ],
};

export const vocabularyLessons = [
  vocabularyLesson, vocabularyLessonDaily, vocabularyLessonFood, vocabularyLessonTravel,
  vocabularyLessonFamily, vocabularyLessonShopping, vocabularyLessonHome, vocabularyLessonHealth,
  vocabularyLessonHobbies, vocabularyLessonWork,
];
export const readingLessons = [
  readingLessonCity, readingLessonCafe, readingLessonStation, readingLessonMarket, readingLessonWeather,
  readingLessonDoctor, readingLessonWeekend, readingLessonApartment,
];
export const grammarLessons = [
  grammarLessonArticles, grammarLessonWordOrder, grammarLessonPresent, grammarLessonNegation,
  grammarLessonAccusative, grammarLessonModalVerbs, grammarLessonDative, grammarLessonPerfect,
];
export const lessons = [...vocabularyLessons, ...readingLessons, ...grammarLessons];
