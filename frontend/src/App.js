import React, { useState, useEffect } from 'react';

// Datos de senderos y destinos turísticos de Tierra del Fuego
// Se ha añadido un campo 'gpx_url' para simular la descarga de tracks GPX
const senderosData = [
  {
    name: "Castorera",
    difficulty: "Baja",
    distance: "200 mts",
    duration: "20 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Cartelería interpretativa. Tramo adaptado para movilidad reducida.",
    gpx_url: "/tracks/castorera.gpx", // URL actualizada para archivo local
  },
  {
    name: "La Baliza",
    difficulty: "Baja",
    distance: "1.2 km",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Marca límite con Reserva Natural Estricta (RNE).",
    gpx_url: "/tracks/la_baliza.gpx", // URL actualizada
  },
  {
    name: "Mirador Lapataia",
    difficulty: "Baja",
    distance: "980 mts",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Transita bosque y turbal.",
    gpx_url: "/tracks/mirador_lapataia.gpx", // URL actualizada
  },
  {
    name: "Paseo de la Isla",
    difficulty: "Baja",
    distance: "1.3 km",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Transita ambiente costero y bosque.",
    gpx_url: "/tracks/paseo_de_la_isla.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Senda del Turbal",
    difficulty: "Baja",
    distance: "1.35 km",
    duration: "40 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Comparte estacionamiento y primer tramo con Mirador Lapataia.",
    gpx_url: "/tracks/senda_del_turbal.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Cascada Río Pipo",
    difficulty: "Baja",
    distance: "900 mts (ida)",
    duration: "15 min (ida)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Nace en Campamento Río Pipo.",
    gpx_url: "/tracks/cascada_rio_pipo.gpx", // URL actualizada
  },
  {
    name: "Laguna Negra - Parque Nacional",
    difficulty: "Baja",
    distance: "N/A",
    duration: "15 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Habilitado",
    notes: "Sendero señalizado.",
    gpx_url: "/tracks/laguna_negra_pn.gpx", // URL actualizada
  },
  {
    name: "Hito XXIV",
    difficulty: "Media",
    distance: "3.5 km (ida)",
    duration: "3 hs (ida y vuelta)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Requiere mínimo entrenamiento físico.",
    gpx_url: "/tracks/hito_xxiv.gpx", // URL actualizada
  },
  {
    name: "Senda Costera",
    difficulty: "Media",
    distance: "8 km (cada tramo)",
    duration: "4 hs (cada tramo)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Nace en Ensenada Zaratiegui.",
    gpx_url: "/tracks/senda_costera.gpx", // URL actualizada
  },
  {
    name: "Senda Pampa Alta",
    difficulty: "Media",
    distance: "4.7 km (cada tramo)",
    duration: "2 hs (cada tramo)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Va de Ensenada a Río Pipo.",
    gpx_url: "/tracks/senda_pampa_alta.gpx", // URL actualizada
  },
  {
    name: "Cerro Guanaco",
    difficulty: "Alta",
    distance: "6 km (ida)",
    duration: "4 hs (hasta cumbre)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Horario máximo de ingreso: 12:30 hs. Requiere registro previo obligatorio (Alakush o virtual). Apto para entrenados.",
    gpx_url: "/tracks/cerro_guanaco.gpx", // URL actualizada
  },
  {
    name: "Laguna del Caminante",
    difficulty: "Alta",
    distance: "N/A",
    duration: "N/A",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Condicionado a clima",
    notes: "Requiere registro previo obligatorio. Se recomienda ingreso/egreso por cañadón de Oveja.",
    gpx_url: "/tracks/laguna_del_caminante.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Cerro Michi",
    difficulty: "Alta",
    distance: "N/A",
    duration: "5 h",
    location: "Tolhuin",
    seasonal_availability: "Todo el año", // Asumiendo disponibilidad general
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "/tracks/cerro_michi.gpx", // URL actualizada
  },
  {
    name: "Monte Susana",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año", // Asumiendo disponibilidad general
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/monte_susana.gpx", // URL actualizada
  },
  {
    name: "Estancia Túnel",
    difficulty: "Baja",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "/tracks/estancia_tunel.gpx", // URL actualizada
  },
  {
    name: "Humedales",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h 30 min",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "/tracks/humedales.gpx", // URL actualizada
  },
  {
    name: "Laguna Encantada",
    difficulty: "Media",
    distance: "N/A",
    duration: "5 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "/tracks/laguna_encantada.gpx", // URL actualizada
  },
  {
    name: "Mirador del Valle de Andorra",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "/tracks/mirador_del_valle_de_andorra.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Mirador Cabo San Pablo",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado. Sendero al Faro San Pablo de baja dificultad.",
    gpx_url: "/tracks/mirador_cabo_san_pablo.gpx", // URL actualizada
  },
  {
    name: "Glaciar Vinciguerra",
    difficulty: "Media",
    distance: "N/A",
    duration: "9 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/glaciar_vinciguerra.gpx", // URL actualizada
  },
  {
    name: "La Ruca",
    difficulty: "Baja",
    distance: "N/A",
    duration: "40 min",
    location: "Tolhuin",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "/tracks/la_ruca.gpx", // URL actualizada
  },
  {
    name: "Laguna Negra (Provincial)",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h",
    location: "Tolhuin",
    seasonal_availability: "Todo el año",
    notes: "Bien señalizado con cartelería informativa. Sendero interpretativo 'Paisaje en Movimiento' de baja dificultad.",
    gpx_url: "/tracks/laguna_negra_provincial.gpx", // URL actualizada
  },
  {
    name: "Mirador-Reserva del Glaciar Martial",
    difficulty: "Alta",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/mirador_reserva_del_glaciar_martial.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Filo-Reserva del Glaciar Martial",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "/tracks/filo_reserva_del_glaciar_martial.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Cascada Beban",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Ubicado a 17 km de Ushuaia.",
    gpx_url: "/tracks/cascada_beban.gpx", // URL actualizada
  },
  {
    name: "Laguna Esmeralda",
    difficulty: "Media",
    distance: "N/A",
    duration: "5 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año", // Puede hacerse en invierno con raquetas
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/laguna_esmeralda.gpx", // URL actualizada
  },
  {
    name: "Laguna Turquesa",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/laguna_turquesa.gpx", // URL actualizada
  },
  {
    name: "Cascada y Laguna Submarino ARA San Juan",
    difficulty: "Media",
    distance: "N/A",
    duration: "7 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/cascada_y_laguna_submarino_ara_san_juan.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Lagunas de los Perros y Laguna Fiel",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "/tracks/lagunas_de_los_perros_y_laguna_fiel.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Laguna de los Patos (Provincial)",
    difficulty: "Baja",
    distance: "N/A",
    duration: "20 min",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Bien demarcado con cartelería informativa. Ideal para observación de aves.",
    gpx_url: "/tracks/laguna_de_los_patos_provincial.gpx", // URL actualizada (nombre de archivo consistente)
  },
  {
    name: "Punta Popper",
    difficulty: "Baja",
    distance: "N/A",
    duration: "30 min",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "/tracks/punta_popper.gpx", // URL actualizada
  },
];

