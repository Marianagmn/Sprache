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

export const vocabularyLessonGreetings = {
  id: 'vocabulary-greetings',
  title: 'Saludos y presentaciones',
  activityId: 'vocabulary-greetings',
  durationMinutes: 5,
  questions: [
    {
      id: 'greetings-q1',
      prompt: '¿Cómo saludas por la mañana en alemán?',
      word: 'buenos días',
      audioWord: 'Morgen',
      audioPhrase: 'Guten Morgen! Wie geht es dir?',
      options: ['Guten Morgen', 'Gute Nacht', 'Auf Wiedersehen', 'Danke schön'],
      answer: 'Guten Morgen',
      vocabulary: { term: 'Guten Morgen', translation: 'buenos días' },
      hint: 'Guten Morgen se usa durante la mañana.',
      explanation: 'Guten Morgen es el saludo habitual por la mañana.',
    },
    {
      id: 'greetings-q2',
      prompt: '¿Qué significa “Wie heißt du?”?',
      word: 'Wie heißt du?',
      audioWord: 'heißen',
      audioPhrase: 'Wie heißt du?',
      options: ['¿Cómo te llamas?', '¿Dónde vives?', '¿Cuántos años tienes?', '¿Cómo estás?'],
      answer: '¿Cómo te llamas?',
      vocabulary: { term: 'Wie heißt du?', translation: '¿Cómo te llamas?' },
      hint: 'Heißt pregunta por el nombre.',
      explanation: 'Heißt viene del verbo heißen, que se usa para decir cómo se llama alguien.',
    },
    {
      id: 'greetings-q3',
      prompt: '¿Cómo te despides diciendo “hasta pronto”?',
      word: 'hasta pronto',
      audioWord: 'bald',
      audioPhrase: 'Bis bald!',
      options: ['Bis bald', 'Guten Abend', 'Bitte sehr', 'Gute Reise'],
      answer: 'Bis bald',
      vocabulary: { term: 'Bis bald', translation: 'hasta pronto' },
      hint: 'Bald significa pronto.',
      explanation: 'Bis bald expresa que esperas volver a ver a esa persona pronto.',
    },
  ],
};

