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

export const vocabularyLessons = [
  vocabularyLesson, vocabularyLessonDaily, vocabularyLessonFood, vocabularyLessonTravel,
  vocabularyLessonFamily, vocabularyLessonShopping, vocabularyLessonHome, vocabularyLessonHealth,
  vocabularyLessonHobbies, vocabularyLessonWork, vocabularyLessonGreetings, vocabularyLessonStudy,
];
export const readingLessons = [
  readingLessonCity, readingLessonCafe, readingLessonStation, readingLessonMarket, readingLessonWeather,
  readingLessonDoctor, readingLessonWeekend, readingLessonApartment, readingLessonConversation,
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

// B1 Level Lessons
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
    },
  ],
};

// B2 Level Lessons
export const storyLessonB2 = {
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
    },
  ],
};

export const grammarLessons = [
  grammarLessonArticles, grammarLessonWordOrder, grammarLessonPresent, grammarLessonNegation,
  grammarLessonAccusative, grammarLessonModalVerbs, grammarLessonDative, grammarLessonPerfect,
  grammarLessonNounPlural, grammarLessonSeparableVerbs, grammarLessonGenitive,
  grammarLessonImperative, grammarLessonFuture, grammarLessonSubjunctive,
];
export const practiceLessons = [
  dictationLessonBasics, fillBlanksLesson, wordOrderLesson, writeResponseLesson, listeningLesson,
];
export const storyLessons = [
  storyLessonB1, storyLessonB2,
];
export const lessons = [...vocabularyLessons, ...readingLessons, ...grammarLessons, ...practiceLessons, ...storyLessons];