const destinationsData = [
  {
    name: "Ushuaia",
    type: "Ciudad",
    description: "La capital provincial, punto de partida esencial para explorar la región, combinando la mística de su ubicación austral con una rica oferta cultural y natural.",
    attractions: [
      "Museo del Fin del Mundo (MFM)",
      "Museo Marítimo y Ex Presidio de Ushuaia",
      "Antigua Casa de Gobierno",
      "Casa Ramos",
      "Parque Nacional Tierra del Fuego",
      "Tren del Fin del Mundo",
      "Glaciar Martial",
      "Bahía Lapataia",
      "Mirador Isla Redonda",
      "Navegaciones por el Canal Beagle",
      "Observación de aves",
      "Esquí (alpino, de fondo, travesía)",
      "Snowboard",
      "Motos de nieve",
      "Trineos con perros",
    ],
  },
  {
    name: "Tolhuin",
    type: "Ciudad",
    description: "Ubicada en el centro de la isla, conocida como la 'región de los lagos' y el 'corazón de la isla', ofreciendo un contraste paisajístico de lagos y bosques fueguinos.",
    attractions: [
      "Lago Khami (Fagnano)",
      "Cerro Jeujepen",
      "Reserva Provincial Río Valdez",
      "Reserva Provincial Laguna Negra",
      "Reserva Provincial Corazón de la Isla",
      "Reserva Natural Protegida Desembocadura Río Turbio",
      "Museo Histórico Khami",
      "Casa de la Cultura",
      "Senderismo y trekking",
      "Observación de aves",
      "Pesca deportiva",
      "Canotaje y kayakismo",
      "Cabalgatas",
      "Mountain bike",
      "Excursiones en 4x4",
    ],
  },
  {
    name: "Río Grande",
    type: "Ciudad",
    description: "En el noreste de la isla, reconocida internacionalmente por la pesca de truchas y ofrece una rica historia ligada a las Islas Malvinas y el turismo rural.",
    attractions: [
      "Ríos para Pesca deportiva",
      "Cabo San Pablo (con buque Desdémona)",
      "Cabo Domingo",
      "Reserva Natural Urbana Laguna de los Patos",
      "Reserva Natural Punta Popper",
      "Reserva Provincial Costa Atlántica",
      "Museo Regional Monseñor Fagnano",
      "Museo Municipal Virginia Choquintel",
      "Museo Fueguino de Arte",
      "Museo Malvinas Argentinas",
      "Misión Salesiana",
      "Estancia María Behety",
      "Turismo rural",
      "Cabalgatas",
      "Circuitos históricos y culturales",
    ],
  },
];

