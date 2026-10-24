const exercise = (id, prompt, options, answer, explanation, term) => ({
  id, prompt, options, answer, explanation, term,
});

export const theoryModules = [
  {
    id: 'theory-foundations',
    level: 'A1',
    title: '1. Fundamentos del alemán',
    summary: 'Pronuncia sonidos alemanes, saluda, preséntate y usa números, fechas y pronombres.',
    lessons: [
      {
        id: 'alphabet-pronunciation',
        title: 'Alfabeto y sonidos',
        explanation: 'El alemán usa el alfabeto latino y añade ä, ö, ü y ß. Las vocales con umlaut son sonidos propios, no adornos. La ß se llama Eszett y suele representar una s larga y sorda.',
        rules: [
          'ä se aproxima a la e de «mesa»; ö y ü se pronuncian redondeando los labios.',
          'La ß suena como ss: Straße (calle). En Suiza se escribe ss.',
          'La combinación ei suena «ai» y ie suena «ii»: mein (mi), Liebe (amor).',
        ],
        examples: [
          { german: 'Guten Tag!', spanish: '¡Buenos días! / ¡Buenas tardes!' },
          { german: 'Ich spreche Deutsch.', spanish: 'Hablo alemán.' },
          { german: 'Die Straße ist lang.', spanish: 'La calle es larga.' },
        ],
        table: { columns: ['Letra', 'Orientación de pronunciación', 'Ejemplo'], rows: [['ä', 'parecida a e', 'Mädchen (niña)'], ['ö', 'e con labios redondeados', 'schön (bonito)'], ['ü', 'i con labios redondeados', 'Tür (puerta)'], ['ß', 'ss sorda', 'Straße (calle)']] },
        exercises: [
          exercise('alphabet-ei', '¿Cómo suena normalmente «ei» en «mein»?', ['Como «ai»', 'Como «ii»', 'Como «oi»'], 'Como «ai»', 'En alemán, «ei» representa el diptongo /ai/: «mein» se pronuncia aproximadamente «main».', 'ei'),
          exercise('alphabet-umlaut', '¿Qué distingue a ö y ü?', ['Son vocales con umlaut y labios redondeados', 'Son consonantes mudas', 'Siempre se escriben ss'], 'Son vocales con umlaut y labios redondeados', 'Ö y ü son vocales alemanas propias; la posición redondeada de los labios ayuda a producirlas.', 'Umlaut'),
        ],
      },
      {
        id: 'greetings-pronouns-dates',
        title: 'Saludos, pronombres y fechas',
        explanation: 'Los pronombres indican quién realiza la acción. Du es «tú» informal; Sie, con mayúscula, es el trato formal. Los nombres de días y meses se escriben con mayúscula.',
        rules: [
          'Usa du con una persona en un contexto informal y Sie para hablar formalmente con una o varias personas.',
          'sie significa «ella» o «ellas»; Sie significa «usted/ustedes» y siempre lleva mayúscula.',
          'Días: Montag a Sonntag. Meses: Januar a Dezember. La fecha se puede escribir «am 3. Mai».',
        ],
        examples: [
          { german: 'Guten Morgen. Wie heißt du?', spanish: 'Buenos días. ¿Cómo te llamas? (informal)' },
          { german: 'Wie heißen Sie?', spanish: '¿Cómo se llama usted? (formal)' },
          { german: 'Heute ist Montag, der 3. Mai.', spanish: 'Hoy es lunes, 3 de mayo.' },
        ],
        table: { columns: ['Persona', 'Pronombre', 'Ejemplo'], rows: [['yo', 'ich', 'Ich lerne. (Aprendo.)'], ['tú informal', 'du', 'Du lernst. (Aprendes.)'], ['él / ella / ello', 'er / sie / es', 'Sie lernt. (Ella aprende.)'], ['nosotros/as', 'wir', 'Wir lernen. (Aprendemos.)'], ['vosotros/as', 'ihr', 'Ihr lernt. (Aprendéis.)'], ['ellos/as', 'sie', 'Sie lernen. (Ellos aprenden.)'], ['usted / ustedes', 'Sie', 'Sie lernen. (Usted aprende.)']] },
        exercises: [
          exercise('pronoun-formal', '¿Cuál es el pronombre formal para dirigirse a una persona?', ['Sie', 'du', 'ihr'], 'Sie', '«Sie» con mayúscula es el tratamiento formal; el verbo se conjuga como en «sie» plural.', 'Sie'),
          exercise('date-month-capital', '¿Cómo se escribe «mayo» en alemán?', ['Mai', 'mai', 'MAI'], 'Mai', 'Los nombres de los meses son sustantivos en alemán y empiezan con mayúscula: «Mai».', 'Mai'),
        ],
      },
    ],
  },
  {
    id: 'theory-sentences',
    level: 'A1',
    title: '2. Formación de oraciones',
    summary: 'Construye afirmaciones, preguntas y negaciones con el verbo en la posición adecuada.',
    lessons: [
      {
        id: 'sentence-word-order',
        title: 'Oraciones afirmativas y orden básico',
        explanation: 'En una oración principal afirmativa, el verbo conjugado ocupa la segunda posición. El primer elemento puede ser el sujeto o una expresión de tiempo o lugar.',
        rules: [
          'Sujeto + verbo conjugado + complementos: «Ich lerne heute Deutsch».',
          'Si otro elemento ocupa el primer lugar, el verbo sigue en segundo lugar y el sujeto va detrás: «Heute lerne ich Deutsch».',
          'Los infinitivos y participios suelen ir al final cuando hay una estructura verbal compuesta.',
        ],
        examples: [
          { german: 'Mia wohnt in Berlin.', spanish: 'Mia vive en Berlín.' },
          { german: 'Heute wohnt Mia in Berlin.', spanish: 'Hoy Mia vive en Berlín.' },
          { german: 'Wir lernen am Abend Deutsch.', spanish: 'Aprendemos alemán por la tarde.' },
        ],
        table: { columns: ['Posición 1', 'Verbo conjugado (posición 2)', 'Resto'], rows: [['Ich', 'lerne', 'heute Deutsch.'], ['Heute', 'lerne', 'ich Deutsch.'], ['In Berlin', 'wohnt', 'Mia.']] },
        exercises: [
          exercise('v2-today', 'Completa: «Heute ___ ich Deutsch.»', ['lerne', 'ich lerne', 'Deutsch'], 'lerne', '«Heute» ocupa la primera posición; «lerne» debe ir en segunda posición y el sujeto «ich» después.', 'posición del verbo'),
          exercise('v2-subject-first', 'Elige el orden correcto: «Nosotros vivimos aquí».', ['Wir wohnen hier.', 'Wir hier wohnen.', 'Wohnen hier wir.'], 'Wir wohnen hier.', 'En la afirmación con el sujeto primero, el verbo conjugado «wohnen» ocupa la segunda posición.', 'wohnen'),
        ],
      },
      {
        id: 'questions-negation',
        title: 'Preguntas, palabras interrogativas y negación',
        explanation: 'En preguntas de sí o no, el verbo conjugado va primero. En preguntas con palabra interrogativa, esa palabra va primero y el verbo ocupa la segunda posición. Nicht y kein niegan partes distintas.',
        rules: [
          'Pregunta sí/no: verbo + sujeto + resto: «Kommst du heute?»',
          'Pregunta abierta: wer (quién), was (qué), wo (dónde), wann (cuándo), warum (por qué), wie (cómo) + verbo + sujeto.',
          'Kein niega un sustantivo con ein o sin artículo; nicht niega verbos, adjetivos u otros elementos.',
        ],
        examples: [
          { german: 'Wohnst du in Berlin?', spanish: '¿Vives en Berlín?' },
          { german: 'Warum lernst du Deutsch?', spanish: '¿Por qué aprendes alemán?' },
          { german: 'Ich habe kein Auto. Ich wohne nicht in Berlin.', spanish: 'No tengo coche. No vivo en Berlín.' },
        ],
        table: { columns: ['Palabra', 'Significado', 'Ejemplo'], rows: [['wer', 'quién', 'Wer kommt? (¿Quién viene?)'], ['was', 'qué', 'Was lernst du? (¿Qué aprendes?)'], ['wo', 'dónde', 'Wo wohnst du? (¿Dónde vives?)'], ['wann', 'cuándo', 'Wann beginnt der Kurs? (¿Cuándo empieza el curso?)'], ['warum', 'por qué', 'Warum bist du hier? (¿Por qué estás aquí?)'], ['wie', 'cómo', 'Wie heißt du? (¿Cómo te llamas?)']] },
        exercises: [
          exercise('yes-no-question', '¿Cuál es la pregunta correcta para «¿Vives aquí?»?', ['Wohnst du hier?', 'Du wohnst hier?', 'Wohnst hier du?'], 'Wohnst du hier?', 'En una pregunta de sí o no, el verbo conjugado «wohnst» va antes del sujeto «du».', 'wohnen'),
          exercise('nicht-kein', 'Completa: «Ich habe ___ Schwester.»', ['keine', 'nicht', 'kein'], 'keine', '«Schwester» es femenino y se niega con «kein» declinado: «keine Schwester».', 'kein'),
        ],
      },
    ],
  },
  {
    id: 'theory-verbs',
    level: 'A2',
    title: '3. Verbos y conjugaciones',
    summary: 'Conjuga verbos frecuentes, reconoce cambios de raíz y usa verbos separables y modales.',
    lessons: [
      {
        id: 'present-conjugation',
        title: 'Presente y verbos esenciales',
        explanation: 'En Präsens, se elimina -en del infinitivo y se añade una terminación según el pronombre. Sein, haben, werden y algunos verbos frecuentes son irregulares y se memorizan por sus formas.',
        rules: [
          'Terminaciones regulares: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.',
          'En verbos como sprechen, la vocal cambia en du y er/sie/es: du sprichst, er spricht.',
          '«werden» significa convertirse/llegar a ser y también ayuda a formar el futuro.',
        ],
        examples: [
          { german: 'Ich bin müde und habe Zeit.', spanish: 'Estoy cansado/a y tengo tiempo.' },
          { german: 'Du sprichst sehr gut Deutsch.', spanish: 'Hablas muy bien alemán.' },
          { german: 'Wir kommen heute und machen die Aufgabe.', spanish: 'Venimos hoy y hacemos el ejercicio.' },
        ],
        table: { columns: ['Pronombre', 'sein (ser/estar)', 'haben (tener)', 'werden (llegar a ser)', 'sprechen (hablar)'], rows: [['ich', 'bin', 'habe', 'werde', 'spreche'], ['du', 'bist', 'hast', 'wirst', 'sprichst'], ['er/sie/es', 'ist', 'hat', 'wird', 'spricht'], ['wir', 'sind', 'haben', 'werden', 'sprechen'], ['ihr', 'seid', 'habt', 'werdet', 'sprecht'], ['sie/Sie', 'sind', 'haben', 'werden', 'sprechen']] },
        exercises: [
          exercise('sein-du', 'Completa: «Du ___ heute sehr freundlich.»', ['bist', 'bin', 'seid'], 'bist', 'La forma de «sein» para «du» es «bist»: «Du bist heute sehr freundlich».', 'sein'),
          exercise('sprechen-er', 'Completa: «Er ___ mit der Lehrerin.»', ['spricht', 'spreche', 'sprechen'], 'spricht', '«Sprechen» cambia e por i con er/sie/es: «Er spricht».', 'sprechen'),
        ],
      },
      {
        id: 'separable-modal-verbs',
        title: 'Verbos separables y modales',
        explanation: 'Los verbos separables envían su prefijo al final de la oración principal. Los modales se conjugan y dejan el verbo principal en infinitivo al final.',
        rules: [
          '«aufstehen»: «Ich stehe um sieben Uhr auf.» El prefijo auf queda al final.',
          'Modales: können (poder), müssen (tener que), wollen (querer), dürfen (tener permiso), sollen (deber), mögen (gustar).',
          'En la oración con modal, el infinitivo va al final: «Wir müssen heute arbeiten».',
        ],
        examples: [
          { german: 'Sie steht früh auf.', spanish: 'Ella se levanta temprano.' },
          { german: 'Ich kann heute kommen.', spanish: 'Puedo venir hoy.' },
          { german: 'Darf ich hier sitzen?', spanish: '¿Puedo sentarme aquí? (¿Tengo permiso?)' },
        ],
        table: { columns: ['Pronombre', 'können', 'müssen', 'wollen', 'dürfen'], rows: [['ich', 'kann', 'muss', 'will', 'darf'], ['du', 'kannst', 'musst', 'willst', 'darfst'], ['er/sie/es', 'kann', 'muss', 'will', 'darf'], ['wir', 'können', 'müssen', 'wollen', 'dürfen'], ['ihr', 'könnt', 'müsst', 'wollt', 'dürft'], ['sie/Sie', 'können', 'müssen', 'wollen', 'dürfen']] },
        exercises: [
          exercise('modal-mussen', 'Completa: «Wir ___ heute lernen.» (tenemos que)', ['müssen', 'muss', 'musst'], 'müssen', 'Con «wir», «müssen» conserva la forma de infinitivo: «Wir müssen heute lernen».', 'müssen'),
          exercise('separable-anrufen', 'Completa: «Ich rufe dich später ___.»', ['an', 'auf', 'mit'], 'an', 'En «anrufen», el prefijo separable «an» se coloca al final de la oración principal.', 'anrufen'),
        ],
      },
    ],
  },
  {
    id: 'theory-tenses',
    level: 'A2',
    title: '4. Tiempos verbales',
    summary: 'Elige entre presente, Perfekt, Präteritum y Futur I según el contexto.',
    lessons: [
      {
        id: 'past-tenses',
        title: 'Präsens, Perfekt y Präteritum',
        explanation: 'El Präsens habla del presente y también puede expresar un futuro cercano con una referencia temporal. El Perfekt es el pasado más habitual al conversar. El Präteritum aparece sobre todo en narraciones y es común con sein, haben y modales.',
        rules: [
          'Perfekt = haben/sein conjugado + Partizip II al final: «Ich habe gelernt», «Sie ist gefahren».',
          'La mayoría de los verbos usan haben; movimiento/cambio de estado suelen usar sein.',
          'Präteritum frecuente: war (era/estaba/fui), hatte (tenía), konnte (podía), musste (tenía que).',
        ],
        examples: [
          { german: 'Morgen fahre ich nach Köln.', spanish: 'Mañana voy a Colonia.' },
          { german: 'Wir haben gestern zusammen gekocht.', spanish: 'Ayer cocinamos juntos.' },
          { german: 'Früher war die Reise kürzer.', spanish: 'Antes el viaje era más corto.' },
        ],
        table: { columns: ['Tiempo', 'Formación', 'Ejemplo'], rows: [['Präsens', 'verbo conjugado', 'Ich lerne Deutsch. (Aprendo alemán.)'], ['Perfekt', 'haben/sein + participio', 'Ich habe Deutsch gelernt. (He aprendido alemán.)'], ['Präteritum', 'forma pasada', 'Ich war zu Hause. (Estaba en casa.)']] },
        exercises: [
          exercise('perfekt-haben', 'Completa: «Wir ___ einen Film gesehen.»', ['haben', 'sind', 'hat'], 'haben', '«Sehen» forma el Perfekt con «haben»: «Wir haben einen Film gesehen».', 'Perfekt'),
          exercise('perfekt-sein', 'Completa: «Sie ___ nach Berlin gefahren.»', ['ist', 'hat', 'sind'], 'ist', '«Fahren» indica desplazamiento y aquí usa «sein»: «Sie ist gefahren».', 'fahren'),
        ],
      },
      {
        id: 'future-negation-questions',
        title: 'Futuro, preguntas y negación en varios tiempos',
        explanation: 'Futur I se forma con werden conjugado e infinitivo al final. Muchas intenciones futuras se expresan también con Präsens y una referencia temporal. Las preguntas y negaciones conservan el orden propio del tiempo verbal.',
        rules: [
          'Futur I: sujeto + werden conjugado + complementos + infinitivo final.',
          'Negación en Perfekt: «Ich habe den Film nicht gesehen.» Nicht va antes del participio final en este ejemplo.',
          'Pregunta en Futur I: «Wirst du morgen arbeiten?» El verbo conjugado abre la pregunta.',
        ],
        examples: [
          { german: 'Ich werde später anrufen.', spanish: 'Llamaré más tarde.' },
          { german: 'Wir werden am Sonntag nicht arbeiten.', spanish: 'No trabajaremos el domingo.' },
          { german: 'Hast du die Nachricht gelesen?', spanish: '¿Has leído el mensaje?' },
        ],
        table: { columns: ['Pronombre', 'werden', 'Ejemplo futuro'], rows: [['ich', 'werde', 'Ich werde reisen.'], ['du', 'wirst', 'Du wirst reisen.'], ['er/sie/es', 'wird', 'Sie wird reisen.'], ['wir', 'werden', 'Wir werden reisen.'], ['ihr', 'werdet', 'Ihr werdet reisen.'], ['sie/Sie', 'werden', 'Sie werden reisen.']] },
        exercises: [
          exercise('future-word-order', 'Completa: «Morgen ___ wir früher aufstehen.»', ['werden', 'werdet', 'wird'], 'werden', 'Con «wir», Futur I usa «werden»; el infinitivo separable «aufstehen» queda al final.', 'Futur I'),
          exercise('preterite-war', 'Completa: «Gestern ___ ich sehr müde.»', ['war', 'bin', 'hatte'], 'war', 'El Präteritum de «sein» para «ich» es «war» y expresa un estado pasado.', 'sein'),
        ],
      },
    ],
  },
  {
    id: 'theory-nouns-cases',
    level: 'B1',
    title: '5. Sustantivos, artículos y casos',
    summary: 'Comprende el género, los plurales y cómo cambian los artículos en nominativo, acusativo, dativo y genitivo.',
    lessons: [
      {
        id: 'articles-plurals-possessives',
        title: 'Género, artículos, plurales y posesivos',
        explanation: 'Cada sustantivo alemán tiene género gramatical: masculino der, femenino die o neutro das. Conviene aprender cada sustantivo junto con su artículo y plural, porque el género no siempre coincide con el español.',
        rules: [
          'Indefinidos: ein (masculino/neutro) y eine (femenino). No hay artículo indefinido plural equivalente a «unos/unas».',
          'Los plurales tienen varios patrones: die Bücher, die Frauen, die Kinder. Aprende el plural con cada palabra.',
          'Posesivos: mein, dein, sein, ihr, unser, euer, Ihr; sus terminaciones cambian como las de ein.',
        ],
        examples: [
          { german: 'Das ist mein Bruder und meine Schwester.', spanish: 'Ese es mi hermano y esa es mi hermana.' },
          { german: 'Wir lesen die Bücher.', spanish: 'Leemos los libros.' },
          { german: 'Euer Haus ist sehr schön.', spanish: 'Vuestra casa es muy bonita.' },
        ],
        table: { columns: ['Género', 'Artículo definido', 'Indefinido', 'Ejemplo'], rows: [['masculino', 'der', 'ein', 'der Tisch / ein Tisch'], ['femenino', 'die', 'eine', 'die Lampe / eine Lampe'], ['neutro', 'das', 'ein', 'das Kind / ein Kind'], ['plural', 'die', '—', 'die Kinder']] },
        exercises: [
          exercise('gender-kind', '¿Qué artículo definido acompaña a «Kind»?', ['das', 'der', 'die'], 'das', '«Kind» es neutro: se aprende como «das Kind» y su plural es «die Kinder».', 'das Kind'),
          exercise('possessive-meine', 'Completa: «Das ist ___ Mutter.»', ['meine', 'mein', 'meinen'], 'meine', '«Mutter» es femenino nominativo, por eso el posesivo lleva la terminación -e: «meine Mutter».', 'mein'),
        ],
      },
      {
        id: 'four-cases',
        title: 'Nominativo, acusativo, dativo y genitivo',
        explanation: 'El caso muestra la función de un sustantivo en la oración. El artículo se declina según el género y el caso. Empieza identificando quién hace la acción, qué la recibe y a quién o para quién ocurre.',
        rules: [
          'Nominativo: sujeto. Acusativo: objeto directo. Dativo: objeto indirecto o complemento de ciertos verbos/preposiciones.',
          'Genitivo expresa posesión o relación; en conversación muchas veces se sustituye por von + dativo.',
          'El cambio más visible del definido masculino singular es der → den (acusativo), dem (dativo), des (genitivo).',
        ],
        examples: [
          { german: 'Der Mann sieht den Hund.', spanish: 'El hombre ve al perro. (nominativo + acusativo)' },
          { german: 'Ich gebe dem Kind einen Apfel.', spanish: 'Le doy una manzana al niño. (dativo + acusativo)' },
          { german: 'Das ist das Auto des Lehrers.', spanish: 'Ese es el coche del profesor. (genitivo)' },
        ],
        table: { columns: ['Caso', 'Masculino', 'Femenino', 'Neutro', 'Plural'], rows: [['Nominativo', 'der', 'die', 'das', 'die'], ['Acusativo', 'den', 'die', 'das', 'die'], ['Dativo', 'dem', 'der', 'dem', 'den (+n)'], ['Genitivo', 'des (+s/es)', 'der', 'des (+s/es)', 'der']] },
        exercises: [
          exercise('accusative-mann', 'Completa: «Ich sehe ___ Mann.»', ['den', 'dem', 'des'], 'den', '«Mann» recibe directamente la acción de ver, así que está en acusativo: «der» cambia a «den».', 'acusativo'),
          exercise('dative-kind', 'Completa: «Wir helfen ___ Kind.»', ['dem', 'den', 'des'], 'dem', 'El verbo «helfen» rige dativo; el artículo neutro «das» cambia a «dem».', 'dativo'),
        ],
      },
    ],
  },
  {
    id: 'theory-adjectives',
    level: 'B1',
    title: '6. Adjetivos y descripciones',
    summary: 'Describe personas, objetos y lugares; forma comparativos y usa terminaciones adjetivales.',
    lessons: [
      {
        id: 'adjective-position-comparison',
        title: 'Posición, comparativo y superlativo',
        explanation: 'Un adjetivo puede ir después de sein sin terminación o delante de un sustantivo, donde concuerda con su género, número y caso. El comparativo compara dos elementos y el superlativo expresa el grado más alto.',
        rules: [
          'Predicativo, sin declinar: «Das Haus ist groß.» Atributivo, declinado: «ein großes Haus».',
          'Comparativo frecuente: adjetivo + -er + als: «größer als» (más grande que).',
          'Superlativo predicativo: am + adjetivo + -sten: «am größten» (el más grande).',
        ],
        examples: [
          { german: 'Die Stadt ist ruhig.', spanish: 'La ciudad es tranquila.' },
          { german: 'Berlin ist größer als Bonn.', spanish: 'Berlín es más grande que Bonn.' },
          { german: 'Dieser Park ist am schönsten.', spanish: 'Este parque es el más bonito.' },
        ],
        table: { columns: ['Forma', 'Adjetivo schön (bonito)', 'Uso'], rows: [['Base', 'schön', 'ein schöner Tag (un día bonito)'], ['Comparativo', 'schöner', 'schöner als (más bonito que)'], ['Superlativo', 'am schönsten', 'am schönsten (el más bonito)']] },
        exercises: [
          exercise('comparative-als', 'Completa: «Der Zug ist schneller ___ der Bus.»', ['als', 'wie', 'wenn'], 'als', 'El comparativo «schneller» se compara con «als»: «más rápido que».', 'comparativo'),
          exercise('adjective-predicative', '¿Qué frase usa el adjetivo sin terminación atributiva?', ['Das Zimmer ist klein.', 'Das kleine Zimmer.', 'Ein kleiner Zimmer.'], 'Das Zimmer ist klein.', 'Después de «ist», «klein» funciona como predicado y no lleva terminación de declinación.', 'klein'),
        ],
      },
      {
        id: 'adjective-endings',
        title: 'Terminaciones y descripciones',
        explanation: 'La terminación del adjetivo atributivo comparte información gramatical que puede no estar marcada claramente en el artículo. Hay declinación débil tras artículo definido, mixta tras ein/posesivo y fuerte sin artículo.',
        rules: [
          'Tras der/die/das, el artículo suele marcar el caso: «der nette Mann», «mit dem netten Mann».',
          'Tras ein/mein, el adjetivo aporta la marca cuando el artículo no la muestra: «ein netter Mann», «mein kleines Haus».',
          'La forma depende también del plural y el caso; usa una tabla de declinación y observa artículo + sustantivo juntos.',
        ],
        examples: [
          { german: 'Die freundliche Nachbarin wohnt hier.', spanish: 'La vecina amable vive aquí.' },
          { german: 'Ich kaufe einen warmen Mantel.', spanish: 'Compro un abrigo cálido.' },
          { german: 'Wir wohnen in einem ruhigen Viertel.', spanish: 'Vivimos en un barrio tranquilo.' },
        ],
        table: { columns: ['Contexto', 'Ejemplo', 'Señal'], rows: [['Artículo definido', 'der alte Bahnhof', 'el artículo muestra nominativo masculino'], ['Ein- palabra', 'ein alter Bahnhof', 'el adjetivo marca masculino nominativo'], ['Dativo femenino', 'mit der alten Stadt', 'dativo femenino usa -en en el adjetivo']] },
        exercises: [
          exercise('adjective-accusative', 'Completa: «Ich sehe einen ___ Hund.»', ['großen', 'großer', 'großes'], 'großen', '«Hund» es masculino acusativo y va después de «einen»; el adjetivo atributivo termina en -en.', 'declinación'),
          exercise('adjective-dative', 'Completa: «Sie wohnt in einer ___ Wohnung.»', ['kleinen', 'kleine', 'kleiner'], 'kleinen', '«In» expresa ubicación aquí y rige dativo; después de «einer», el adjetivo termina en -en.', 'declinación'),
        ],
      },
    ],
  },
  {
    id: 'theory-connectors',
    level: 'B2',
    title: '7. Conectores y construcción de textos',
    summary: 'Une ideas con conectores y controla la posición del verbo en coordinadas y subordinadas.',
    lessons: [
      {
        id: 'coordinating-connectors',
        title: 'Und, aber, oder, denn y sondern',
        explanation: 'Los conectores coordinantes unen elementos u oraciones principales. Und, aber, oder, denn y sondern no envían el verbo conjugado al final de la oración que sigue.',
        rules: [
          'Und (y), aber (pero), oder (o), denn (porque) coordinan; cada oración principal conserva verbo en segunda posición.',
          'Sondern («sino») corrige una negación y normalmente va después de nicht/kein.',
          'Con «denn», el verbo mantiene orden principal; con «weil», el verbo va al final.',
        ],
        examples: [
          { german: 'Ich lerne Deutsch und meine Schwester lernt Französisch.', spanish: 'Aprendo alemán y mi hermana aprende francés.' },
          { german: 'Er bleibt zu Hause, denn er ist krank.', spanish: 'Se queda en casa porque está enfermo.' },
          { german: 'Sie fährt nicht mit dem Bus, sondern mit dem Zug.', spanish: 'No va en autobús, sino en tren.' },
        ],
        table: { columns: ['Conector', 'Función', 'Posición del verbo'], rows: [['und', 'adición', 'segunda posición'], ['aber', 'contraste', 'segunda posición'], ['oder', 'alternativa', 'segunda posición'], ['denn', 'causa', 'segunda posición'], ['sondern', 'corrección tras negación', 'segunda posición']] },
        exercises: [
          exercise('denn-order', 'Completa: «Ich gehe früh, denn ich ___ morgen arbeiten.»', ['muss', 'müssen', 'zu muss'], 'muss', '«Denn» une dos oraciones principales: el verbo conjugado «muss» permanece en segunda posición.', 'denn'),
          exercise('sondern-negation', 'Completa: «Nicht heute, ___ morgen.»', ['sondern', 'aber', 'weil'], 'sondern', '«Sondern» corrige una idea negada: no hoy, sino mañana.', 'sondern'),
        ],
      },
      {
        id: 'subordinating-connectors',
        title: 'Dann, bevor, nachdem, weil, dass, wenn y obwohl',
        explanation: 'Los conectores temporales y subordinantes expresan secuencia, causa, contenido, condición o contraste. En una subordinada introducida por bevor, nachdem, weil, dass, wenn o obwohl, el verbo conjugado va al final.',
        rules: [
          'Dann y danach conectan secuencias en una oración principal: «Danach gehen wir nach Hause».',
          'Bevor (antes de que) y nachdem (después de que) introducen subordinadas temporales.',
          'Weil (porque), dass (que), wenn (si/cuando) y obwohl (aunque) envían el verbo al final.',
          'Si la subordinada va primero, el verbo de la principal aparece inmediatamente después de la coma.',
        ],
        examples: [
          { german: 'Ich rufe dich an, bevor ich losfahre.', spanish: 'Te llamo antes de salir.' },
          { german: 'Nachdem sie gegessen hatte, ging sie spazieren.', spanish: 'Después de haber comido, salió a pasear.' },
          { german: 'Obwohl es regnet, gehen wir spazieren.', spanish: 'Aunque llueve, salimos a pasear.' },
          { german: 'Ich glaube, dass der Zug pünktlich ist.', spanish: 'Creo que el tren llega a tiempo.' },
        ],
        table: { columns: ['Conector', 'Significado', 'Ejemplo de subordinada'], rows: [['weil', 'porque', '…, weil ich heute arbeite.'], ['dass', 'que', '…, dass sie morgen kommt.'], ['wenn', 'si / cuando', '…, wenn du Zeit hast.'], ['obwohl', 'aunque', '…, obwohl es spät ist.'], ['bevor/nachdem', 'antes/después de que', '…, bevor der Film beginnt.']] },
        exercises: [
          exercise('weil-final', 'Completa: «Ich bleibe zu Hause, weil ich krank ___.»', ['bin', 'ich bin', 'sein'], 'bin', '«Weil» introduce una subordinada; el verbo conjugado «bin» va al final.', 'weil'),
          exercise('obwohl-inversion', 'Completa: «Obwohl er müde ist, ___ er weiter.»', ['arbeitet', 'er arbeitet', 'zu arbeitet'], 'arbeitet', 'Cuando la subordinada con «obwohl» ocupa el primer lugar, el verbo de la oración principal va inmediatamente después de la coma.', 'obwohl'),
        ],
      },
    ],
  },
  {
    id: 'theory-everyday',
    level: 'B2',
    title: '8. Vocabulario y situaciones cotidianas',
    summary: 'Integra lo aprendido en conversaciones sobre identidad, familia, compras, transporte, estudio y trabajo.',
    lessons: [
      {
        id: 'everyday-conversations',
        title: 'Presentarse, familia y rutinas',
        explanation: 'En una conversación real, combina frases de presentación con preguntas de seguimiento. Los posesivos y verbos en presente ayudan a hablar de familia, costumbres y vida diaria.',
        rules: [
          'Presentación: nombre, origen, lugar de residencia y lenguas que hablas.',
          'Para hábitos usa Präsens y expresiones como jeden Tag (cada día), morgens (por las mañanas) y normalerweise (normalmente).',
          'La familia se describe con posesivos: mein Bruder, meine Schwester, unsere Eltern.',
        ],
        examples: [
          { german: 'Ich heiße Nora und wohne mit meiner Familie in Hamburg.', spanish: 'Me llamo Nora y vivo con mi familia en Hamburgo.' },
          { german: 'Morgens frühstücke ich mit meinem Bruder.', spanish: 'Por las mañanas desayuno con mi hermano.' },
          { german: 'Was machst du normalerweise am Wochenende?', spanish: '¿Qué haces normalmente el fin de semana?' },
        ],
        table: { columns: ['Situación', 'Frase útil', 'Traducción'], rows: [['Presentarse', 'Ich komme aus…', 'Soy de…'], ['Familia', 'Das ist meine Schwester.', 'Esta es mi hermana.'], ['Rutina', 'Ich stehe um sieben Uhr auf.', 'Me levanto a las siete.']] },
        exercises: [
          exercise('family-mein', 'Completa: «Das ist ___ Bruder.»', ['mein', 'meine', 'meinen'], 'mein', '«Bruder» es masculino nominativo; el posesivo correcto es «mein Bruder».', 'familia'),
          exercise('routine-separable', 'Completa: «Ich ___ um sechs Uhr ___.» (me levanto)', ['stehe … auf', 'aufstehe … —', 'stehen … auf'], 'stehe … auf', '«Aufstehen» es separable; el prefijo «auf» va al final de la oración principal.', 'rutina'),
        ],
      },
      {
        id: 'everyday-services',
        title: 'Comida, compras, direcciones, estudios y trabajo',
        explanation: 'En situaciones cotidianas, las peticiones corteses usan können o möchten. Para pedir y orientarte, combina preguntas claras con vocabulario de transporte, estudio y trabajo.',
        rules: [
          'Petición cortés: «Ich möchte…» o «Könnten Sie mir helfen?»',
          'Direcciones: geradeaus (todo recto), links (izquierda), rechts (derecha), an der Kreuzung (en el cruce).',
          'En una situación formal, usa Sie y el verbo en tercera persona plural: «Haben Sie…?»',
        ],
        examples: [
          { german: 'Ich möchte ein Brot und einen Apfelsaft, bitte.', spanish: 'Quisiera un pan y un zumo de manzana, por favor.' },
          { german: 'Können Sie mir den Weg zum Bahnhof erklären?', spanish: '¿Puede explicarme el camino a la estación?' },
          { german: 'Ich studiere Informatik und arbeite nebenbei in einem Büro.', spanish: 'Estudio informática y además trabajo en una oficina.' },
        ],
        table: { columns: ['Necesidad', 'Expresión', 'Traducción'], rows: [['Comprar', 'Wie viel kostet das?', '¿Cuánto cuesta?'], ['Transporte', 'Wann fährt der nächste Zug?', '¿Cuándo sale el próximo tren?'], ['Estudio', 'Ich habe eine Frage zur Aufgabe.', 'Tengo una pregunta sobre el ejercicio.'], ['Trabajo', 'Ich bin für das Projekt verantwortlich.', 'Soy responsable del proyecto.']] },
        exercises: [
          exercise('polite-request', '¿Qué frase pide ayuda formalmente?', ['Könnten Sie mir helfen?', 'Hilf mir!', 'Du musst helfen.'], 'Könnten Sie mir helfen?', '«Könnten Sie…?» es una pregunta formal y cortés con el pronombre Sie.', 'peticiones'),
          exercise('direction-left', '¿Qué significa «links» al dar una dirección?', ['A la izquierda', 'A la derecha', 'Todo recto'], 'A la izquierda', '«Links» es la dirección izquierda; «rechts» significa derecha y «geradeaus», todo recto.', 'direcciones'),
        ],
      },
    ],
  },
];
