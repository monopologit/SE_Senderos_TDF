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
    gpx_url: "https://example.com/gpx/castorera.gpx", // URL simulada
  },
  {
    name: "La Baliza",
    difficulty: "Baja",
    distance: "1.2 km",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Marca límite con Reserva Natural Estricta (RNE).",
    gpx_url: "https://example.com/gpx/la_baliza.gpx",
  },
  {
    name: "Mirador Lapataia",
    difficulty: "Baja",
    distance: "980 mts",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Transita bosque y turbal.",
    gpx_url: "https://example.com/gpx/mirador_lapataia.gpx",
  },
  {
    name: "Paseo de la Isla",
    difficulty: "Baja",
    distance: "1.3 km",
    duration: "30 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Transita ambiente costero y bosque.",
    gpx_url: "https://example.com/gpx/paseo_isla.gpx",
  },
  {
    name: "Senda del Turbal",
    difficulty: "Baja",
    distance: "1.35 km",
    duration: "40 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Todo el año",
    notes: "Comparte estacionamiento y primer tramo con Mirador Lapataia.",
    gpx_url: "https://example.com/gpx/senda_turbal.gpx",
  },
  {
    name: "Cascada Río Pipo",
    difficulty: "Baja",
    distance: "900 mts (ida)",
    duration: "15 min (ida)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Nace en Campamento Río Pipo.",
    gpx_url: "https://example.com/gpx/cascada_rio_pipo.gpx",
  },
  {
    name: "Laguna Negra - Parque Nacional",
    difficulty: "Baja",
    distance: "N/A",
    duration: "15 min",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Habilitado",
    notes: "Sendero señalizado.",
    gpx_url: "https://example.com/gpx/laguna_negra_pn.gpx",
  },
  {
    name: "Hito XXIV",
    difficulty: "Media",
    distance: "3.5 km (ida)",
    duration: "3 hs (ida y vuelta)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Requiere mínimo entrenamiento físico.",
    gpx_url: "https://example.com/gpx/hito_xxiv.gpx",
  },
  {
    name: "Senda Costera",
    difficulty: "Media",
    distance: "8 km (cada tramo)",
    duration: "4 hs (cada tramo)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Nace en Ensenada Zaratiegui.",
    gpx_url: "https://example.com/gpx/senda_costera.gpx",
  },
  {
    name: "Senda Pampa Alta",
    difficulty: "Media",
    distance: "4.7 km (cada tramo)",
    duration: "2 hs (cada tramo)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Va de Ensenada a Río Pipo.",
    gpx_url: "https://example.com/gpx/senda_pampa_alta.gpx",
  },
  {
    name: "Cerro Guanaco",
    difficulty: "Alta",
    distance: "6 km (ida)",
    duration: "4 hs (hasta cumbre)",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Noviembre a Abril",
    notes: "Horario máximo de ingreso: 12:30 hs. Requiere registro previo obligatorio (Alakush o virtual). Apto para entrenados.",
    gpx_url: "https://example.com/gpx/cerro_guanaco.gpx",
  },
  {
    name: "Laguna del Caminante",
    difficulty: "Alta",
    distance: "N/A",
    duration: "N/A",
    location: "Parque Nacional Tierra del Fuego",
    seasonal_availability: "Condicionado a clima",
    notes: "Requiere registro previo obligatorio. Se recomienda ingreso/egreso por cañadón de Oveja.",
    gpx_url: "https://example.com/gpx/laguna_caminante.gpx",
  },
  {
    name: "Cerro Michi",
    difficulty: "Alta",
    distance: "N/A",
    duration: "5 h",
    location: "Tolhuin",
    seasonal_availability: "Todo el año", // Asumiendo disponibilidad general
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "https://example.com/gpx/cerro_michi.gpx",
  },
  {
    name: "Monte Susana",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año", // Asumiendo disponibilidad general
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/monte_susana.gpx",
  },
  {
    name: "Estancia Túnel",
    difficulty: "Baja",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "https://example.com/gpx/estancia_tunel.gpx",
  },
  {
    name: "Humedales",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h 30 min",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "https://example.com/gpx/humedales.gpx",
  },
  {
    name: "Laguna Encantada",
    difficulty: "Media",
    distance: "N/A",
    duration: "5 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "https://example.com/gpx/laguna_encantada.gpx",
  },
  {
    name: "Mirador del Valle de Andorra",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "https://example.com/gpx/mirador_andorra.gpx",
  },
  {
    name: "Mirador Cabo San Pablo",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado. Sendero al Faro San Pablo de baja dificultad.",
    gpx_url: "https://example.com/gpx/mirador_cabo_san_pablo.gpx",
  },
  {
    name: "Glaciar Vinciguerra",
    difficulty: "Media",
    distance: "N/A",
    duration: "9 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/glaciar_vinciguerra.gpx",
  },
  {
    name: "La Ruca",
    difficulty: "Baja",
    distance: "N/A",
    duration: "40 min",
    location: "Tolhuin",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "https://example.com/gpx/la_ruca.gpx",
  },
  {
    name: "Laguna Negra (Provincial)",
    difficulty: "Baja",
    distance: "N/A",
    duration: "2 h",
    location: "Tolhuin",
    seasonal_availability: "Todo el año",
    notes: "Bien señalizado con cartelería informativa. Sendero interpretativo 'Paisaje en Movimiento' de baja dificultad.",
    gpx_url: "https://example.com/gpx/laguna_negra_provincial.gpx",
  },
  {
    name: "Mirador-Reserva del Glaciar Martial",
    difficulty: "Alta",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/mirador_glaciar_martial.gpx",
  },
  {
    name: "Filo-Reserva del Glaciar Martial",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "No se comercializa por agencias ni operadores.",
    gpx_url: "https://example.com/gpx/filo_glaciar_martial.gpx",
  },
  {
    name: "Cascada Beban",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año",
    notes: "Ubicado a 17 km de Ushuaia.",
    gpx_url: "https://example.com/gpx/cascada_beban.gpx",
  },
  {
    name: "Laguna Esmeralda",
    difficulty: "Media",
    distance: "N/A",
    duration: "5 h",
    location: "Ushuaia",
    seasonal_availability: "Todo el año", // Puede hacerse en invierno con raquetas
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/laguna_esmeralda.gpx",
  },
  {
    name: "Laguna Turquesa",
    difficulty: "Media",
    distance: "N/A",
    duration: "3 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/laguna_turquesa.gpx",
  },
  {
    name: "Cascada y Laguna Submarino ARA San Juan",
    difficulty: "Media",
    distance: "N/A",
    duration: "7 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/laguna_submarino.gpx",
  },
  {
    name: "Lagunas de los Perros y Laguna Fiel",
    difficulty: "Media",
    distance: "N/A",
    duration: "4 h",
    location: "Ushuaia",
    seasonal_availability: "Noviembre a Abril", // Típicamente estacional
    notes: "Se recomienda contratar excursión con operador o agencia.",
    gpx_url: "https://example.com/gpx/lagunas_perros_fiel.gix",
  },
  {
    name: "Laguna de los Patos (Provincial)",
    difficulty: "Baja",
    distance: "N/A",
    duration: "20 min",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Bien demarcado con cartelería informativa. Ideal para observación de aves.",
    gpx_url: "https://example.com/gpx/laguna_patos_provincial.gpx",
  },
  {
    name: "Punta Popper",
    difficulty: "Baja",
    distance: "N/A",
    duration: "30 min",
    location: "Río Grande",
    seasonal_availability: "Todo el año",
    notes: "Sendero señalizado y habilitado.",
    gpx_url: "https://example.com/gpx/punta_popper.gpx",
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
  const [selectedSeason, setSelectedSeason] = useState(''); // Nuevo estado para la estación
  const [plannedDate, setPlannedDate] = useState(''); // Nuevo estado para la fecha planificada

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
      link.setAttribute('download', `${senderoName.replace(/\s/g, '_')}.gpx`);
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
  const MainMenu = () => (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-blue-800 mb-8">
        Elige tu Aventura en Tierra del Fuego
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => setCurrentView('senderismo')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Senderismo
        </button>
        <button
          onClick={() => setCurrentView('museos')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Museos y Cultura
        </button>
        <button
          onClick={() => setCurrentView('deportesInvierno')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Deportes de Invierno
        </button>
        <button
          onClick={() => setCurrentView('naturaleza')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Naturaleza (Flora y Fauna)
        </button>
        <button
          onClick={() => setCurrentView('pesca')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Pesca Deportiva
        </button>
      </div>
    </div>
  );

  // Componente para la sección de Senderismo
  const SenderismoSection = () => (
    <>
      <button
        onClick={() => setCurrentView('mainMenu')}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-6"
      >
        &larr; Volver al Menú Principal
      </button>
      <section className="mb-8 bg-blue-50 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Filtra tu búsqueda de Senderos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Selector de Dificultad */}
          <div>
            <label
              htmlFor="difficulty"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Dificultad:
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Todas</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Ubicación */}
          <div>
            <label
              htmlFor="location"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Ubicación:
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Todas</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Duración */}
          <div>
            <label
              htmlFor="duration"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Duración del sendero:
            </label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Cualquiera</option>
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Nuevo Selector de Estación */}
          <div>
            <label
              htmlFor="season"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Estación del año:
            </label>
            <select
              id="season"
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(e.target.value);
                setPlannedDate(''); // Limpiar fecha si se selecciona estación
              }}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Cualquiera</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Nuevo Selector de Fecha Planificada */}
          <div>
            <label
              htmlFor="plannedDate"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Fecha planificada:
            </label>
            <input
              type="date"
              id="plannedDate"
              value={plannedDate}
              onChange={(e) => {
                setPlannedDate(e.target.value);
                setSelectedSeason(''); // Limpiar estación si se selecciona fecha
              }}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>

        {/* Botón para reiniciar filtros */}
        <button
          onClick={resetSenderismoFilters}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 shadow-md"
        >
          Reiniciar Filtros
        </button>
      </section>

      {/* Sección de Recomendaciones de Seguridad */}
      <section className="mb-8 bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          Recomendaciones de Seguridad para Senderismo
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {getSafetyRecommendations().map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </section>

      {/* Sección de Resultados de Senderos */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Senderos Encontrados ({filteredSenderos.length})
        </h2>
        {filteredSenderos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSenderos.map((sendero, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    {sendero.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Dificultad:</span>{' '}
                    {sendero.difficulty}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Ubicación:</span>{' '}
                    {sendero.location}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Distancia:</span>{' '}
                    {sendero.distance}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Duración:</span>{' '}
                    {sendero.duration}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Disponibilidad:</span>{' '}
                    {sendero.seasonal_availability}
                  </p>
                  {sendero.notes && (
                    <p className="text-gray-700 text-sm mt-2 italic">
                      Notas: {sendero.notes}
                    </p>
                  )}
                </div>
                {sendero.gpx_url && (
                  <button
                    onClick={() => handleDownloadGpx(sendero.name, sendero.gpx_url)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 shadow-md self-end"
                  >
                    Descargar GPX
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">
            No se encontraron senderos con los filtros seleccionados.
          </p>
        )}
      </section>
    </>
  );

  // Componente para la sección de Museos
  const MuseosSection = () => (
    <>
      <button
        onClick={() => setCurrentView('mainMenu')}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-6"
      >
        &larr; Volver al Menú Principal
      </button>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4">
          Museos y Sitios Culturales en Tierra del Fuego
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {museumsData.map((museum, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-purple-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                {museum.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Ubicación:</span>{' '}
                {museum.location}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Dirección:</span>{' '}
                {museum.address}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Horarios:</span>{' '}
                {museum.hours}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Tarifas:</span>{' '}
                {museum.fees}
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                {museum.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  // Componente para la sección de Deportes de Invierno
  const DeportesInviernoSection = () => (
    <>
      <button
        onClick={() => setCurrentView('mainMenu')}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-6"
      >
        &larr; Volver al Menú Principal
      </button>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-cyan-800 mb-4">
          Deportes de Invierno en Tierra del Fuego
        </h2>
        {winterSportsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {winterSportsData.map((data, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-cyan-200 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-cyan-700 mb-2">
                  {data.location}
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  {data.notes}
                </p>
                <p className="font-semibold text-gray-700">
                  Actividades principales:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {data.activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">
            No se encontraron datos específicos sobre deportes de invierno.
          </p>
        )}
      </section>
    </>
  );

  // Componente para la sección de Naturaleza (Flora y Fauna)
  const NaturalezaSection = () => (
    <>
      <button
        onClick={() => setCurrentView('mainMenu')}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-6"
      >
        &larr; Volver al Menú Principal
      </button>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          Naturaleza: Flora y Fauna de Tierra del Fuego
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {natureData.map((data, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Ecosistema: {data.ecosystem}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Flora Destacada:</span>{' '}
                {data.flora}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Fauna Destacada:</span>{' '}
                {data.fauna}
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                Notas: {data.notes}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  // Componente para la sección de Pesca
  const PescaSection = () => (
    <>
      <button
        onClick={() => setCurrentView('mainMenu')}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mb-6"
      >
        &larr; Volver al Menú Principal
      </button>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-800 mb-4">
          Pesca Deportiva en Tierra del Fuego
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fishingData.map((data, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-orange-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-orange-700 mb-2">
                Ubicación: {data.location} ({data.type})
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Especies Principales:</span>{' '}
                {data.species}
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                Notas: {data.notes}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-500 mt-8">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            Consideraciones Legales y de Temporada
          </h3>
          <p className="text-gray-700">
            La pesca deportiva en Tierra del Fuego está estrictamente regulada para la conservación de las especies. Es OBLIGATORIO obtener una licencia de pesca provincial. Las temporadas de pesca varían según la especie y el cuerpo de agua (generalmente de noviembre a abril para salmónidos, pero verificar fechas exactas cada año). Se deben respetar los límites de captura, tamaños mínimos y la modalidad de pesca (ej. mosca, spinning). La pesca con devolución es común y fomentada. Consultar las normativas del Instituto Fueguino de Turismo (INFUETUR) o las autoridades de fauna para la información más actualizada y evitar infracciones.
          </p>
        </div>
      </section>
    </>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-blue-700 text-white p-6 sm:p-8 text-center rounded-t-xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Sistema Experto de Senderismo en Tierra del Fuego
          </h1>
          <p className="text-lg sm:text-xl opacity-90">
            Encuentra tu aventura ideal en el Fin del Mundo
          </p>
        </header>

        <main className="p-4 sm:p-8">
          {currentView === 'mainMenu' && <MainMenu />}
          {currentView === 'senderismo' && <SenderismoSection />}
          {currentView === 'museos' && <MuseosSection />}
          {currentView === 'deportesInvierno' && <DeportesInviernoSection />}
          {currentView === 'naturaleza' && <NaturalezaSection />}
          {currentView === 'pesca' && <PescaSection />}
        </main>

        <footer className="bg-blue-700 text-white p-4 text-center text-sm rounded-b-xl mt-8">
          <p>&copy; 2025 Tierra del Fuego: Sistema Experto de Senderismo</p>
        </footer>
      </div>
    </div>
  );
};

export default App;