// Datos específicos para Museos
const museumsData = [
  {
    name: "Museo del Fin del Mundo (MFM)",
    location: "Ushuaia",
    address: "Av. Maipú 173 (principal); Maipú 465 (anexo, Antigua Casa de Gobierno)",
    hours: "Lun-Vie: 10:00-19:00 hs; Sáb: 13:00-19:00 hs; Dom/Feriados: Cerrado",
    fees: "Extranjeros: $7000; Argentinos: $4000; Estudiantes/Docentes/Jubilados Arg: $2000; Menores 14, Discapacitados, Ex Combatientes, Residentes TDF: GRATIS. Pago solo digital desde Oct 2024.",
    description: "Historia de TDF, pueblos nativos, expediciones, naufragios, aves. Entrada válida por 3 días para ambas sedes.",
  },
  {
    name: "Museo Marítimo y Ex Presidio de Ushuaia",
    location: "Ushuaia",
    address: "Yaganes y Gobernador Paz",
    hours: "Todos los días: 10:00-20:00 hs (admisión hasta 19:30 hs)",
    fees: "Adultos: $36.000; Ticket Familiar: $90.000; Estudiantes: $28.000; Docentes/Jubilados Arg: $28.000; Menores 12: GRATIS. Residentes TDF: Adultos $33.000, Estudiantes $13.500, Menores 12 GRATIS. Martes, Jueves, Sábados: GRATIS para residentes TDF.",
    description: "Historia de la colonia penal, pabellones históricos, exploraciones marítimas, pueblos nativos. Visitas guiadas (11:30, 18:30 hs) y teatralizadas (Lun, Mié, Vie 20:00 hs). Entrada válida por 2 días.",
  },
  {
    name: "Antigua Casa de Gobierno",
    location: "Ushuaia",
    address: "Maipú 465 (anexo MFM)",
    hours: "Lun-Vie: 10:00-17:00 hs; Sáb/Feriados: 13:00-17:00 hs",
    fees: "Incluida con entrada MFM.",
    description: "Primera sede del gobierno territorial y legislatura. Monumento Histórico Nacional. Visitas guiadas (13:30 hs).",
  },
  {
    name: "Casa Ramos",
    location: "Ushuaia",
    address: "Av. Maipú Nº 363",
    hours: "Lun-Dom: 09:00-24:00 hs",
    fees: "N/A (Funciona como restaurante/almacén)",
    description: "Monumento Histórico Nacional. Construida con maderas del presidio. Considerado un 'museo vivo'.",
  },
  {
    name: "Museo Regional Monseñor Fagnano",
    location: "Río Grande",
    address: "Ruta Nac. Nº3, Km 2835",
    hours: "Lun-Vie: 15:00-17:45 hs; Sáb/Dom: 09:00-12:30 hs y 15:00-19:00 hs",
    fees: "Arg: $300; Ext: $800 (Marzo 2022).",
    description: "Historia de la Orden Salesiana, tribus nativas. Capilla histórica de la Candelaria. Monumento Histórico Nacional.",
  },
  {
    name: "Museo Municipal Virginia Choquintel",
    location: "Río Grande",
    address: "Alberdi 555",
    hours: "Lun-Vie: 09:00-17:00 hs; Sáb/Dom: 15:00-18:00 hs",
    fees: "Libre y gratuita.",
    description: "Historia del norte de la isla, industrias, cultura aborigen, fauna y flora. Sala de arte, microcine, biblioteca.",
  },
  {
    name: "Museo Fueguino de Arte",
    location: "Río Grande",
    address: "Centro Cultural Yaganes",
    hours: "Lun-Vie: 11:00-18:00 hs; Sáb: 15:00-19:00 hs (datos 2018)",
    fees: "Libre y gratuita.",
    description: "Resguarda la Colección Provincial de Arte. Exhibiciones de fotografía, pintura y obras de artistas locales/nacionales.",
  },
  {
    name: "Museo Malvinas Argentinas (Salón de Exposición Malvinas en la Memoria)",
    location: "Río Grande",
    address: "Centro de ex-combatientes",
    hours: "Mié-Vie: 09:00-17:00 hs; Sáb/Dom: 11:00-18:00 hs. Horario especial 2 de abril.",
    fees: "Gratuita.",
    description: "Recorrido por el conflicto de Malvinas, exposición de material bélico.",
  },
  {
    name: "Misión Salesiana",
    location: "Río Grande",
    address: "N/A",
    hours: "Lun-Vie: 13:00-18:00 hs (museo)",
    fees: "N/A",
    description: "Monumento Histórico Nacional. Exhibe objetos nativos y personales de la Misión.",
  },
];