export const vocabularyLessonStudy = {
  id: 'vocabulary-study',
  title: 'En clase y al estudiar',
  activityId: 'vocabulary-study',
  durationMinutes: 6,
  questions: [
    {
      id: 'study-q1',
      prompt: '¿Cómo se dice “cuaderno” en alemán?',
      word: 'cuaderno',
      audioWord: 'Heft',
      audioPhrase: 'Das Heft liegt auf dem Tisch.',
      options: ['das Heft', 'der Stift', 'die Tafel', 'das Buch'],
      answer: 'das Heft',
      vocabulary: { term: 'das Heft', translation: 'el cuaderno' },
      hint: 'Es donde escribes apuntes.',
      explanation: 'Das Heft es un cuaderno; es un sustantivo neutro.',
    },
    {
      id: 'study-q2',
      prompt: '¿Qué significa “Ich lerne Deutsch”?',
      word: 'Ich lerne Deutsch',
      audioWord: 'lernen',
      audioPhrase: 'Ich lerne Deutsch.',
      options: ['Estudio alemán', 'Enseño alemán', 'Hablo inglés', 'Leo un libro'],
      answer: 'Estudio alemán',
      vocabulary: { term: 'lernen', translation: 'aprender / estudiar' },
      hint: 'Lernen describe adquirir conocimientos.',
      explanation: 'Ich lerne Deutsch significa “estudio alemán”; lerne es la forma de lernen con ich.',
    },
    {
      id: 'study-q3',
      prompt: '¿Cómo se dice “profesora” en alemán?',
      word: 'profesora',
      audioWord: 'Lehrerin',
      audioPhrase: 'Die Lehrerin erklärt die Aufgabe.',
      options: ['die Lehrerin', 'die Schülerin', 'die Freundin', 'die Ärztin'],
      answer: 'die Lehrerin',
      vocabulary: { term: 'die Lehrerin', translation: 'la profesora' },
      hint: 'Es la persona que enseña en clase.',
      explanation: 'Lehrerin es la forma femenina de Lehrer, “profesor”.',
    },
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

export const readingLessonConversation = {
  id: 'reading-conversation',
  title: 'Conversación: Conocerse',
  activityId: 'reading-conversation',
  durationMinutes: 6,
  questions: [
    {
      id: 'conversation-q1',
      prompt: 'Ana pregunta “Woher kommst du?”. ¿Qué quiere saber?',
      word: 'Woher kommst du?',
      audioWord: 'kommen',
      audioPhrase: 'Woher kommst du?',
      options: ['De dónde eres', 'Dónde estudias', 'Adónde viajas', 'Qué idioma hablas'],
      answer: 'De dónde eres',
      vocabulary: { term: 'Woher kommst du?', translation: '¿De dónde eres?' },
      hint: 'Woher pregunta por el origen.',
      explanation: 'Woher kommst du? pregunta por el lugar de origen de la otra persona.',
    },
    {
      id: 'conversation-q2',
      prompt: 'Luis responde “Ich komme aus Kolumbien”. ¿De dónde es?',
      word: 'Ich komme aus Kolumbien',
      audioWord: 'Kolumbien',
      audioPhrase: 'Ich komme aus Kolumbien.',
      options: ['De Colombia', 'De Alemania', 'De España', 'De Austria'],
      answer: 'De Colombia',
      vocabulary: { term: 'aus Kolumbien', translation: 'de Colombia' },
      hint: 'Kolumbien es el nombre alemán de Colombia.',
      explanation: 'Aus significa “de” al hablar del origen; Kolumbien es Colombia en alemán.',
    },
    {
      id: 'conversation-q3',
      prompt: '¿Qué dice Luis para pedir que repitan más despacio?',
      word: '¿Puedes repetirlo?',
      audioWord: 'wiederholen',
      audioPhrase: 'Kannst du das bitte langsamer wiederholen?',
      options: [
        'Kannst du das bitte langsamer wiederholen?',
        'Ich möchte jetzt gehen.',
        'Wo ist der Bahnhof?',
        'Das schmeckt sehr gut.',
      ],
      answer: 'Kannst du das bitte langsamer wiederholen?',
      vocabulary: { term: 'wiederholen', translation: 'repetir' },
      hint: 'Wiederholen significa hacer o decir algo otra vez.',
      explanation: 'La frase pide amablemente que repitan algo más despacio.',
    },
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

// Additional A1 Vocabulary Lessons
export const vocabularyLessonNumbers = {
  id: 'vocabulary-numbers',
  title: 'Números 1-20',
  activityId: 'vocabulary-numbers',
  durationMinutes: 6,
  questions: [
    { id: 'numbers-q1', prompt: '¿Cómo se dice "cinco" en alemán?', word: 'cinco', options: ['fünf', 'vier', 'sechs', 'drei'], answer: 'fünf', vocabulary: { term: 'fünf', translation: 'cinco' }, hint: 'Es el número 5.' },
    { id: 'numbers-q2', prompt: '¿Qué significa "zehn"?', word: 'zehn', options: ['Diez', 'Ocho', 'Doce', 'Nueve'], answer: 'Diez', vocabulary: { term: 'zehn', translation: 'diez' }, hint: 'Es el número 10.' },
    { id: 'numbers-q3', prompt: '¿Cómo se dice "veinte" en alemán?', word: 'veinte', options: ['zwanzig', 'fünfzehn', 'dreißig', 'vierzig'], answer: 'zwanzig', vocabulary: { term: 'zwanzig', translation: 'veinte' }, hint: 'Termina en -zig.' },
  ],
};

export const vocabularyLessonColors = {
  id: 'vocabulary-colors',
  title: 'Colores',
  activityId: 'vocabulary-colors',
  durationMinutes: 5,
  questions: [
    { id: 'colors-q1', prompt: '¿Cómo se dice "rojo" en alemán?', word: 'rojo', options: ['rot', 'blau', 'grün', 'gelb'], answer: 'rot', vocabulary: { term: 'rot', translation: 'rojo' }, hint: 'El color de la sangre.' },
    { id: 'colors-q2', prompt: '¿Qué significa "blau"?', word: 'blau', options: ['Azul', 'Negro', 'Blanco', 'Gris'], answer: 'Azul', vocabulary: { term: 'blau', translation: 'azul' }, hint: 'El color del cielo.' },
    { id: 'colors-q3', prompt: '¿Cómo se dice "negro" en alemán?', word: 'negro', options: ['schwarz', 'weiß', 'grau', 'braun'], answer: 'schwarz', vocabulary: { term: 'schwarz', translation: 'negro' }, hint: 'El color de la noche.' },
  ],
};

export const vocabularyLessonAnimals = {
  id: 'vocabulary-animals',
  title: 'Animales',
  activityId: 'vocabulary-animals',
  durationMinutes: 5,
  questions: [
    { id: 'animals-q1', prompt: '¿Cómo se dice "perro" en alemán?', word: 'perro', options: ['Hund', 'Katze', 'Vogel', 'Fisch'], answer: 'Hund', vocabulary: { term: 'der Hund', translation: 'el perro' }, hint: 'Es el animal doméstico más común.' },
    { id: 'animals-q2', prompt: '¿Qué significa "die Katze"?', word: 'die Katze', options: ['El gato', 'El perro', 'El pájaro', 'El pez'], answer: 'El gato', vocabulary: { term: 'die Katze', translation: 'el gato' }, hint: 'Maulla y se trepa.' },
    { id: 'animals-q3', prompt: '¿Cómo se dice "pájaro" en alemán?', word: 'pájaro', options: ['Vogel', 'Tier', 'Hund', 'Katze'], answer: 'Vogel', vocabulary: { term: 'der Vogel', translation: 'el pájaro' }, hint: 'Vuela en el cielo.' },
  ],
};

export const vocabularyLessonBody = {
  id: 'vocabulary-body',
  title: 'El cuerpo humano',
  activityId: 'vocabulary-body',
  durationMinutes: 5,
  questions: [
    { id: 'body-q1', prompt: '¿Cómo se dice "mano" en alemán?', word: 'mano', options: ['Hand', 'Fuß', 'Arm', 'Bein'], answer: 'Hand', vocabulary: { term: 'die Hand', translation: 'la mano' }, hint: 'Tienes dos al final de los brazos.' },
    { id: 'body-q2', prompt: '¿Qué significa "das Auge"?', word: 'das Auge', options: ['El ojo', 'La nariz', 'La boca', 'La oreja'], answer: 'El ojo', vocabulary: { term: 'das Auge', translation: 'el ojo' }, hint: 'Sirve para ver.' },
    { id: 'body-q3', prompt: '¿Cómo se dice "pie" en alemán?', word: 'pie', options: ['Fuß', 'Hand', 'Arm', 'Kopf'], answer: 'Fuß', vocabulary: { term: 'der Fuß', translation: 'el pie' }, hint: 'Está al final de la pierna.' },
  ],
};

export const vocabularyLessonWeather = {
  id: 'vocabulary-weather',
  title: 'El tiempo atmosférico',
  activityId: 'vocabulary-weather',
  durationMinutes: 5,
  questions: [
    { id: 'weather-q1', prompt: '¿Cómo se dice "sol" en alemán?', word: 'sol', options: ['Sonne', 'Mond', 'Stern', 'Wolke'], answer: 'Sonne', vocabulary: { term: 'die Sonne', translation: 'el sol' }, hint: 'Brilla durante el día.' },
    { id: 'weather-q2', prompt: '¿Qué significa "der Regen"?', word: 'der Regen', options: ['La lluvia', 'La nieve', 'El viento', 'El granizo'], answer: 'La lluvia', vocabulary: { term: 'der Regen', translation: 'la lluvia' }, hint: 'Cae del cielo cuando hay nubes.' },
    { id: 'weather-q3', prompt: '¿Cómo se dice "nieve" en alemán?', word: 'nieve', options: ['Schnee', 'Regen', 'Wind', 'Sonne'], answer: 'Schnee', vocabulary: { term: 'der Schnee', translation: 'la nieve' }, hint: 'Es blanca y fría.' },
  ],
};

export const vocabularyLessonClothes = {
  id: 'vocabulary-clothes',
  title: 'Ropa',
  activityId: 'vocabulary-clothes',
  durationMinutes: 5,
  questions: [
    { id: 'clothes-q1', prompt: '¿Cómo se dice "camisa" en alemán?', word: 'camisa', options: ['Hemd', 'Hose', 'Jacke', 'Schuhe'], answer: 'Hemd', vocabulary: { term: 'das Hemd', translation: 'la camisa' }, hint: 'Se lleva en la parte superior.' },
    { id: 'clothes-q2', prompt: '¿Qué significa "die Hose"?', word: 'die Hose', options: ['El pantalón', 'La camisa', 'La chaqueta', 'Los zapatos'], answer: 'El pantalón', vocabulary: { term: 'die Hose', translation: 'el pantalón' }, hint: 'Se lleva en las piernas.' },
    { id: 'clothes-q3', prompt: '¿Cómo se dice "zapatos" en alemán?', word: 'zapatos', options: ['Schuhe', 'Hemd', 'Hose', 'Jacke'], answer: 'Schuhe', vocabulary: { term: 'die Schuhe', translation: 'los zapatos' }, hint: 'Se llevan en los pies.' },
  ],
};

export const vocabularyLessonTime = {
  id: 'vocabulary-time',
  title: 'El tiempo y las horas',
  activityId: 'vocabulary-time',
  durationMinutes: 5,
  questions: [
    { id: 'time-q1', prompt: '¿Cómo se dice "hora" en alemán?', word: 'hora', options: ['Stunde', 'Minute', 'Tag', 'Woche'], answer: 'Stunde', vocabulary: { term: 'die Stunde', translation: 'la hora' }, hint: 'Hay 24 en un día.' },
    { id: 'time-q2', prompt: '¿Qué significa "heute"?', word: 'heute', options: ['Hoy', 'Mañana', 'Ayer', 'La semana que viene'], answer: 'Hoy', vocabulary: { term: 'heute', translation: 'hoy' }, hint: 'Es el día actual.' },
    { id: 'time-q3', prompt: '¿Cómo se dice "mañana" en alemán?', word: 'mañana', options: ['morgen', 'heute', 'gestern', 'übermorgen'], answer: 'morgen', vocabulary: { term: 'morgen', translation: 'mañana' }, hint: 'El día después de hoy.' },
  ],
};

export const vocabularyLessonDirections = {
  id: 'vocabulary-directions',
  title: 'Direcciones y lugares',
  activityId: 'vocabulary-directions',
  durationMinutes: 5,
  questions: [
    { id: 'directions-q1', prompt: '¿Cómo se dice "izquierda" en alemán?', word: 'izquierda', options: ['links', 'rechts', 'oben', 'unten'], answer: 'links', vocabulary: { term: 'links', translation: 'izquierda' }, hint: 'Lo opuesto a derecha.' },
    { id: 'directions-q2', prompt: '¿Qué significa "rechts"?', word: 'rechts', options: ['Derecha', 'Izquierda', 'Arriba', 'Abajo'], answer: 'Derecha', vocabulary: { term: 'rechts', translation: 'derecha' }, hint: 'Lo opuesto a izquierda.' },
    { id: 'directions-q3', prompt: '¿Cómo se dice "aquí" en alemán?', word: 'aquí', options: ['hier', 'dort', 'da', 'wo'], answer: 'hier', vocabulary: { term: 'hier', translation: 'aquí' }, hint: 'En este lugar.' },
  ],
};

export const vocabularyLessonVerbsBasic = {
  id: 'vocabulary-verbs-basic',
  title: 'Verbos básicos',
  activityId: 'vocabulary-verbs-basic',
  durationMinutes: 6,
  questions: [
    { id: 'verbs-q1', prompt: '¿Cómo se dice "tener" en alemán?', word: 'tener', options: ['haben', 'sein', 'werden', 'können'], answer: 'haben', vocabulary: { term: 'haben', translation: 'tener' }, hint: 'Para poseer algo.' },
    { id: 'verbs-q2', prompt: '¿Qué significa "sein"?', word: 'sein', options: ['Ser/estar', 'Tener', 'Hacer', 'Ir'], answer: 'Ser/estar', vocabulary: { term: 'sein', translation: 'ser/estar' }, hint: 'El verbo "to be" en alemán.' },
    { id: 'verbs-q3', prompt: '¿Cómo se dice "hacer" en alemán?', word: 'hacer', options: ['machen', 'haben', 'sein', 'gehen'], answer: 'machen', vocabulary: { term: 'machen', translation: 'hacer' }, hint: 'Para realizar una acción.' },
  ],
};

export const vocabularyLessonPrepositions = {
  id: 'vocabulary-prepositions',
  title: 'Preposiciones básicas',
  activityId: 'vocabulary-prepositions',
  durationMinutes: 5,
  questions: [
    { id: 'prep-q1', prompt: '¿Cómo se dice "en" en alemán?', word: 'en', options: ['in', 'auf', 'bei', 'zu'], answer: 'in', vocabulary: { term: 'in', translation: 'en' }, hint: 'Para estar dentro de algo.' },
    { id: 'prep-q2', prompt: '¿Qué significa "mit"?', word: 'mit', options: ['Con', 'Sin', 'Para', 'De'], answer: 'Con', vocabulary: { term: 'mit', translation: 'con' }, hint: 'Para acompañamiento.' },
    { id: 'prep-q3', prompt: '¿Cómo se dice "para" en alemán?', word: 'para', options: ['für', 'mit', 'von', 'zu'], answer: 'für', vocabulary: { term: 'für', translation: 'para' }, hint: 'Para destinatario o propósito.' },
  ],
};

export const vocabularyLessonQuestions = {
  id: 'vocabulary-questions',
  title: 'Palabras interrogativas',
  activityId: 'vocabulary-questions',
  durationMinutes: 5,
  questions: [
    { id: 'questions-q1', prompt: '¿Cómo se dice "qué" en alemán?', word: 'qué', options: ['was', 'wer', 'wo', 'wann'], answer: 'was', vocabulary: { term: 'was', translation: 'qué' }, hint: 'Para preguntar sobre cosas.' },
    { id: 'questions-q2', prompt: '¿Qué significa "wer"?', word: 'wer', options: ['Quién', 'Qué', 'Dónde', 'Cuándo'], answer: 'Quién', vocabulary: { term: 'wer', translation: 'quién' }, hint: 'Para preguntar sobre personas.' },
    { id: 'questions-q3', prompt: '¿Cómo se dice "dónde" en alemán?', word: 'dónde', options: ['wo', 'was', 'wer', 'wann'], answer: 'wo', vocabulary: { term: 'wo', translation: 'dónde' }, hint: 'Para preguntar sobre lugar.' },
  ],
};

export const vocabularyLessonAdjectives = {
  id: 'vocabulary-adjectives',
  title: 'Adjetivos básicos',
  activityId: 'vocabulary-adjectives',
  durationMinutes: 5,
  questions: [
    { id: 'adj-q1', prompt: '¿Cómo se dice "grande" en alemán?', word: 'grande', options: ['groß', 'klein', 'gut', 'schlecht'], answer: 'groß', vocabulary: { term: 'groß', translation: 'grande' }, hint: 'Lo opuesto de pequeño.' },
    { id: 'adj-q2', prompt: '¿Qué significa "klein"?', word: 'klein', options: ['Pequeño', 'Grande', 'Bueno', 'Malo'], answer: 'Pequeño', vocabulary: { term: 'klein', translation: 'pequeño' }, hint: 'Lo opuesto de grande.' },
    { id: 'adj-q3', prompt: '¿Cómo se dice "bueno" en alemán?', word: 'bueno', options: ['gut', 'schlecht', 'groß', 'klein'], answer: 'gut', vocabulary: { term: 'gut', translation: 'bueno' }, hint: 'Lo opuesto de malo.' },
  ],
};

export const vocabularyLessonProfessions = {
  id: 'vocabulary-professions',
  title: 'Profesiones',
  activityId: 'vocabulary-professions',
  durationMinutes: 5,
  questions: [
    { id: 'prof-q1', prompt: '¿Cómo se dice "médico" en alemán?', word: 'médico', options: ['Arzt', 'Lehrer', 'Koch', 'Polizist'], answer: 'Arzt', vocabulary: { term: 'der Arzt', translation: 'el médico' }, hint: 'Trabaja en un hospital.' },
    { id: 'prof-q2', prompt: '¿Qué significa "der Lehrer"?', word: 'der Lehrer', options: ['El profesor', 'El médico', 'El cocinero', 'El policía'], answer: 'El profesor', vocabulary: { term: 'der Lehrer', translation: 'el profesor' }, hint: 'Enseña en una escuela.' },
    { id: 'prof-q3', prompt: '¿Cómo se dice "cocinero" en alemán?', word: 'cocinero', options: ['Koch', 'Arzt', 'Lehrer', 'Polizist'], answer: 'Koch', vocabulary: { term: 'der Koch', translation: 'el cocinero' }, hint: 'Trabaja en una cocina.' },
  ],
};

export const vocabularyLessonSchool = {
  id: 'vocabulary-school',
  title: 'La escuela',
  activityId: 'vocabulary-school',
  durationMinutes: 5,
  questions: [
    { id: 'school-q1', prompt: '¿Cómo se dice "escuela" en alemán?', word: 'escuela', options: ['Schule', 'Universität', 'Bibliothek', 'Klasse'], answer: 'Schule', vocabulary: { term: 'die Schule', translation: 'la escuela' }, hint: 'Donde estudian los niños.' },
    { id: 'school-q2', prompt: '¿Qué significa "der Schüler"?', word: 'der Schüler', options: ['El estudiante', 'El profesor', 'La clase', 'El examen'], answer: 'El estudiante', vocabulary: { term: 'der Schüler', translation: 'el estudiante' }, hint: 'Alguien que aprende.' },
    { id: 'school-q3', prompt: '¿Cómo se dice "examen" en alemán?', word: 'examen', options: ['Prüfung', 'Klasse', 'Schule', 'Buch'], answer: 'Prüfung', vocabulary: { term: 'die Prüfung', translation: 'el examen' }, hint: 'Se hace para evaluar conocimientos.' },
  ],
};

export const vocabularyLessonNature = {
  id: 'vocabulary-nature',
  title: 'La naturaleza',
  activityId: 'vocabulary-nature',
  durationMinutes: 5,
  questions: [
    { id: 'nature-q1', prompt: '¿Cómo se dice "árbol" en alemán?', word: 'árbol', options: ['Baum', 'Blume', 'Gras', 'Wald'], answer: 'Baum', vocabulary: { term: 'der Baum', translation: 'el árbol' }, hint: 'Es grande y tiene hojas.' },
    { id: 'nature-q2', prompt: '¿Qué significa "die Blume"?', word: 'die Blume', options: ['La flor', 'El árbol', 'El bosque', 'El río'], answer: 'La flor', vocabulary: { term: 'die Blume', translation: 'la flor' }, hint: 'Es colorida y huele bien.' },
    { id: 'nature-q3', prompt: '¿Cómo se dice "río" en alemán?', word: 'río', options: ['Fluss', 'See', 'Meer', 'Berg'], answer: 'Fluss', vocabulary: { term: 'der Fluss', translation: 'el río' }, hint: 'Agua que fluye.' },
  ],
};

export const vocabularyLessonTransport = {
  id: 'vocabulary-transport',
  title: 'Transporte',
  activityId: 'vocabulary-transport',
  durationMinutes: 5,
  questions: [
    { id: 'transport-q1', prompt: '¿Cómo se dice "coche" en alemán?', word: 'coche', options: ['Auto', 'Bus', 'Fahrrad', 'Flugzeug'], answer: 'Auto', vocabulary: { term: 'das Auto', translation: 'el coche' }, hint: 'Vehículo personal con 4 ruedas.' },
    { id: 'transport-q2', prompt: '¿Qué significa "das Fahrrad"?', word: 'das Fahrrad', options: ['La bicicleta', 'El coche', 'El autobús', 'El avión'], answer: 'La bicicleta', vocabulary: { term: 'das Fahrrad', translation: 'la bicicleta' }, hint: 'Tiene dos ruedas y pedales.' },
    { id: 'transport-q3', prompt: '¿Cómo se dice "avión" en alemán?', word: 'avión', options: ['Flugzeug', 'Auto', 'Bus', 'Schiff'], answer: 'Flugzeug', vocabulary: { term: 'das Flugzeug', translation: 'el avión' }, hint: 'Vuela en el cielo.' },
  ],
};

export const vocabularyLessonTechnology = {
  id: 'vocabulary-technology',
  title: 'Tecnología',
  activityId: 'vocabulary-technology',
  durationMinutes: 5,
  questions: [
    { id: 'tech-q1', prompt: '¿Cómo se dice "teléfono" en alemán?', word: 'teléfono', options: ['Telefon', 'Computer', 'Internet', 'Tablet'], answer: 'Telefon', vocabulary: { term: 'das Telefon', translation: 'el teléfono' }, hint: 'Para llamar a alguien.' },
    { id: 'tech-q2', prompt: '¿Qué significa "der Computer"?', word: 'der Computer', options: ['El ordenador', 'El teléfono', 'La televisión', 'La radio'], answer: 'El ordenador', vocabulary: { term: 'der Computer', translation: 'el ordenador' }, hint: 'Se usa para trabajar y navegar.' },
    { id: 'tech-q3', prompt: '¿Cómo se dice "internet" en alemán?', word: 'internet', options: ['Internet', 'Telefon', 'Computer', 'Fernseher'], answer: 'Internet', vocabulary: { term: 'das Internet', translation: 'el internet' }, hint: 'Red mundial de comunicación.' },
  ],
};

export const vocabularyLessonEmotions = {
  id: 'vocabulary-emotions',
  title: 'Emociones',
  activityId: 'vocabulary-emotions',
  durationMinutes: 5,
  questions: [
    { id: 'emotions-q1', prompt: '¿Cómo se dice "feliz" en alemán?', word: 'feliz', options: ['glücklich', 'traurig', 'wütend', 'müde'], answer: 'glücklich', vocabulary: { term: 'glücklich', translation: 'feliz' }, hint: 'Sentimiento positivo.' },
    { id: 'emotions-q2', prompt: '¿Qué significa "traurig"?', word: 'traurig', options: ['Triste', 'Feliz', 'Enojado', 'Cansado'], answer: 'Triste', vocabulary: { term: 'traurig', translation: 'triste' }, hint: 'Sentimiento negativo.' },
    { id: 'emotions-q3', prompt: '¿Cómo se dice "cansado" en alemán?', word: 'cansado', options: ['müde', 'glücklich', 'traurig', 'wütend'], answer: 'müde', vocabulary: { term: 'müde', translation: 'cansado' }, hint: 'Cuando necesitas dormir.' },
  ],
};

export const vocabularyLessonFoodDrinks = {
  id: 'vocabulary-food-drinks',
  title: 'Comida y bebida extendido',
  activityId: 'vocabulary-food-drinks',
  durationMinutes: 6,
  questions: [
    { id: 'food-drinks-q1', prompt: '¿Cómo se dice "pan" en alemán?', word: 'pan', options: ['Brot', 'Käse', 'Wurst', 'Butter'], answer: 'Brot', vocabulary: { term: 'das Brot', translation: 'el pan' }, hint: 'Se hornea con harina.' },
    { id: 'food-drinks-q2', prompt: '¿Qué significa "der Käse"?', word: 'der Käse', options: ['El queso', 'El pan', 'La carne', 'El pescado'], answer: 'El queso', vocabulary: { term: 'der Käse', translation: 'el queso' }, hint: 'Derivado de la leche.' },
    { id: 'food-drinks-q3', prompt: '¿Cómo se dice "carne" en alemán?', word: 'carne', options: ['Fleisch', 'Brot', 'Käse', 'Gemüse'], answer: 'Fleisch', vocabulary: { term: 'das Fleisch', translation: 'la carne' }, hint: 'Proteína animal.' },
  ],
};

export const vocabularyLessonFurniture = {
  id: 'vocabulary-furniture',
  title: 'Muebles',
  activityId: 'vocabulary-furniture',
  durationMinutes: 5,
  questions: [
    { id: 'furniture-q1', prompt: '¿Cómo se dice "silla" en alemán?', word: 'silla', options: ['Stuhl', 'Tisch', 'Bett', 'Sofa'], answer: 'Stuhl', vocabulary: { term: 'der Stuhl', translation: 'la silla' }, hint: 'Para sentarse.' },
    { id: 'furniture-q2', prompt: '¿Qué significa "das Bett"?', word: 'das Bett', options: ['La cama', 'La silla', 'La mesa', 'El sofá'], answer: 'La cama', vocabulary: { term: 'das Bett', translation: 'la cama' }, hint: 'Para dormir.' },
    { id: 'furniture-q3', prompt: '¿Cómo se dice "sofá" en alemán?', word: 'sofá', options: ['Sofa', 'Stuhl', 'Tisch', 'Bett'], answer: 'Sofa', vocabulary: { term: 'das Sofa', translation: 'el sofá' }, hint: 'Mueble para el salón.' },
  ],
};

export const vocabularyLessonFruits = {
  id: 'vocabulary-fruits',
  title: 'Frutas',
  activityId: 'vocabulary-fruits',
  durationMinutes: 5,
  questions: [
    { id: 'fruits-q1', prompt: '¿Cómo se dice "manzana" en alemán?', word: 'manzana', options: ['Apfel', 'Banane', 'Orange', 'Traube'], answer: 'Apfel', vocabulary: { term: 'der Apfel', translation: 'la manzana' }, hint: 'Fruta roja o verde.' },
    { id: 'fruits-q2', prompt: '¿Qué significa "die Banane"?', word: 'die Banane', options: ['El plátano', 'La manzana', 'La naranja', 'La uva'], answer: 'El plátano', vocabulary: { term: 'die Banane', translation: 'el plátano' }, hint: 'Fruta amarilla y alargada.' },
    { id: 'fruits-q3', prompt: '¿Cómo se dice "naranja" en alemán?', word: 'naranja', options: ['Orange', 'Apfel', 'Banane', 'Traube'], answer: 'Orange', vocabulary: { term: 'die Orange', translation: 'la naranja' }, hint: 'Fruta naranja.' },
  ],
};

export const vocabularyLessonVegetables = {
  id: 'vocabulary-vegetables',
  title: 'Verduras',
  activityId: 'vocabulary-vegetables',
  durationMinutes: 5,
  questions: [
    { id: 'vegetables-q1', prompt: '¿Cómo se dice "tomate" en alemán?', word: 'tomate', options: ['Tomate', 'Karotte', 'Kartoffel', 'Salat'], answer: 'Tomate', vocabulary: { term: 'die Tomate', translation: 'el tomate' }, hint: 'Vegetal rojo.' },
    { id: 'vegetables-q2', prompt: '¿Qué significa "die Karotte"?', word: 'die Karotte', options: ['La zanahoria', 'El tomate', 'La patata', 'La lechuga'], answer: 'La zanahoria', vocabulary: { term: 'die Karotte', translation: 'la zanahoria' }, hint: 'Vegetal naranja.' },
    { id: 'vegetables-q3', prompt: '¿Cómo se dice "patata" en alemán?', word: 'patata', options: ['Kartoffel', 'Tomate', 'Karotte', 'Salat'], answer: 'Kartoffel', vocabulary: { term: 'die Kartoffel', translation: 'la patata' }, hint: 'Tubérculo muy común.' },
  ],
};

export const vocabularyLessons = [
  vocabularyLesson, vocabularyLessonDaily, vocabularyLessonFood, vocabularyLessonTravel,
  vocabularyLessonFamily, vocabularyLessonShopping, vocabularyLessonHome, vocabularyLessonHealth,
  vocabularyLessonHobbies, vocabularyLessonWork, vocabularyLessonGreetings, vocabularyLessonStudy,
  vocabularyLessonNumbers, vocabularyLessonColors, vocabularyLessonAnimals, vocabularyLessonBody,
  vocabularyLessonWeather, vocabularyLessonClothes, vocabularyLessonTime, vocabularyLessonDirections,
  vocabularyLessonVerbsBasic, vocabularyLessonPrepositions, vocabularyLessonQuestions, vocabularyLessonAdjectives,
  vocabularyLessonProfessions, vocabularyLessonSchool, vocabularyLessonNature, vocabularyLessonTransport,
  vocabularyLessonTechnology, vocabularyLessonEmotions, vocabularyLessonFoodDrinks, vocabularyLessonFurniture,
  vocabularyLessonFruits, vocabularyLessonVegetables,
];

// Additional A2 Reading Lessons
export const readingLessonRestaurant = {
  id: 'reading-restaurant',
  title: 'Lectura: En el restaurante',
  activityId: 'reading-restaurant',
  durationMinutes: 7,
  questions: [
    { id: 'restaurant-q1', prompt: '¿Qué pide el cliente primero?', word: 'cliente', options: ['Una bebida', 'Comida', 'La cuenta', 'Postre'], answer: 'Una bebida', vocabulary: { term: 'die Getränke', translation: 'las bebidas' }, hint: 'Lee el primer párrafo.' },
    { id: 'restaurant-q2', prompt: '¿Qué significa "Ich möchte bezahlen"?', word: 'bezahlen', options: ['Quiero pagar', 'Quiero comer', '¿Dónde está?', 'Es caro'], answer: 'Quiero pagar', vocabulary: { term: 'bezahlen', translation: 'pagar' }, hint: 'Bezahlen significa pagar.' },
    { id: 'restaurant-q3', prompt: '¿Cómo pide el cliente el postre?', word: 'postre', options: ['Como Nachspeise', 'Como Hauptgericht', 'Como Vorspeise', 'Como Getränk'], answer: 'Como Nachspeise', vocabulary: { term: 'die Nachspeise', translation: 'el postre' }, hint: 'Nachspeise es el postre.' },
  ],
};

export const readingLessonLibrary = {
  id: 'reading-library',
  title: 'Lectura: En la biblioteca',
  activityId: 'reading-library',
  durationMinutes: 7,
  questions: [
    { id: 'library-q1', prompt: '¿Qué hace la persona en la biblioteca?', word: 'biblioteca', options: ['Estudia', 'Duerme', 'Come', 'Juega'], answer: 'Estudia', vocabulary: { term: 'die Bibliothek', translation: 'la biblioteca' }, hint: 'Es un lugar para estudiar.' },
    { id: 'library-q2', prompt: '¿Qué significa "das Buch"?', word: 'Buch', options: ['El libro', 'La mesa', 'La silla', 'La ventana'], answer: 'El libro', vocabulary: { term: 'das Buch', translation: 'el libro' }, hint: 'Buch es un sustantivo neutro.' },
    { id: 'library-q3', prompt: '¿Cómo se dice "prestar" en alemán?', word: 'prestar', options: ['ausleihen', 'kaufen', 'lesen', 'schreiben'], answer: 'ausleihen', vocabulary: { term: 'ausleihen', translation: 'prestar' }, hint: 'Ausleihen es tomar prestado.' },
  ],
};

export const readingLessons = [
  readingLessonCity, readingLessonCafe, readingLessonStation, readingLessonMarket, readingLessonWeather,
  readingLessonDoctor, readingLessonWeekend, readingLessonApartment, readingLessonConversation,
  readingLessonRestaurant, readingLessonLibrary,
];
export const grammarLessonNounPlural = {
  id: 'grammar-noun-plural',
  title: 'Plural de sustantivos',
  activityId: 'grammar-noun-plural',
  durationMinutes: 8,
  questions: [
    { id: 'plural-q1', prompt: '¿Cuál es el plural de "der Hund"?', word: 'Hund', options: ['die Hunde', 'der Hunde', 'das Hunde', 'die Hunds'], answer: 'die Hunde', vocabulary: { term: 'der Hund', translation: 'el perro' }, hint: 'Muchos sustantivos masculinos añaden -e.' },
    { id: 'plural-q2', prompt: '¿Cuál es el plural de "die Katze"?', word: 'Katze', options: ['die Katzen', 'der Katzen', 'die Katze', 'das Katzen'], answer: 'die Katzen', vocabulary: { term: 'die Katze', translation: 'el gato' }, hint: 'Los sustantivos femeninos suelen añadir -n o -en.' },
    { id: 'plural-q3', prompt: '¿Cuál es el plural de "das Buch"?', word: 'Buch', options: ['die Bücher', 'der Bücher', 'das Bücher', 'die Buch'], answer: 'die Bücher', vocabulary: { term: 'das Buch', translation: 'el libro' }, hint: 'Algunos sustantivos neutros tienen umlaut (ü) en el plural.' },
  ],
};

export const grammarLessonSeparableVerbs = {
  id: 'grammar-separable-verbs',
  title: 'Verbos separables',
  activityId: 'grammar-separable-verbs',
  durationMinutes: 8,
  questions: [
    { id: 'separable-q1', prompt: 'Completa: Ich ___ um 8 Uhr auf. (despertarse)', word: 'aufstehen', options: ['stehe', 'steht', 'stehen', 'stand'], answer: 'stehe', vocabulary: { term: 'aufstehen', translation: 'despertarse' }, hint: 'Auf es un prefijo separable que va al final.' },
    { id: 'separable-q2', prompt: '¿Dónde va el prefijo en "Wir gehen heute ins Kino ___"?', word: 'einkaufen', options: ['einkaufen', 'kaufen ein', 'ein kaufen', 'einkauf'], answer: 'einkaufen', vocabulary: { term: 'einkaufen', translation: 'ir de compras' }, hint: 'En afirmación, el prefijo va al final de la oración.' },
    { id: 'separable-q3', prompt: 'Completa: Er ___ den Anzug an. (ponerse el traje)', word: 'anziehen', options: ['zieht', 'ziehe', 'ziehen', 'zog'], answer: 'zieht', vocabulary: { term: 'anziehen', translation: 'ponerse (ropa)' }, hint: 'Con er, anziehen se conjuga zieht, y an va al final.' },
  ],
};

export const grammarLessonGenitive = {
  id: 'grammar-genitive',
  title: 'El genitivo',
  activityId: 'grammar-genitive',
  durationMinutes: 8,
  questions: [
    { id: 'genitive-q1', prompt: 'Completa: Das ist das Auto ___ Vaters. (del padre)', word: 'Vater', options: ['meines', 'meiner', 'mein', 'meinen'], answer: 'meines', vocabulary: { term: 'der Vater', translation: 'el padre' }, hint: 'El genitivo masculino usa -es.' },
    { id: 'genitive-q2', prompt: 'Completa: Das ist der Wagen ___ Mutter. (de la madre)', word: 'Mutter', options: ['meiner', 'meines', 'mein', 'meinen'], answer: 'meiner', vocabulary: { term: 'die Mutter', translation: 'la madre' }, hint: 'El genitivo femenino usa -er.' },
    { id: 'genitive-q3', prompt: '¿Qué significa "Das ist das Haus meiner Eltern"?', word: 'meiner Eltern', options: ['Esta es la casa de mis padres', 'Esta es mi casa', 'Ellos son mis padres', 'Mi casa es grande'], answer: 'Esta es la casa de mis padres', vocabulary: { term: 'meiner Eltern', translation: 'de mis padres' }, hint: 'El genitivo expresa posesión.' },
  ],
};

export const grammarLessonImperative = {
  id: 'grammar-imperative',
  title: 'El imperativo',
  activityId: 'grammar-imperative',
  durationMinutes: 8,
  questions: [
    { id: 'imperative-q1', prompt: '¿Cómo se dice "¡Ven aquí!" en alemán (tú)?', word: 'kommen', options: ['Komm her!', 'Komme her!', 'Kommt her!', 'Kommen her!'], answer: 'Komm her!', vocabulary: { term: 'kommen', translation: 'venir' }, hint: 'El imperativo de du usa la raíz del verbo sin -st.' },
    { id: 'imperative-q2', prompt: '¿Cómo se dice "¡Leed el libro!" (vosotros)?', word: 'lesen', options: ['Lest das Buch!', 'Lies das Buch!', 'Lesen das Buch!', 'Lese das Buch!'], answer: 'Lest das Buch!', vocabulary: { term: 'lesen', translation: 'leer' }, hint: 'El imperativo de ihr usa la conjugación normal de ihr.' },
    { id: 'imperative-q3', prompt: '¿Cómo se dice "¡Por favor, abra la puerta!" (usted)?', word: 'öffnen', options: ['Öffnen Sie bitte die Tür!', 'Öffne bitte die Tür!', 'Öffnet bitte die Tür!', 'Öffnen bitte die Tür!'], answer: 'Öffnen Sie bitte die Tür!', vocabulary: { term: 'öffnen', translation: 'abrir' }, hint: 'El imperativo formal usa el infinitivo + Sie.' },
  ],
};

export const grammarLessonFuture = {
  id: 'grammar-future',
  title: 'Futuro con werden',
  activityId: 'grammar-future',
  durationMinutes: 8,
  questions: [
    { id: 'future-q1', prompt: 'Completa: Ich ___ morgen nach Berlin fahren.', word: 'werden', options: ['werde', 'wirst', 'wird', 'werden'], answer: 'werde', vocabulary: { term: 'werden', translation: 'llegar a ser / auxiliar de futuro' }, hint: 'Con ich, werden se conjuga werde.' },
    { id: 'future-q2', prompt: '¿Dónde va el infinitivo en "Wir werden Deutsch ___"?', word: 'lernen', options: ['lernen', 'lerne', 'lernst', 'lernt'], answer: 'lernen', vocabulary: { term: 'lernen', translation: 'aprender' }, hint: 'En futuro, el infinitivo va al final de la oración.' },
    { id: 'future-q3', prompt: '¿Qué significa "Du wirst es schaffen"?', word: 'schaffen', options: ['Lo conseguirás', 'Lo has conseguido', 'Lo conseguiste', 'Quieres hacerlo'], answer: 'Lo conseguirás', vocabulary: { term: 'schaffen', translation: 'conseguir / lograr' }, hint: 'Werden + infinitivo expresa futuro.' },
  ],
};

export const grammarLessonSubjunctive = {
  id: 'grammar-subjunctive',
  title: 'Konjunktiv II (condicional)',
  activityId: 'grammar-subjunctive',
  durationMinutes: 8,
  questions: [
    { id: 'subjunctive-q1', prompt: 'Completa: Ich ___ gern nach Deutschland reisen. (me gustaría viajar)', word: 'würde', options: ['würde', 'wollte', 'könnte', 'sollte'], answer: 'würde', vocabulary: { term: 'würde', translation: 'gustaría (forma condicional)' }, hint: 'Würde + infinitivo expresa deseo o condición.' },
    { id: 'subjunctive-q2', prompt: '¿Qué significa "Ich könnte das machen"?', word: 'könnte', options: ['Podría hacerlo', 'Puedo hacerlo', 'Podré hacerlo', 'Pude hacerlo'], answer: 'Podría hacerlo', vocabulary: { term: 'können', translation: 'poder' }, hint: 'Könnte es la forma de subjuntivo de können.' },
    { id: 'subjunctive-q3', prompt: 'Completa: Wenn ich Zeit ___, käme ich mit. (si tuviera tiempo)', word: 'hätte', options: ['hätte', 'habe', 'hatte', 'hättest'], answer: 'hätte', vocabulary: { term: 'haben', translation: 'tener' }, hint: 'En condiciones hipotéticas se usa Konjunktiv II.' },
  ],
};

// Additional A2 Grammar Lessons
export const grammarLessonPrepositions = {
  id: 'grammar-prepositions',
  title: 'Preposiciones con casos',
  activityId: 'grammar-prepositions',
  durationMinutes: 8,
  questions: [
    { id: 'prep-grammar-q1', prompt: 'Completa: Ich gehe ___ Kino.', word: 'ins', options: ['ins', 'in das', 'in dem', 'im'], answer: 'ins', vocabulary: { term: 'ins Kino', translation: 'al cine' }, hint: 'In + das = ins (acusativo).' },
    { id: 'prep-grammar-q2', prompt: 'Completa: Ich bin ___ Schule.', word: 'in der', options: ['in der', 'in das', 'in dem', 'ins'], answer: 'in der', vocabulary: { term: 'in der Schule', translation: 'en la escuela' }, hint: 'In + die = in der (dativo).' },
    { id: 'prep-grammar-q3', prompt: '¿Qué preposición usa acusativo con movimiento?', word: 'movimiento', options: ['in', 'bei', 'mit', 'von'], answer: 'in', vocabulary: { term: 'in', translation: 'en' }, hint: 'Wechselpräpositionen cambian el caso.' },
  ],
};

export const grammarLessonReflexive = {
  id: 'grammar-reflexive',
  title: 'Verbos reflexivos',
  activityId: 'grammar-reflexive',
  durationMinutes: 8,
  questions: [
    { id: 'reflexive-q1', prompt: 'Completa: Ich ___ mich.', word: 'wasche', options: ['wasche', 'waschst', 'wäscht', 'waschen'], answer: 'wasche', vocabulary: { term: 'sich waschen', translation: 'lavarse' }, hint: 'Con ich, el verbo no cambia y mich es acusativo.' },
    { id: 'reflexive-q2', prompt: 'Completa: Du ___ dich.', word: 'waschst', options: ['waschst', 'wasche', 'wäscht', 'waschen'], answer: 'waschst', vocabulary: { term: 'sich waschen', translation: 'lavarse' }, hint: 'Con du, añade -st y dich es acusativo.' },
    { id: 'reflexive-q3', prompt: '¿Qué significa "sich freuen"?', word: 'sich freuen', options: ['Alegrarse', 'Triste', 'Enojado', 'Cansado'], answer: 'Alegrarse', vocabulary: { term: 'sich freuen', translation: 'alegrarse' }, hint: 'Sentimiento positivo reflexivo.' },
  ],
};

export const grammarLessonRelative = {
  id: 'grammar-relative',
  title: 'Pronombres relativos',
  activityId: 'grammar-relative',
  durationMinutes: 8,
  questions: [
    { id: 'relative-q1', prompt: 'Completa: Das ist das Buch, ___ ich lese.', word: 'das', options: ['das', 'der', 'die', 'den'], answer: 'das', vocabulary: { term: 'das Buch', translation: 'el libro' }, hint: 'Das es neutro, relativo neutro.' },
    { id: 'relative-q2', prompt: 'Completa: Der Mann, ___ ich kenne, ist nett.', word: 'den', options: ['den', 'der', 'das', 'die'], answer: 'den', vocabulary: { term: 'der Mann', translation: 'el hombre' }, hint: 'Der es masculino, relativo acusativo.' },
    { id: 'relative-q3', prompt: '¿Qué pronombre relativo usa "die"?', word: 'die', options: ['Femenino plural', 'Masculino', 'Neutro', 'Solo femenino'], answer: 'Femenino plural', vocabulary: { term: 'die', translation: 'la/los (plural)' }, hint: 'Die se usa para femenino y plural.' },
  ],
};

// New lesson types with different question formats
export const dictationLessonBasics = {
  id: 'dictation-basics',
  title: 'Dictado: Frases básicas',
  activityId: 'dictation-basics',
  durationMinutes: 6,
  questions: [
    {
      id: 'dictation-q1',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Guten Morgen',
      audioWord: 'Guten Morgen',
      audioPhrase: 'Guten Morgen. Wie geht es dir?',
      answer: 'Guten Morgen',
      vocabulary: { term: 'Guten Morgen', translation: 'buenos días' },
      hint: 'Es el saludo de la mañana.',
    },
    {
      id: 'dictation-q2',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich heiße',
      audioWord: 'heiße',
      audioPhrase: 'Ich heiße Anna.',
      answer: 'Ich heiße',
      vocabulary: { term: 'heißen', translation: 'llamarse' },
      hint: 'El verbo para decir tu nombre.',
    },
    {
      id: 'dictation-q3',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Auf Wiedersehen',
      audioWord: 'Auf Wiedersehen',
      audioPhrase: 'Auf Wiedersehen! Bis bald.',
      answer: 'Auf Wiedersehen',
      vocabulary: { term: 'Auf Wiedersehen', translation: 'adiós' },
      hint: 'Es una despedida formal.',
    },
  ],
};

export const dictationLessonA2 = {
  id: 'dictation-a2',
  title: 'Dictado: Rutina diaria',
  activityId: 'dictation-a2',
  durationMinutes: 7,
  questions: [
    {
      id: 'dictation-a2-q1',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich stehe um 7 Uhr auf',
      audioWord: 'aufstehen',
      audioPhrase: 'Ich stehe jeden Tag um 7 Uhr auf.',
      answer: 'Ich stehe um 7 Uhr auf',
      vocabulary: { term: 'aufstehen', translation: 'levantarse' },
      hint: 'Habla de despertarse a una hora específica.',
    },
    {
      id: 'dictation-a2-q2',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich trinke Kaffee',
      audioWord: 'trinken',
      audioPhrase: 'Zum Frühstück trinke ich Kaffee.',
      answer: 'Ich trinke Kaffee',
      vocabulary: { term: 'trinken', translation: 'beber' },
      hint: 'Es sobre tomar café.',
    },
    {
      id: 'dictation-a2-q3',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich gehe zur Arbeit',
      audioWord: 'gehen',
      audioPhrase: 'Um 8 Uhr gehe ich zur Arbeit.',
      answer: 'Ich gehe zur Arbeit',
      vocabulary: { term: 'zur Arbeit gehen', translation: 'ir al trabajo' },
      hint: 'Habla de ir a trabajar.',
    },
  ],
};

export const dictationLessonB1 = {
  id: 'dictation-b1',
  title: 'Dictado: Experiencias pasadas',
  activityId: 'dictation-b1',
  durationMinutes: 8,
  questions: [
    {
      id: 'dictation-b1-q1',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich habe gestern einen Film gesehen',
      audioWord: 'gesehen',
      audioPhrase: 'Ich habe gestern Abend einen interessanten Film gesehen.',
      answer: 'Ich habe gestern einen Film gesehen',
      vocabulary: { term: 'sehen', translation: 'ver' },
      hint: 'Usa el Perfekt para hablar del pasado.',
    },
    {
      id: 'dictation-b1-q2',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Wir sind nach Berlin gefahren',
      audioWord: 'fahren',
      audioPhrase: 'Letztes Wochenende sind wir nach Berlin gefahren.',
      answer: 'Wir sind nach Berlin gefahren',
      vocabulary: { term: 'fahren', translation: 'viajar/ir' },
      hint: 'Verbos de movimiento usan sein en Perfekt.',
    },
    {
      id: 'dictation-b1-q3',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Sie hat Deutsch gelernt',
      audioWord: 'lernen',
      audioPhrase: 'Sie hat drei Jahre lang Deutsch gelernt.',
      answer: 'Sie hat Deutsch gelernt',
      vocabulary: { term: 'lernen', translation: 'aprender' },
      hint: 'Habla de estudiar un idioma.',
    },
  ],
};

export const dictationLessonB2 = {
  id: 'dictation-b2',
  title: 'Dictado: Opiniones complejas',
  activityId: 'dictation-b2',
  durationMinutes: 10,
  questions: [
    {
      id: 'dictation-b2-q1',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Ich würde gern mehr Zeit haben',
      audioWord: 'würde',
      audioPhrase: 'Ich würde gern mehr Zeit für meine Hobbys haben.',
      answer: 'Ich würde gern mehr Zeit haben',
      vocabulary: { term: 'würde gern', translation: 'me gustaría' },
      hint: 'Usa Konjunktiv II para expresar deseo.',
    },
    {
      id: 'dictation-b2-q2',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Es wäre besser wenn',
      audioWord: 'wäre',
      audioPhrase: 'Es wäre besser, wenn wir früher aufstehen würden.',
      answer: 'Es wäre besser wenn',
      vocabulary: { term: 'besser', translation: 'mejor' },
      hint: 'Estructura condicional con würde.',
    },
    {
      id: 'dictation-b2-q3',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase',
      word: 'Hätte ich mehr Geld',
      audioWord: 'hätte',
      audioPhrase: 'Hätte ich mehr Geld, würde ich reisen.',
      answer: 'Hätte ich mehr Geld',
      vocabulary: { term: 'das Geld', translation: 'el dinero' },
      hint: 'Condición hipotética al inicio de la frase.',
    },
  ],
};

export const fillBlanksLesson = {
  id: 'fill-blanks-basics',
  title: 'Completa los huecos',
  activityId: 'fill-blanks-basics',
  durationMinutes: 6,
  questions: [
    {
      id: 'fill-q1',
      type: 'fill-blanks',
      prompt: 'Completa la frase con el artículo correcto',
      word: '___ Buch ist interessant.',
      sentence: '___ Buch ist interessant.',
      blankIndex: 0,
      answer: 'Das',
      vocabulary: { term: 'das Buch', translation: 'el libro' },
      hint: 'Buch es un sustantivo neutro.',
    },
    {
      id: 'fill-q2',
      type: 'fill-blanks',
      prompt: 'Completa la frase con el verbo correcto',
      word: 'Ich ___ Deutsch.',
      sentence: 'Ich ___ Deutsch.',
      blankIndex: 0,
      answer: 'spreche',
      vocabulary: { term: 'sprechen', translation: 'hablar' },
      hint: 'Con ich, sprechen se conjuga spreche.',
    },
    {
      id: 'fill-q3',
      type: 'fill-blanks',
      prompt: 'Completa la frase con la preposición correcta',
      word: 'Ich gehe ___ die Schule.',
      sentence: 'Ich gehe ___ die Schule.',
      blankIndex: 0,
      answer: 'zur',
      vocabulary: { term: 'zur Schule', translation: 'a la escuela' },
      hint: 'Zu + der = zur.',
    },
  ],
};

export const fillBlanksLessonA2 = {
  id: 'fill-blanks-a2',
  title: 'Completa: Casos y preposiciones',
  activityId: 'fill-blanks-a2',
  durationMinutes: 7,
  questions: [
    {
      id: 'fill-a2-q1',
      type: 'fill-blanks',
      prompt: 'Completa con el artículo correcto en acusativo',
      word: 'Ich sehe ___ Mann.',
      sentence: 'Ich sehe ___ Mann.',
      blankIndex: 0,
      answer: 'den',
      vocabulary: { term: 'den Mann', translation: 'al hombre' },
      hint: 'El acusativo masculino de der es den.',
    },
    {
      id: 'fill-a2-q2',
      type: 'fill-blanks',
      prompt: 'Completa con el verbo modal correcto',
      word: 'Wir ___ heute kommen.',
      sentence: 'Wir ___ heute kommen.',
      blankIndex: 0,
      answer: 'können',
      vocabulary: { term: 'können', translation: 'poder' },
      hint: 'Expresa posibilidad.',
    },
    {
      id: 'fill-a2-q3',
      type: 'fill-blanks',
      prompt: 'Completa con la negación correcta',
      word: 'Ich habe ___ Zeit.',
      sentence: 'Ich habe ___ Zeit.',
      blankIndex: 0,
      answer: 'keine',
      vocabulary: { term: 'keine Zeit', translation: 'ningún tiempo' },
      hint: 'Zeit es femenino, usa keine.',
    },
  ],
};

export const fillBlanksLessonB1 = {
  id: 'fill-blanks-b1',
  title: 'Completa: Perfekt y Futuro',
  activityId: 'fill-blanks-b1',
  durationMinutes: 8,
  questions: [
    {
      id: 'fill-b1-q1',
      type: 'fill-blanks',
      prompt: 'Completa con el auxiliar correcto',
      word: 'Ich ___ gestern gegessen.',
      sentence: 'Ich ___ gestern gegessen.',
      blankIndex: 0,
      answer: 'habe',
      vocabulary: { term: 'essen', translation: 'comer' },
      hint: 'Essen usa haben en Perfekt.',
    },
    {
      id: 'fill-b1-q2',
      type: 'fill-blanks',
      prompt: 'Completa con el auxiliar correcto',
      word: 'Wir ___ nach Hause gegangen.',
      sentence: 'Wir ___ nach Hause gegangen.',
      blankIndex: 0,
      answer: 'sind',
      vocabulary: { term: 'gehen', translation: 'ir' },
      hint: 'Gehen usa sein en Perfekt.',
    },
    {
      id: 'fill-b1-q3',
      type: 'fill-blanks',
      prompt: 'Completa con werden',
      word: 'Ich ___ morgen nach Berlin fahren.',
      sentence: 'Ich ___ morgen nach Berlin fahren.',
      blankIndex: 0,
      answer: 'werde',
      vocabulary: { term: 'werden', translation: 'llegar a ser' },
      hint: 'Werden se conjuga con ich como werde.',
    },
  ],
};

export const fillBlanksLessonB2 = {
  id: 'fill-blanks-b2',
  title: 'Completa: Konjunktiv II',
  activityId: 'fill-blanks-b2',
  durationMinutes: 8,
  questions: [
    {
      id: 'fill-b2-q1',
      type: 'fill-blanks',
      prompt: 'Completa con la forma condicional',
      word: 'Ich ___ gern mehr Zeit haben.',
      sentence: 'Ich ___ gern mehr Zeit haben.',
      blankIndex: 0,
      answer: 'würde',
      vocabulary: { term: 'würde', translation: 'gustaría' },
      hint: 'Usa würde + infinitivo.',
    },
    {
      id: 'fill-b2-q2',
      type: 'fill-blanks',
      prompt: 'Completa con Konjunktiv II',
      word: 'Wenn ich Geld ___, würde ich reisen.',
      sentence: 'Wenn ich Geld ___, würde ich reisen.',
      blankIndex: 0,
      answer: 'hätte',
      vocabulary: { term: 'haben', translation: 'tener' },
      hint: 'Hätte es Konjunktiv II de haben.',
    },
    {
      id: 'fill-b2-q3',
      type: 'fill-blanks',
      prompt: 'Completa con podría',
      word: 'Das ___ ich machen.',
      sentence: 'Das ___ ich machen.',
      blankIndex: 0,
      answer: 'könnte',
      vocabulary: { term: 'können', translation: 'poder' },
      hint: 'Könnte es forma condicional de können.',
    },
  ],
};

export const wordOrderLesson = {
  id: 'word-order-basics',
  title: 'Orden de palabras',
  activityId: 'word-order-basics',
  durationMinutes: 6,
  questions: [
    {
      id: 'wordorder-q1',
      type: 'word-order',
      prompt: 'Ordena las palabras para formar la frase',
      word: 'Ich gehe heute ins Kino',
      words: ['Ich', 'gehe', 'heute', 'ins', 'Kino'],
      answer: 'Ich gehe heute ins Kino',
      vocabulary: { term: 'ins Kino gehen', translation: 'ir al cine' },
      hint: 'El verbo va en segunda posición.',
    },
    {
      id: 'wordorder-q2',
      type: 'word-order',
      prompt: 'Ordena las palabras para formar la frase',
      word: 'Wir trinken Kaffee',
      words: ['Wir', 'trinken', 'Kaffee'],
      answer: 'Wir trinken Kaffee',
      vocabulary: { term: 'Kaffee trinken', translation: 'beber café' },
      hint: 'Sujeto + verbo + objeto.',
    },
    {
      id: 'wordorder-q3',
      type: 'word-order',
      prompt: 'Ordena las palabras para formar la frase',
      word: 'Er liest ein Buch',
      words: ['Er', 'liest', 'ein', 'Buch'],
      answer: 'Er liest ein Buch',
      vocabulary: { term: 'ein Buch lesen', translation: 'leer un libro' },
      hint: 'El sujeto va primero.',
    },
  ],
};

export const wordOrderLessonA2 = {
  id: 'word-order-a2',
  title: 'Orden: Tiempo y lugar',
  activityId: 'word-order-a2',
  durationMinutes: 7,
  questions: [
    {
      id: 'wordorder-a2-q1',
      type: 'word-order',
      prompt: 'Ordena las palabras (tiempo, modo, lugar)',
      word: 'Ich fahre morgen mit dem Zug nach Berlin',
      words: ['Ich', 'fahre', 'morgen', 'mit', 'dem', 'Zug', 'nach', 'Berlin'],
      answer: 'Ich fahre morgen mit dem Zug nach Berlin',
      vocabulary: { term: 'mit dem Zug fahren', translation: 'ir en tren' },
      hint: 'Orden: tiempo - modo - lugar.',
    },
    {
      id: 'wordorder-a2-q2',
      type: 'word-order',
      prompt: 'Ordena las palabras con verbo modal',
      word: 'Wir müssen heute lernen',
      words: ['Wir', 'müssen', 'heute', 'lernen'],
      answer: 'Wir müssen heute lernen',
      vocabulary: { term: 'müssen', translation: 'tener que' },
      hint: 'El verbo modal va en segunda posición.',
    },
    {
      id: 'wordorder-a2-q3',
      type: 'word-order',
      prompt: 'Ordena las palabras con verbo separable',
      word: 'Er steht um 7 Uhr auf',
      words: ['Er', 'steht', 'um', '7', 'Uhr', 'auf'],
      answer: 'Er steht um 7 Uhr auf',
      vocabulary: { term: 'aufstehen', translation: 'levantarse' },
      hint: 'El prefijo va al final.',
    },
  ],
};

export const wordOrderLessonB1 = {
  id: 'word-order-b1',
  title: 'Orden: Perfekt y subordinadas',
  activityId: 'word-order-b1',
  durationMinutes: 8,
  questions: [
    {
      id: 'wordorder-b1-q1',
      type: 'word-order',
      prompt: 'Ordena las palabras en Perfekt',
      word: 'Ich habe gestern einen Film gesehen',
      words: ['Ich', 'habe', 'gestern', 'einen', 'Film', 'gesehen'],
      answer: 'Ich habe gestern einen Film gesehen',
      vocabulary: { term: 'gesehen', translation: 'visto' },
      hint: 'El participio va al final.',
    },
    {
      id: 'wordorder-b1-q2',
      type: 'word-order',
      prompt: 'Ordena las palabras con weil',
      word: 'Ich komme nicht weil ich krank bin',
      words: ['Ich', 'komme', 'nicht', 'weil', 'ich', 'krank', 'bin'],
      answer: 'Ich komme nicht weil ich krank bin',
      vocabulary: { term: 'weil', translation: 'porque' },
      hint: 'Con weil, el verbo va al final.',
    },
    {
      id: 'wordorder-b1-q3',
      type: 'word-order',
      prompt: 'Ordena las palabras con dass',
      word: 'Ich denke dass es regnet',
      words: ['Ich', 'denke', 'dass', 'es', 'regnet'],
      answer: 'Ich denke dass es regnet',
      vocabulary: { term: 'dass', translation: 'que' },
      hint: 'Con dass, el verbo va al final.',
    },
  ],
};

export const wordOrderLessonB2 = {
  id: 'word-order-b2',
  title: 'Orden: Condicionales complejas',
  activityId: 'word-order-b2',
  durationMinutes: 8,
  questions: [
    {
      id: 'wordorder-b2-q1',
      type: 'word-order',
      prompt: 'Ordena las palabras en condicional',
      word: 'Wenn ich Zeit hätte würde ich kommen',
      words: ['Wenn', 'ich', 'Zeit', 'hätte', 'würde', 'ich', 'kommen'],
      answer: 'Wenn ich Zeit hätte würde ich kommen',
      vocabulary: { term: 'hätte', translation: 'tuviera' },
      hint: 'Usa Konjunktiv II en la condición.',
    },
    {
      id: 'wordorder-b2-q2',
      type: 'word-order',
      prompt: 'Ordena las palabras con futuro',
      word: 'Ich werde nächstes Jahr nach Deutschland reisen',
      words: ['Ich', 'werde', 'nächstes', 'Jahr', 'nach', 'Deutschland', 'reisen'],
      answer: 'Ich werde nächstes Jahr nach Deutschland reisen',
      vocabulary: { term: 'werden', translation: 'auxiliar futuro' },
      hint: 'Werden + infinitivo al final.',
    },
    {
      id: 'wordorder-b2-q3',
      type: 'word-order',
      prompt: 'Ordena las palabras con dos oraciones',
      word: 'Er sagt dass er morgen kommt',
      words: ['Er', 'sagt', 'dass', 'er', 'morgen', 'kommt'],
      answer: 'Er sagt dass er morgen kommt',
      vocabulary: { term: 'sagen', translation: 'decir' },
      hint: 'Discurso indirecto con dass.',
    },
  ],
};

export const writeResponseLesson = {
  id: 'write-response-basics',
  title: 'Escribe tu respuesta',
  activityId: 'write-response-basics',
  durationMinutes: 8,
  questions: [
    {
      id: 'write-q1',
      type: 'write-response',
      prompt: '¿Cómo te llamas? Escribe tu respuesta en alemán.',
      word: 'Wie heißt du?',
      placeholder: 'Ich heiße...',
      answer: 'Ich heiße',
      vocabulary: { term: 'heißen', translation: 'llamarse' },
      hint: 'Usa "Ich heiße" seguido de tu nombre.',
      feedback: 'Puedes responder: Ich heiße [tu nombre] o Mein Name ist [tu nombre].',
      explanation: '«Ich heiße» significa «me llamo»; heißen es el verbo alemán para decir tu nombre.',
    },
    {
      id: 'write-q2',
      type: 'write-response',
      prompt: '¿De dónde eres? Escribe tu respuesta en alemán.',
      word: 'Woher kommst du?',
      placeholder: 'Ich komme aus...',
      answer: 'Ich komme aus',
      vocabulary: { term: 'kommen aus', translation: 'ser de (origen)' },
      hint: 'Usa "Ich komme aus" seguido de tu país o ciudad.',
      feedback: 'La estructura es: Ich komme aus [país/ciudad].',
      explanation: '«Ich komme aus» significa «soy de» y se usa para presentar el país o la ciudad de origen.',
    },
    {
      id: 'write-q3',
      type: 'write-response',
      prompt: '¿Cómo estás? Escribe tu respuesta en alemán.',
      word: 'Wie geht es dir?',
      placeholder: 'Mir geht es...',
      answer: 'Mir geht es',
      vocabulary: { term: 'Wie geht es dir?', translation: '¿Cómo estás?' },
      hint: 'Puedes decir "Mir geht es gut" (estoy bien) o "Mir geht es nicht so gut" (no estoy muy bien).',
      feedback: 'Respuestas comunes: Mir geht es gut / Mir geht es nicht so gut / Es geht mir gut.',
      explanation: '«Mir geht es» inicia una respuesta sobre cómo te sientes; después puedes añadir, por ejemplo, «gut» (bien).',
    },
  ],
};

export const writeResponseLessonA2 = {
  id: 'write-response-a2',
  title: 'Escribe: Rutina y preferencias',
  activityId: 'write-response-a2',
  durationMinutes: 8,
  questions: [
    {
      id: 'write-a2-q1',
      type: 'write-response',
      prompt: 'Describe tu rutina matutina en alemán.',
      word: 'Mi rutina matutina',
      placeholder: 'Am Morgen stehe ich...',
      answer: 'Am Morgen',
      vocabulary: { term: 'die Routine', translation: 'la rutina' },
      hint: 'Usa verbos como aufstehen, frühstücken, gehen.',
      feedback: 'Ejemplo: Am Morgen stehe ich um 7 Uhr auf, frühstücke und gehe zur Arbeit.',
      explanation: '«Am Morgen» significa «por la mañana» y sitúa en ese momento las acciones de tu rutina.',
    },
    {
      id: 'write-a2-q2',
      type: 'write-response',
      prompt: '¿Qué te gusta hacer en tu tiempo libre?',
      word: 'Tiempo libre',
      placeholder: 'In meiner Freizeit...',
      answer: 'In meiner Freizeit',
      vocabulary: { term: 'die Freizeit', translation: 'el tiempo libre' },
      hint: 'Usa "Ich spiele gern" o "Ich lese gern".',
      feedback: 'Ejemplo: In meiner Freizeit lese ich gern und treibe Sport.',
      explanation: '«In meiner Freizeit» significa «en mi tiempo libre» e introduce las actividades que disfrutas fuera de tus obligaciones.',
    },
    {
      id: 'write-a2-q3',
      type: 'write-response',
      prompt: 'Escribe sobre tu familia.',
      word: 'Mi familia',
      placeholder: 'Meine Familie besteht aus...',
      answer: 'Meine Familie',
      vocabulary: { term: 'die Familie', translation: 'la familia' },
      hint: 'Usa vocabulario como Vater, Mutter, Bruder, Schwester.',
      feedback: 'Ejemplo: Meine Familie besteht aus meinem Vater, meiner Mutter und meinem Bruder.',
      explanation: '«Meine Familie» significa «mi familia» y presenta a las personas sobre las que pide escribir la consigna.',
    },
  ],
};

export const writeResponseLessonB1 = {
  id: 'write-response-b1',
  title: 'Escribe: Experiencias pasadas',
  activityId: 'write-response-b1',
  durationMinutes: 10,
  questions: [
    {
      id: 'write-b1-q1',
      type: 'write-response',
      prompt: 'Escribe sobre tu último viaje usando el Perfekt.',
      word: 'Mi último viaje',
      placeholder: 'Letztes Jahr bin ich...',
      answer: 'Letztes Jahr',
      vocabulary: { term: 'die Reise', translation: 'el viaje' },
      hint: 'Usa Perfekt: bin gefahren, habe gesehen, habe gemacht.',
      feedback: 'Ejemplo: Letztes Jahr bin ich nach Spanien gefahren. Ich habe dort viel gesehen.',
      explanation: '«Letztes Jahr» significa «el año pasado» y sitúa el viaje en el pasado, como requiere la consigna.',
    },
    {
      id: 'write-b1-q2',
      type: 'write-response',
      prompt: 'Describe tu trabajo o estudios.',
      word: 'Mi trabajo',
      placeholder: 'Ich arbeite als...',
      answer: 'Ich arbeite',
      vocabulary: { term: 'der Beruf', translation: 'el trabajo' },
      hint: 'Usa vocabulario profesional: Büro, Kollegen, Kunden.',
      feedback: 'Ejemplo: Ich arbeite als Bürokraft in einem großen Unternehmen.',
      explanation: '«Ich arbeite» significa «trabajo» y permite comenzar a describir tu empleo o actividad profesional.',
    },
    {
      id: 'write-b1-q3',
      type: 'write-response',
      prompt: 'Escribe sobre tus planes para el futuro.',
      word: 'Mis planes',
      placeholder: 'Im Jahr 2025 werde ich...',
      answer: 'Im Jahr',
      vocabulary: { term: 'die Pläne', translation: 'los planes' },
      hint: 'Usa futuro con werden: werde ich, werden wir.',
      feedback: 'Ejemplo: Im Jahr 2025 werde ich Deutsch lernen und nach Deutschland reisen.',
      explanation: '«Im Jahr» significa «en el año» y sirve para situar en el tiempo los planes que harás en el futuro.',
    },
  ],
};

export const writeResponseLessonB2 = {
  id: 'write-response-b2',
  title: 'Escribe: Opiniones y argumentos',
  activityId: 'write-response-b2',
  durationMinutes: 12,
  questions: [
    {
      id: 'write-b2-q1',
      type: 'write-response',
      prompt: '¿Qué opinas sobre el aprendizaje de idiomas?',
      word: 'Aprender idiomas',
      placeholder: 'Ich denke, dass Sprachenlernen...',
      answer: 'Ich denke',
      vocabulary: { term: 'die Meinung', translation: 'la opinión' },
      hint: 'Usa conectores: meiner Meinung nach, außerdem, jedoch.',
      feedback: 'Ejemplo: Ich denke, dass Sprachenlernen wichtig ist, weil es neue Möglichkeiten eröffnet.',
      explanation: '«Ich denke» significa «pienso» y es una forma natural de introducir tu opinión sobre el aprendizaje de idiomas.',
    },
    {
      id: 'write-b2-q2',
      type: 'write-response',
      prompt: 'Escribe sobre un tema social importante.',
      word: 'Tema social',
      placeholder: 'Ein wichtiges Thema ist...',
      answer: 'Ein wichtiges Thema',
      vocabulary: { term: 'das Thema', translation: 'el tema' },
      hint: 'Usa vocabulario abstracto: die Gesellschaft, die Umwelt, die Bildung.',
      feedback: 'Ejemplo: Ein wichtiges Thema ist der Umweltschutz, weil wir die Natur schützen müssen.',
      explanation: '«Ein wichtiges Thema» significa «un tema importante» y presenta la cuestión social que desarrollarás.',
    },
    {
      id: 'write-b2-q3',
      type: 'write-response',
      prompt: 'Describe una experiencia que te cambió la vida.',
      word: 'Experiencia',
      placeholder: 'Eine Erfahrung, die mein Leben verändert hat...',
      answer: 'Eine Erfahrung',
      vocabulary: { term: 'die Erfahrung', translation: 'la experiencia' },
      hint: 'Usa narración en pasado con reflexiones.',
      feedback: 'Ejemplo: Eine Erfahrung, die mein Leben verändert hat, war mein Auslandsjahr.',
      explanation: '«Eine Erfahrung» significa «una experiencia» y da inicio al relato personal que solicita la consigna.',
    },
  ],
};

export const listeningLesson = {
  id: 'listening-basics',
  title: 'Comprensión auditiva',
  activityId: 'listening-basics',
  durationMinutes: 8,
  questions: [
    {
      id: 'listening-q1',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué dice la persona?',
      audioWord: 'heißen',
      audioPhrase: 'Ich heiße Thomas. Und du?',
      scenario: 'Alguien se presenta en una conversación informal.',
      questions: [
        {
          text: '¿Cómo se llama la persona?',
          options: ['Thomas', 'Peter', 'Hans', 'Klaus'],
          correctAnswer: 'Thomas',
        },
      ],
      vocabulary: { term: 'heißen', translation: 'llamarse' },
      hint: 'Escucha el nombre al principio de la frase.',
    },
    {
      id: 'listening-q2',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué pregunta?',
      audioWord: 'kommen',
      audioPhrase: 'Ich komme aus Spanien. Woher kommst du?',
      scenario: 'Dos personas hablan sobre su origen.',
      questions: [
        {
          text: '¿De dónde es la primera persona?',
          options: ['De España', 'De Alemania', 'De Francia', 'De Italia'],
          correctAnswer: 'De España',
        },
      ],
      vocabulary: { term: 'kommen aus', translation: 'ser de' },
      hint: 'La persona dice "Ich komme aus Spanien".',
    },
    {
      id: 'listening-q3',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué pide?',
      audioWord: 'Haben Sie',
      audioPhrase: 'Haben Sie einen Tisch für zwei Personen?',
      scenario: 'Alguien entra en un restaurante.',
      questions: [
        {
          text: '¿Qué pide la persona?',
          options: ['Una mesa para dos', 'Una cuenta', 'El menú', 'Agua'],
          correctAnswer: 'Una mesa para dos',
        },
      ],
      vocabulary: { term: 'der Tisch', translation: 'la mesa' },
      hint: 'Escucha "einen Tisch für zwei Personen".',
    },
  ],
};

export const listeningLessonA2 = {
  id: 'listening-a2',
  title: 'Escucha: Conversaciones cotidianas',
  activityId: 'listening-a2',
  durationMinutes: 10,
  questions: [
    {
      id: 'listening-a2-q1',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué hace la persona?',
      audioWord: 'arbeiten',
      audioPhrase: 'Ich arbeite von Montag bis Freitag in einem Büro.',
      scenario: 'Alguien describe su trabajo.',
      questions: [
        {
          text: '¿Cuándo trabaja la persona?',
          options: ['De lunes a viernes', 'Solo los fines de semana', 'Solo los martes', 'Nunca'],
          correctAnswer: 'De lunes a viernes',
        },
      ],
      vocabulary: { term: 'arbeiten', translation: 'trabajar' },
      hint: 'Escucha "von Montag bis Freitag".',
    },
    {
      id: 'listening-a2-q2',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué compra?',
      audioWord: 'kaufen',
      audioPhrase: 'Ich möchte ein Brötchen und eine Tasse Kaffee kaufen.',
      scenario: 'Alguien en una panadería.',
      questions: [
        {
          text: '¿Qué quiere comprar la persona?',
          options: ['Un panecillo y café', 'Solo agua', 'Un pastel', 'Una pizza'],
          correctAnswer: 'Un panecillo y café',
        },
      ],
      vocabulary: { term: 'das Brötchen', translation: 'el panecillo' },
      hint: 'Escucha "Brötchen und Kaffee".',
    },
    {
      id: 'listening-a2-q3',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿A dónde va?',
      audioWord: 'fahren',
      audioPhrase: 'Wir fahren heute nachmittag zum See.',
      scenario: 'Dos personas planean una salida.',
      questions: [
        {
          text: '¿Adónde van?',
          options: ['Al lago', 'A la montaña', 'A la playa', 'A la ciudad'],
          correctAnswer: 'Al lago',
        },
      ],
      vocabulary: { term: 'der See', translation: 'el lago' },
      hint: 'Escucha "zum See".',
    },
  ],
};

export const listeningLessonB1 = {
  id: 'listening-b1',
  title: 'Escucha: Narraciones y descripciones',
  activityId: 'listening-b1',
  durationMinutes: 12,
  questions: [
    {
      id: 'listening-b1-q1',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué pasó?',
      audioWord: 'passieren',
      audioPhrase: 'Gestern ist mir etwas Unangenehmes passiert. Ich habe meine Tasche verloren.',
      scenario: 'Alguien cuenta un incidente.',
      questions: [
        {
          text: '¿Qué perdió la persona?',
          options: ['Su bolso', 'Su cartera', 'Su teléfono', 'Sus llaves'],
          correctAnswer: 'Su bolso',
        },
      ],
      vocabulary: { term: 'verlieren', translation: 'perder' },
      hint: 'Escucha "meine Tasche verloren".',
    },
    {
      id: 'listening-b1-q2',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué describe?',
      audioWord: 'beschreiben',
      audioPhrase: 'Das Hotel ist sehr schön gelegen. Es hat einen großen Garten und ist nah am Strand.',
      scenario: 'Descripción de un hotel.',
      questions: [
        {
          text: '¿Qué tiene el hotel?',
          options: ['Un jardín grande', 'Una piscina', 'Un gimnasio', 'Un restaurante'],
          correctAnswer: 'Un jardín grande',
        },
      ],
      vocabulary: { term: 'der Garten', translation: 'el jardín' },
      hint: 'Escucha "einen großen Garten".',
    },
    {
      id: 'listening-b1-q3',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué opinión?',
      audioWord: 'meinen',
      audioPhrase: 'Ich finde, dass das neue Gesetz gut ist, weil es die Umwelt schützt.',
      scenario: 'Opinión sobre una ley.',
      questions: [
        {
          text: '¿Por qué le parece bien la ley?',
          options: ['Porque protege el ambiente', 'Porque es barata', 'Porque es nueva', 'No le parece bien'],
          correctAnswer: 'Porque protege el ambiente',
        },
      ],
      vocabulary: { term: 'die Umwelt', translation: 'el ambiente' },
      hint: 'Escucha "weil es die Umwelt schützt".',
    },
  ],
};

export const listeningLessonB2 = {
  id: 'listening-b2',
  title: 'Escucha: Argumentos y debates',
  activityId: 'listening-b2',
  durationMinutes: 15,
  questions: [
    {
      id: 'listening-b2-q1',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué argumento?',
      audioWord: 'argumentieren',
      audioPhrase: 'Ich bin der Meinung, dass Home-Office viele Vorteile hat. Man spart Zeit und ist flexibler.',
      scenario: 'Debate sobre teletrabajo.',
      questions: [
        {
          text: '¿Qué ventaja menciona?',
          options: ['Ahorra tiempo y es más flexible', 'Gana más dinero', 'Trabaja menos', 'Tiene mejor jefe'],
          correctAnswer: 'Ahorra tiempo y es más flexible',
        },
      ],
      vocabulary: { term: 'das Home-Office', translation: 'teletrabajo' },
      hint: 'Escucha "spart Zeit und ist flexibler".',
    },
    {
      id: 'listening-b2-q2',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué problema?',
      audioWord: 'das Problem',
      audioPhrase: 'Das Hauptproblem ist der Klimawandel. Wir müssen dringend etwas tun.',
      scenario: 'Discusión sobre cambio climático.',
      questions: [
        {
          text: '¿Cuál es el problema principal según el hablante?',
          options: ['El cambio climático', 'La contaminación', 'El tráfico', 'La economía'],
          correctAnswer: 'El cambio climático',
        },
      ],
      vocabulary: { term: 'der Klimawandel', translation: 'el cambio climático' },
      hint: 'Escucha "Hauptproblem ist der Klimawandel".',
    },
    {
      id: 'listening-b2-q3',
      type: 'listening',
      prompt: 'Escucha el audio y responde',
      word: '¿Qué solución?',
      audioWord: 'die Lösung',
      audioPhrase: 'Eine Lösung wäre, mehr öffentliche Verkehrsmittel zu nutzen und weniger Auto zu fahren.',
      scenario: 'Propuesta de solución.',
      questions: [
        {
          text: '¿Qué solución propone?',
          options: ['Usar más transporte público', 'Comprar más coches', 'Construir más carreteras', 'No hacer nada'],
          correctAnswer: 'Usar más transporte público',
        },
      ],
      vocabulary: { term: 'die Verkehrsmittel', translation: 'los medios de transporte' },
      hint: 'Escucha "mehr öffentliche Verkehrsmittel".',
    },
  ],
};

// Story Lessons by Level
export const storyLessonA1 = {
  id: 'story-a1-family',
  title: 'Cuento A1: Mi familia',
  activityId: 'story-a1-family',
  durationMinutes: 8,
  questions: [
    {
      id: 'story-a1-q1',
      type: 'multiple-choice',
      prompt: '¿Cuántas personas hay en la familia del cuento?',
      word: 'familia',
      options: ['Cuatro', 'Dos', 'Tres', 'Cinco'],
      answer: 'Cuatro',
      vocabulary: { term: 'die Familie', translation: 'la familia' },
      hint: 'Cuenta los miembros mencionados.',
    },
    {
      id: 'story-a1-q2',
      type: 'multiple-choice',
      prompt: '¿Cómo se llama el hermano?',
      word: 'hermano',
      options: ['Max', 'Tom', 'Lukas', 'Felix'],
      answer: 'Max',
      vocabulary: { term: 'der Bruder', translation: 'el hermano' },
      hint: 'Lee el nombre del hermano.',
    },
    {
      id: 'story-a1-q3',
      type: 'fill-blanks',
      prompt: 'Completa: Meine Mutter heißt ___.',
      sentence: 'Meine Mutter heißt ___.',
      blankIndex: 0,
      answer: 'Anna',
      vocabulary: { term: 'die Mutter', translation: 'la madre' },
      hint: 'El nombre está en el texto.',
    },
  ],
};

export const storyLessonA2 = {
  id: 'story-a2-weekend',
  title: 'Cuento A2: Mi fin de semana',
  activityId: 'story-a2-weekend',
  durationMinutes: 10,
  questions: [
    {
      id: 'story-a2-q1',
      type: 'multiple-choice',
      prompt: '¿Qué hace el narrador el sábado?',
      word: 'sábado',
      options: ['Va al parque', 'Estudia', 'Trabaja', 'Duerme'],
      answer: 'Va al parque',
      vocabulary: { term: 'der Park', translation: 'el parque' },
      hint: 'Lee el primer párrafo.',
    },
    {
      id: 'story-a2-q2',
      type: 'word-order',
      prompt: 'Ordena: Am Sonntag lese ich ein Buch',
      word: 'Am Sonntag lese ich ein Buch',
      words: ['Am', 'Sonntag', 'lese', 'ich', 'ein', 'Buch'],
      answer: 'Am Sonntag lese ich ein Buch',
      vocabulary: { term: 'lesen', translation: 'leer' },
      hint: 'El orden es tiempo - sujeto - verbo - objeto.',
    },
    {
      id: 'story-a2-q3',
      type: 'write-response',
      prompt: 'Escribe qué hace el narrador el domingo.',
      word: 'domingo',
      placeholder: 'Am Sonntag...',
      answer: 'Am Sonntag',
      vocabulary: { term: 'der Sonntag', translation: 'el domingo' },
      hint: 'El texto describe actividades relajantes.',
      feedback: 'El narrador lee un libro y descansa el domingo.',
      explanation: '«Am Sonntag» significa «el domingo» y sitúa en ese día las acciones del narrador que pide contar la consigna.',
    },
  ],
};

export const storyLessonB1 = {
  id: 'story-b1-weekend',
  title: 'Cuento B1: Un fin de semana especial',
  activityId: 'story-b1-weekend',
  durationMinutes: 10,
  questions: [
    {
      id: 'story-b1-q1',
      type: 'multiple-choice',
      prompt: 'En el cuento, ¿qué hace Anna el sábado por la mañana?',
      word: 'sábado',
      options: ['Va al mercado', 'Estudia en casa', 'Trabaja', 'Duerme'],
      answer: 'Va al mercado',
      vocabulary: { term: 'der Markt', translation: 'el mercado' },
      hint: 'Lee el primer párrafo del cuento.',
    },
    {
      id: 'story-b1-q2',
      type: 'multiple-choice',
      prompt: '¿Con quién encuentra Anna un café antiguo?',
      word: 'café',
      options: ['Con su amiga Lisa', 'Con su hermano', 'Con su madre', 'Sola'],
      answer: 'Con su amiga Lisa',
      vocabulary: { term: 'die Freundin', translation: 'la amiga' },
      hint: 'Lee la parte del café en el cuento.',
    },
    {
      id: 'story-b1-q3',
      type: 'write-response',
      prompt: 'Escribe en alemán qué le gusta hacer a Anna los domingos.',
      word: 'domingo',
      placeholder: 'Am Sonntag...',
      answer: 'Am Sonntag',
      vocabulary: { term: 'der Sonntag', translation: 'el domingo' },
      hint: 'El texto menciona actividades relajantes.',
      feedback: 'El texto dice que a Anna le gusta leer y pasear los domingos.',
      explanation: '«Am Sonntag» significa «el domingo»; esa expresión ubica en ese día las actividades que le gustan a Anna.',
    },
  ],
};

export const storyLessonB2_1 = {
  id: 'story-b2-career',
  title: 'Cuento B2: Un cambio de carrera',
  activityId: 'story-b2-career',
  durationMinutes: 12,
  questions: [
    {
      id: 'story-b2-q1',
      type: 'multiple-choice',
      prompt: '¿Por qué decide Thomas cambiar de trabajo?',
      word: 'cambiar',
      options: ['Quiere más tiempo libre', 'Gana poco dinero', 'No le gusta su jefe', 'Se muda de ciudad'],
      answer: 'Quiere más tiempo libre',
      vocabulary: { term: 'der Jobwechsel', translation: 'el cambio de trabajo' },
      hint: 'El texto habla sobre el equilibrio entre trabajo y vida personal.',
    },
    {
      id: 'story-b2-q2',
      type: 'fill-blanks',
      prompt: 'Completa: Thomas möchte ___ arbeiten.',
      sentence: 'Thomas möchte ___ arbeiten.',
      blankIndex: 0,
      answer: 'teilzeit',
      vocabulary: { term: 'Teilzeit', translation: 'tiempo parcial' },
      hint: 'Es lo opuesto a Vollzeit (tiempo completo).',
    },
    {
      id: 'story-b2-q3',
      type: 'write-response',
      prompt: 'Escribe en alemán cuál es el nuevo trabajo de Thomas.',
      word: 'nuevo trabajo',
      placeholder: 'Sein neuer Job ist...',
      answer: 'Sein neuer Job ist',
      vocabulary: { term: 'der neue Job', translation: 'el nuevo trabajo' },
      hint: 'El texto menciona que trabaja como consultor independiente.',
      feedback: 'Thomas ahora trabaja como freiberuflicher Berater (consultor independiente).',
      explanation: '«Sein neuer Job ist» significa «su nuevo trabajo es» y presenta la profesión actual de Thomas.',
    },
  ],
};

export const storyLessonB2_2 = {
  id: 'story-b2-travel',
  title: 'Cuento B2: Un viaje inolvidable',
  activityId: 'story-b2-travel',
  durationMinutes: 12,
  questions: [
    {
      id: 'story-b2-travel-q1',
      type: 'multiple-choice',
      prompt: '¿A qué país viaja la protagonista?',
      word: 'país',
      options: ['A Japón', 'A Italia', 'A Francia', 'A España'],
      answer: 'A Japón',
      vocabulary: { term: 'das Land', translation: 'el país' },
      hint: 'El texto menciona un país asiático.',
    },
    {
      id: 'story-b2-travel-q2',
      type: 'word-order',
      prompt: 'Ordena: Ich habe mich sehr gut gefühlt',
      word: 'Ich habe mich sehr gut gefühlt',
      words: ['Ich', 'habe', 'mich', 'sehr', 'gut', 'gefühlt'],
      answer: 'Ich habe mich sehr gut gefühlt',
      vocabulary: { term: 'sich fühlen', translation: 'sentirse' },
      hint: 'Perfekt de un verbo reflexivo.',
    },
    {
      id: 'story-b2-travel-q3',
      type: 'write-response',
      prompt: 'Escribe qué le gustó más del viaje.',
      word: 'viaje',
      placeholder: 'Am besten hat mir...',
      answer: 'Am besten',
      vocabulary: { term: 'die Reise', translation: 'el viaje' },
      hint: 'El texto describe aspectos culturales.',
      feedback: 'A la protagonista le gustó la cultura y la comida japonesa.',
      explanation: '«Am besten» significa «lo que más» y sirve para destacar qué fue lo que más disfrutó la protagonista del viaje.',
    },
  ],
};

export const challengeLessonA1 = {
  id: 'challenge-a1-city',
  levelCode: 'A1',
  title: 'Reto dinámico: Un día en la ciudad',
  activityId: 'challenge-a1-city',
  durationMinutes: 7,
  questions: [
    {
      id: 'challenge-a1-q1',
      prompt: 'Mia pregunta: «Wo ist der Bahnhof?». ¿Qué busca?',
      word: 'der Bahnhof',
      options: ['La estación de tren', 'El supermercado', 'La escuela', 'El hospital'],
      answer: 'La estación de tren',
      vocabulary: { term: 'der Bahnhof', translation: 'la estación de tren' },
      hint: 'Es el lugar donde llegan y salen los trenes.',
    },
    {
      id: 'challenge-a1-q2',
      type: 'fill-blanks',
      prompt: 'Completa la frase para pedir un café.',
      word: 'Ich ___ einen Kaffee.',
      sentence: 'Ich ___ einen Kaffee.',
      blankIndex: 0,
      answer: 'möchte',
      vocabulary: { term: 'möchten', translation: 'querer / gustaría' },
      hint: 'Usa una forma amable para pedir algo.',
    },
    {
      id: 'challenge-a1-q3',
      type: 'word-order',
      prompt: 'Ordena la frase para decir a dónde va Mia.',
      word: 'Mia fährt mit dem Bus.',
      words: ['Mia', 'fährt', 'mit', 'dem', 'Bus'],
      answer: 'Mia fährt mit dem Bus',
      vocabulary: { term: 'mit dem Bus fahren', translation: 'ir en autobús' },
      hint: 'En una frase simple, el verbo conjugado va en segundo lugar.',
    },
    {
      id: 'challenge-a1-q4',
      type: 'listening',
      prompt: 'Escucha el anuncio y responde.',
      word: 'Gleis',
      audioWord: 'Gleis',
      audioPhrase: 'Der Zug nach Berlin fährt von Gleis zwei.',
      scenario: 'Mia escucha un anuncio en la estación.',
      questions: [{
        text: '¿Desde qué andén sale el tren a Berlín?',
        options: ['Andén uno', 'Andén dos', 'Andén tres', 'Andén cuatro'],
        correctAnswer: 'Andén dos',
      }],
      vocabulary: { term: 'das Gleis', translation: 'el andén' },
      hint: 'Escucha el número que aparece después de «Gleis».',
    },
  ],
};

export const challengeLessonA2 = {
  id: 'challenge-a2-weekend',
  levelCode: 'A2',
  title: 'Reto dinámico: Planear el fin de semana',
  activityId: 'challenge-a2-weekend',
  durationMinutes: 8,
  questions: [
    {
      id: 'challenge-a2-q1',
      prompt: 'El pronóstico dice: «Am Samstag regnet es». ¿Qué conviene llevar?',
      word: 'regnen',
      options: ['Un paraguas', 'Gafas de sol', 'Una pelota', 'Un bañador'],
      answer: 'Un paraguas',
      vocabulary: { term: 'regnen', translation: 'llover' },
      hint: 'Piensa en lo que te protege de la lluvia.',
    },
    {
      id: 'challenge-a2-q2',
      type: 'fill-blanks',
      prompt: 'Completa la frase en Perfekt.',
      word: 'Wir ___ gestern einen Film ___.',
      sentence: 'Wir ___ gestern einen Film ___.',
      blankIndex: 0,
      answer: 'haben',
      vocabulary: { term: 'einen Film sehen', translation: 'ver una película' },
      hint: 'Se forma el Perfekt con el auxiliar haben o sein.',
    },
    {
      id: 'challenge-a2-q3',
      type: 'word-order',
      prompt: 'Ordena la invitación para el sábado.',
      word: 'Möchtest du mit uns ins Kino gehen?',
      words: ['Möchtest', 'du', 'mit', 'uns', 'ins', 'Kino', 'gehen?'],
      answer: 'Möchtest du mit uns ins Kino gehen?',
      vocabulary: { term: 'ins Kino gehen', translation: 'ir al cine' },
      hint: 'En una pregunta de sí o no, el verbo conjugado abre la frase.',
    },
    {
      id: 'challenge-a2-q4',
      type: 'listening',
      prompt: 'Escucha el mensaje y responde.',
      word: 'sich treffen',
      audioWord: 'treffen',
      audioPhrase: 'Wir treffen uns am Sonntag um elf Uhr im Park.',
      scenario: 'Dos amigos acuerdan cuándo verse.',
      questions: [{
        text: '¿Cuándo se encuentran?',
        options: ['El sábado a las once', 'El domingo a las once', 'El domingo a las diez', 'El lunes a las once'],
        correctAnswer: 'El domingo a las once',
      }],
      vocabulary: { term: 'sich treffen', translation: 'encontrarse' },
      hint: 'Presta atención al día y a la hora del mensaje.',
    },
  ],
};

export const challengeLessonB1 = {
  id: 'challenge-b1-travel',
  levelCode: 'B1',
  title: 'Reto dinámico: Resolver un viaje',
  activityId: 'challenge-b1-travel',
  durationMinutes: 9,
  questions: [
    {
      id: 'challenge-b1-q1',
      prompt: 'El tren se retrasó y perdiste la conexión. ¿Qué significa «die Verspätung»?',
      word: 'die Verspätung',
      options: ['El retraso', 'El billete', 'El andén', 'El destino'],
      answer: 'El retraso',
      vocabulary: { term: 'die Verspätung', translation: 'el retraso' },
      hint: 'Es lo contrario de llegar a tiempo.',
    },
    {
      id: 'challenge-b1-q2',
      type: 'fill-blanks',
      prompt: 'Completa con el verbo en Plusquamperfekt.',
      word: 'Nachdem ich das Ticket ___, stieg ich in den Zug.',
      sentence: 'Nachdem ich das Ticket ___, stieg ich in den Zug.',
      blankIndex: 0,
      answer: 'gekauft hatte',
      vocabulary: { term: 'ein Ticket kaufen', translation: 'comprar un billete' },
      hint: 'La compra ocurrió antes de subir al tren; usa hatte con el participio.',
    },
    {
      id: 'challenge-b1-q3',
      type: 'dictation',
      prompt: 'Escucha y escribe la frase que necesitas en la estación.',
      word: 'die Verbindung',
      audioWord: 'die Verbindung',
      audioPhrase: 'Könnten Sie mir bitte die nächste Verbindung nach Hamburg nennen?',
      answer: 'Könnten Sie mir bitte die nächste Verbindung nach Hamburg nennen?',
      vocabulary: { term: 'die Verbindung', translation: 'la conexión (de transporte)' },
      hint: 'Escucha la pregunta formal completa sobre la próxima conexión.',
    },
    {
      id: 'challenge-b1-q4',
      type: 'listening',
      prompt: 'Escucha el aviso y responde.',
      word: 'umsteigen',
      audioWord: 'umsteigen',
      audioPhrase: 'Wegen einer Baustelle müssen Reisende in Hannover umsteigen.',
      scenario: 'Un aviso informa de cambios en el trayecto.',
      questions: [{
        text: '¿Qué deben hacer los pasajeros en Hannover?',
        options: ['Cambiar de tren', 'Comprar otro billete', 'Bajar en Hamburgo', 'Esperar una hora'],
        correctAnswer: 'Cambiar de tren',
      }],
      vocabulary: { term: 'umsteigen', translation: 'hacer transbordo' },
      hint: 'El verbo indica que hay que continuar en otro transporte.',
    },
  ],
};

export const challengeLessonB2 = {
  id: 'challenge-b2-work',
  levelCode: 'B2',
  title: 'Reto dinámico: Comunicar ideas en el trabajo',
  activityId: 'challenge-b2-work',
  durationMinutes: 10,
  questions: [
    {
      id: 'challenge-b2-q1',
      prompt: 'En un debate, ¿qué significa «die Voraussetzung»?',
      word: 'die Voraussetzung',
      options: ['El requisito previo', 'La consecuencia', 'La propuesta', 'La desventaja'],
      answer: 'El requisito previo',
      vocabulary: { term: 'die Voraussetzung', translation: 'el requisito previo' },
      hint: 'Es algo que debe cumplirse para que otra cosa sea posible.',
    },
    {
      id: 'challenge-b2-q2',
      type: 'fill-blanks',
      prompt: 'Completa la frase con una estructura de Konjunktiv II.',
      word: 'Wenn wir mehr Zeit hätten, ___ wir das Projekt gründlicher prüfen.',
      sentence: 'Wenn wir mehr Zeit hätten, ___ wir das Projekt gründlicher prüfen.',
      blankIndex: 0,
      answer: 'würden',
      vocabulary: { term: 'würden', translation: 'haríamos (condicional)' },
      hint: 'La oración expresa una situación hipotética y usa würden con el infinitivo.',
    },
    {
      id: 'challenge-b2-q3',
      type: 'word-order',
      prompt: 'Ordena la frase subordinada sobre una propuesta.',
      word: 'Obwohl die Frist knapp ist, bleibt das Team zuversichtlich.',
      words: ['Obwohl', 'die', 'Frist', 'knapp', 'ist,', 'bleibt', 'das', 'Team', 'zuversichtlich.'],
      answer: 'Obwohl die Frist knapp ist, bleibt das Team zuversichtlich.',
      vocabulary: { term: 'zuversichtlich', translation: 'optimista / confiado' },
      hint: 'En la subordinada que empieza con obwohl, el verbo conjugado va al final.',
    },
    {
      id: 'challenge-b2-q4',
      type: 'listening',
      prompt: 'Escucha la conclusión de la reunión y responde.',
      word: 'die Maßnahme',
      audioWord: 'die Maßnahme',
      audioPhrase: 'Damit wir das Ziel erreichen, sollten wir die vorgeschlagene Maßnahme zuerst erproben.',
      scenario: 'El equipo acuerda el siguiente paso para alcanzar su objetivo.',
      questions: [{
        text: '¿Qué propone hacer el equipo primero?',
        options: ['Probar la medida propuesta', 'Cambiar el objetivo', 'Posponer la reunión', 'Presentar otro presupuesto'],
        correctAnswer: 'Probar la medida propuesta',
      }],
      vocabulary: { term: 'die Maßnahme', translation: 'la medida' },
      hint: 'Escucha qué acción se debería realizar antes de continuar.',
    },
  ],
};

export const challengeLessons = [
  challengeLessonA1,
  challengeLessonA2,
  challengeLessonB1,
  challengeLessonB2,
];

export const grammarLessons = [
  grammarLessonArticles, grammarLessonWordOrder, grammarLessonPresent, grammarLessonNegation,
  grammarLessonAccusative, grammarLessonModalVerbs, grammarLessonDative, grammarLessonPerfect,
  grammarLessonNounPlural, grammarLessonSeparableVerbs, grammarLessonGenitive,
  grammarLessonImperative, grammarLessonFuture, grammarLessonSubjunctive,
  grammarLessonPrepositions, grammarLessonReflexive, grammarLessonRelative,
];
export const practiceLessons = [
  dictationLessonBasics, dictationLessonA2, dictationLessonB1, dictationLessonB2,
  fillBlanksLesson, fillBlanksLessonA2, fillBlanksLessonB1, fillBlanksLessonB2,
  wordOrderLesson, wordOrderLessonA2, wordOrderLessonB1, wordOrderLessonB2,
  writeResponseLesson, writeResponseLessonA2, writeResponseLessonB1, writeResponseLessonB2,
  listeningLesson, listeningLessonA2, listeningLessonB1, listeningLessonB2,
];
export const storyLessons = [
  storyLessonA1, storyLessonA2, storyLessonB1, storyLessonB2_1, storyLessonB2_2,
];
export const lessons = [...vocabularyLessons, ...readingLessons, ...grammarLessons, ...practiceLessons, ...storyLessons, ...challengeLessons];