// Datos específicos para Deportes de Invierno
const winterSportsData = [
  {
    location: "Ushuaia",
    activities: [
      "Esquí alpino",
      "Esquí de fondo",
      "Esquí de travesía",
      "Snowboard",
      "Motos de nieve",
      "Trineos con perros",
      "Bicicletas sobre hielo",
      "Patinaje sobre hielo",
      "Raquetas de nieve"
    ],
    notes: "Ushuaia es un destino clave para deportes de nieve, con opciones en centros de montaña como el Glaciar Martial y valles cercanos."
  },
  // Aunque no se mencionan explícitamente otros centros en Tolhuin o Río Grande para deportes de invierno,
  // la información general de la provincia sugiere que Ushuaia es el principal polo.
  // Podríamos añadir más si se especificaran en la investigación.
];

// Datos específicos para Naturaleza (Flora y Fauna)
const natureData = [
  {
    ecosystem: "Bosques Subantárticos",
    flora: "Lenga, Ñire",
    fauna: "Carpintero Gigante (Campephilus magellanicus), Rayadito (Aphrastura spinicauda), Picolezna Patagónico (Pygarrhichas albogularis), Zorzal Patagónico (Turdus flacklandii), Zorro Colorado, Guanaco, Cóndor.",
    notes: "Característicos de las zonas montañosas y valles."
  },
  {
    ecosystem: "Turbales (Humedales)",
    flora: "Musgos, plantas acuáticas",
    fauna: "Diversas especies de aves acuáticas y migratorias.",
    notes: "Ecosistemas de gran valor ambiental, importantes para la biodiversidad."
  },
  {
    ecosystem: "Costa Marina y Lagos",
    flora: "Pastizales costeros",
    fauna: "Aves marinas y costeras, fauna marina (observación de lobos marinos, pingüinos en Isla Martillo).",
    notes: "Bahía Lapataia y el Canal Beagle son puntos clave para la observación."
  },
  {
    ecosystem: "Estepa Patagónica (Zona Norte)",
    flora: "Pastizales, arbustos bajos",
    fauna: "Guanacos, Zorros Colorados, Cóndores, diversas aves de estepa (patos, garzas, cauquenes, chorlitos, zorzales).",
    notes: "Paisaje rural con ganado ovino y bovino."
  },
  {
    ecosystem: "General",
    flora: "Flora autóctona variada, adaptada al clima austral.",
    fauna: "Fauna autóctona diversa, incluyendo aves migratorias que utilizan la región como zona de invernada.",
    notes: "La provincia es parte de la Red Hemisférica de Reservas para Aves Playeras."
  }
];

// Datos específicos para Pesca
const fishingData = [
  {
    location: "Río Grande",
    type: "Río/Mar",
    species: "Salmónidos (truchas, especialmente trucha marrón)",
    notes: "Considerada la meca de la pesca deportiva de salmónidos a nivel internacional. Se practica en ríos como el Río Grande. Es fundamental conocer y respetar las regulaciones locales de pesca, que incluyen licencias, temporadas, límites de captura y modalidades permitidas para evitar infracciones. La pesca es generalmente con devolución obligatoria en muchos sectores."
  },
  {
    location: "Tolhuin",
    type: "Lago/Río",
    species: "Salmónidos (truchas)",
    notes: "Los lagos como el Lago Khami (Fagnano), Yehuin, Yakush y Chepelmut, así como ríos, ofrecen oportunidades para la pesca deportiva. Al igual que en Río Grande, es crucial informarse sobre las regulaciones específicas de cada cuerpo de agua y las temporadas de pesca."
  },
  {
    location: "Ushuaia y alrededores",
    type: "Río/Lago/Mar",
    species: "Salmónidos (truchas), especies marinas",
    notes: "Aunque menos prominente que en Río Grande, también hay opciones de pesca deportiva en ríos y lagos cercanos. La pesca en el Canal Beagle puede incluir especies marinas."
  },
  {
    location: "General (Toda la Provincia)",
    type: "Regulaciones",
    species: "N/A",
    notes: "La pesca deportiva en Tierra del Fuego está estrictamente regulada para la conservación de las especies. Es OBLIGATORIO obtener una licencia de pesca provincial. Las temporadas de pesca varían según la especie y el cuerpo de agua (generalmente de noviembre a abril para salmónidos, pero verificar fechas exactas cada año). Se deben respetar los límites de captura, tamaños mínimos y la modalidad de pesca (ej. mosca, spinning). La pesca con devolución es común y fomentada. Consultar las normativas del Instituto Fueguino de Turismo (INFUETUR) o las autoridades de fauna para la información más actualizada y evitar infracciones."
  }
];


const App = () => {
  const [currentView, setCurrentView] = useState('mainMenu'); // Estado para controlar la vista actual

  // Estados para los filtros seleccionados (solo relevantes para Senderismo)
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [plannedDate, setPlannedDate] = useState('');

  // Estados para los resultados filtrados (solo relevantes para Senderismo)
  const [filteredSenderos, setFilteredSenderos] = useState([]);

  // Opciones para los selectores
  const difficulties = ['Baja', 'Media', 'Alta'];
  const locations = [
    'Parque Nacional Tierra del Fuego',
    'Ushuaia',
    'Tolhuin',
    'Río Grande',
  ];
  const durations = ['Corta (menos de 1h)', 'Media (1h - 4h)', 'Larga (más de 4h)'];
  const seasons = ['Verano (Dic-Feb)', 'Otoño (Mar-May)', 'Invierno (Jun-Ago)', 'Primavera (Sep-Nov)'];

  // Función para normalizar la duración a minutos para comparación
  const getDurationInMinutes = (durationStr) => {
    if (!durationStr || durationStr === 'N/A') return Infinity;

    // Convertir a minutos para facilitar la comparación
    if (durationStr.includes('min')) {
      return parseInt(durationStr.replace(' min', '').trim());
    } else if (durationStr.includes('hs') || durationStr.includes('h')) {
      return parseInt(durationStr.replace(' hs', '').replace(' h', '').trim()) * 60;
    }
    return Infinity;
  };

  // Función para verificar la disponibilidad estacional de un sendero
  const isSenderoAvailable = (sendero, date, season) => {
    const availability = sendero.seasonal_availability;

    // Priorizar la fecha planificada si está seleccionada
    if (date) {
      const plannedMonth = new Date(date).getMonth(); // 0-11 (Enero-Diciembre)

      if (availability === "Todo el año" || availability === "Habilitado") {
        return true;
      } else if (availability === "Noviembre a Abril") {
        // Nov (10), Dic (11), Ene (0), Feb (1), Mar (2), Abr (3)
        return (plannedMonth >= 10 || plannedMonth <= 3);
      } else if (availability === "Condicionado a clima") {
        return true; // Asumir que el usuario verificará las condiciones
      }
      return false;
    }

    // Si no hay fecha, usar la estación seleccionada
    if (season) {
      const [seasonName] = season.split(' ');
      switch (seasonName) {
        case 'Verano': // Dic-Feb
          return availability.includes("Todo el año") || availability.includes("Noviembre a Abril") || availability.includes("Habilitado");
        case 'Otoño': // Mar-May
          return availability.includes("Todo el año") || availability.includes("Noviembre a Abril") || availability.includes("Habilitado");
        case 'Invierno': // Jun-Ago
          return availability.includes("Todo el año") || availability.includes("Habilitado");
        case 'Primavera': // Sep-Nov
          return availability.includes("Todo el año") || availability.includes("Noviembre a Abril") || availability.includes("Habilitado");
        default:
          return true;
      }
    }

    return true; // Si no hay filtros de fecha/estación, mostrar todos
  };

  // Efecto para filtrar los datos de senderos cuando cambian los filtros
  useEffect(() => {
    let tempSenderos = senderosData;

    if (selectedDifficulty) {
      tempSenderos = tempSenderos.filter(
        (sendero) => sendero.difficulty === selectedDifficulty
      );
    }
    if (selectedLocation) {
      tempSenderos = tempSenderos.filter(
        (sendero) => sendero.location === selectedLocation
      );
    }
    if (selectedDuration) {
      tempSenderos = tempSenderos.filter((sendero) => {
        const senderoDuration = getDurationInMinutes(sendero.duration);
        if (selectedDuration === 'Corta (menos de 1h)') {
          return senderoDuration < 60;
        } else if (selectedDuration === 'Media (1h - 4h)') {
          return senderoDuration >= 60 && senderoDuration <= 240;
        } else if (selectedDuration === 'Larga (más de 4h)') {
          return senderoDuration > 240;
        }
        return true;
      });
    }

    tempSenderos = tempSenderos.filter(sendero =>
      isSenderoAvailable(sendero, plannedDate, selectedSeason)
    );

    setFilteredSenderos(tempSenderos);
  }, [selectedDifficulty, selectedLocation, selectedDuration, selectedSeason, plannedDate]);

  // Función para reiniciar los filtros de senderismo
  const resetSenderismoFilters = () => {
    setSelectedDifficulty('');
    setSelectedLocation('');
    setSelectedDuration('');
    setSelectedSeason('');
    setPlannedDate('');
  };

  // Función para manejar la descarga del GPX (simulada)
  const handleDownloadGpx = (senderoName, gpxUrl) => {
    if (gpxUrl) {
      const link = document.createElement('a');
      link.href = gpxUrl;
      link.setAttribute('download', `${senderoName.replace(/\s/g, '_').toLowerCase()}.gpx`); // Asegura un nombre de archivo consistente
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`Simulando descarga de GPX para: ${senderoName} desde ${gpxUrl}`);
    } else {
      console.warn(`No hay URL GPX disponible para ${senderoName}`);
      alert(`Actualmente no hay un track GPX disponible para ${senderoName}.`);
    }
  };

  // Función para obtener recomendaciones de seguridad
  const getSafetyRecommendations = () => {
    let recommendations = [];
    if (selectedDifficulty === 'Alta') {
      recommendations.push(
        'Para senderos de alta dificultad, el registro previo obligatorio es crucial. Asegúrate de hacerlo en el Centro de Visitantes Alakush o de forma virtual.'
      );
      recommendations.push(
        'Se recomienda contratar excursiones con operadores turísticos habilitados para senderos de alta dificultad.'
      );
    }
    if (selectedDifficulty === 'Media' || selectedDifficulty === 'Alta') {
      recommendations.push(
        'Siempre ve acompañado. Nunca realices caminatas en solitario.'
      );
      recommendations.push(
        'Vístete en capas con ropa impermeable y térmica. Usa calzado adecuado para trekking (impermeable y con buen agarre).'
      );
      recommendations.push(
        'Lleva un botiquín de primeros auxilios, ropa de repuesto, silbato, linterna, mapa/GPS, y suficiente comida y agua.'
      );
    }
    recommendations.push(
      'El clima en Tierra del Fuego es muy cambiante. Verifica las condiciones meteorológicas antes de salir y prepárate para cambios bruscos.'
    );
    recommendations.push(
      'Sal temprano por la mañana para aprovechar la luz del día y finaliza las actividades antes del anochecer.'
    );
    recommendations.push(
      'En caso de emergencia, llama al 103.'
    );
    recommendations.push(
      'Solo se permite hacer fuego en lugares habilitados y con artefactos aprobados. Consulta el Índice Diario de Peligro de Incendio.'
    );

    return recommendations;
  };

  // Componente para el Menú Principal
  const MainMenu = () => {
    // URL de la imagen de fondo única.
    // Coloca tu imagen de paisaje de Tierra del Fuego, por ejemplo, 'paisaje-tdf.jpg',
    // dentro de la carpeta 'frontend/public/' de tu proyecto.
    const backgroundImageUrl = 'data:image/jpeg;base64,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'; // Placeholder example
    // const backgroundImageUrl = '/paisaje-tdf.jpg'; // Ejemplo de cómo la referenciarías

    return (
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl max-w-4xl w-full text-center z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Sistema Experto de Senderismo y Turismo en Tierra del Fuego
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Descubre los senderos y atractivos turísticos de Tierra del Fuego.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => setCurrentView('senderismo')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Senderismo
            </button>
            <button
              onClick={() => setCurrentView('destinos')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Destinos Turísticos
            </button>
            <button
              onClick={() => setCurrentView('museos')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Museos
            </button>
            <button
              onClick={() => setCurrentView('deportesInvierno')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Deportes de Invierno
            </button>
            <button
              onClick={() => setCurrentView('floraFauna')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Flora y Fauna
            </button>
            <button
              onClick={() => setCurrentView('pesca')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Pesca Deportiva
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Senderismo
  const SenderismoView = () => {
    const safetyRecommendations = getSafetyRecommendations();

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Senderismo en Tierra del Fuego
          </h2>

          {/* Filtros de senderismo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-4 bg-blue-50 rounded-lg shadow-inner">
            <div>
              <label htmlFor="difficulty" className="block text-gray-700 text-sm font-bold mb-2">Dificultad:</label>
              <select
                id="difficulty"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">Todas</option>
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Ubicación:</label>
              <select
                id="location"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Todas</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duración estimada:</label>
              <select
                id="duration"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <option value="">Cualquiera</option>
                {durations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="plannedDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha Planificada:</label>
              <input
                type="date"
                id="plannedDate"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={plannedDate}
                onChange={(e) => {
                  setPlannedDate(e.target.value);
                  setSelectedSeason(''); // Limpiar selección de estación si se elige una fecha
                }}
              />
            </div>
             <div>
              <label htmlFor="season" className="block text-gray-700 text-sm font-bold mb-2">Estación del Año:</label>
              <select
                id="season"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedSeason}
                onChange={(e) => {
                  setSelectedSeason(e.target.value);
                  setPlannedDate(''); // Limpiar selección de fecha si se elige una estación
                }}
              >
                <option value="">Cualquiera</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center mt-4">
              <button
                onClick={resetSenderismoFilters}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Recomendaciones de Seguridad */}
          {safetyRecommendations.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-8 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Recomendaciones de Seguridad:</h3>
              <ul className="list-disc list-inside">
                {safetyRecommendations.map((rec, index) => (
                  <li key={index} className="mb-1">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}


          {/* Lista de senderos filtrados */}
          {filteredSenderos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSenderos.map((sendero, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {sendero.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Dificultad:</span>{' '}
                    {sendero.difficulty}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Distancia:</span>{' '}
                    {sendero.distance}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Duración:</span>{' '}
                    {sendero.duration}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Ubicación:</span>{' '}
                    {sendero.location}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Disponibilidad Estacional:</span>{' '}
                    {sendero.seasonal_availability}
                  </p>
                  {sendero.notes && (
                    <p className="text-gray-600 italic mb-2">
                      <span className="font-medium">Notas:</span>{' '}
                      {sendero.notes}
                    </p>
                  )}
                  {sendero.gpx_url && (
                    <button
                      onClick={() => handleDownloadGpx(sendero.name, sendero.gpx_url)}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Descargar GPX
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No se encontraron senderos con los filtros seleccionados.
            </p>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Destinos Turísticos
  const DestinosView = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Destinos Turísticos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinationsData.map((destination, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {destination.name} ({destination.type})
                </h3>
                <p className="text-gray-700 mb-4">{destination.description}</p>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Atracciones:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {destination.attractions.map((attraction, i) => (
                    <li key={i}>{attraction}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Museos
  const MuseosView = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Museos en Tierra del Fuego
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {museumsData.map((museum, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {museum.name}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Ubicación:</span>{' '}
                  {museum.location}
                </p>
                {museum.address && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Dirección:</span>{' '}
                    {museum.address}
                  </p>
                )}
                {museum.hours && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Horarios:</span>{' '}
                    {museum.hours}
                  </p>
                )}
                {museum.fees && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Entrada:</span>{' '}
                    {museum.fees}
                  </p>
                )}
                <p className="text-gray-600 italic mt-2">
                  <span className="font-medium">Descripción:</span>{' '}
                  {museum.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Deportes de Invierno
  const DeportesInviernoView = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Deportes de Invierno en Tierra del Fuego
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {winterSportsData.map((sport, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ubicación: {sport.location}
                </h3>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Actividades:
                </h4>
                <ul className="list-disc list-inside text-gray-600 mb-2">
                  {sport.activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
                {sport.notes && (
                  <p className="text-gray-600 italic">
                    <span className="font-medium">Notas:</span> {sport.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Flora y Fauna
  const FloraFaunaView = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Flora y Fauna de Tierra del Fuego
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {natureData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ecosistema: {item.ecosystem}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Flora:</span> {item.flora}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Fauna:</span> {item.fauna}
                </p>
                {item.notes && (
                  <p className="text-gray-600 italic mt-2">
                    <span className="font-medium">Notas:</span> {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para la Vista de Pesca
  const PescaView = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Pesca Deportiva en Tierra del Fuego
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fishingData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ubicación: {item.location}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Tipo:</span> {item.type}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Especies:</span> {item.species}
                </p>
                {item.notes && (
                  <p className="text-gray-600 italic mt-2">
                    <span className="font-medium">Notas:</span> {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentView('mainMenu')}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Lógica para renderizar la vista actual
  const renderView = () => {
    switch (currentView) {
      case 'senderismo':
        return <SenderismoView />;
      case 'destinos':
        return <DestinosView />;
      case 'museos':
        return <MuseosView />;
      case 'deportesInvierno':
        return <DeportesInviernoView />;
      case 'floraFauna':
        return <FloraFaunaView />;
      case 'pesca':
        return <PescaView />;
      case 'mainMenu':
      default:
        return <MainMenu />;
    }
  };

  return (
    <div className="App font-sans antialiased">
      {renderView()}
    </div>
  );
};

export default App;
