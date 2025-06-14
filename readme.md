# Sistema Experto de Senderismo y Turismo en Tierra del Fuego

- Para Desarrollo de Sistemas de IA
- Profesor: Martin Mirabete
- Alumno: Carlos A. Gongora
- Instituto Politécnico Malvinas Argentinas de Rio Grande

_Descripción del Proyecto_

Este proyecto implementa un Sistema Experto de Senderismo y Turismo para la provincia de Tierra del Fuego, Argentina, utilizando FastAPI para proporcionar una API web eficiente.

El objetivo principal es ofrecer información detallada y recomendaciones sobre diversas actividades de tipo turísticas, donde lo principal se centra en el senderismo de hermosos lugares naturales pero tambien se incluyen: museos, deportes de invierno, flora, fauna y pesca deportiva.

El sistema está diseñado para ser fácilmente integrable en cualquier aplicación web o móvil, permitiendo a los turistas planificar sus aventuras en el "Fin del Mundo" de manera informada y segura.

Características:

Filtrado de Senderos: Busca senderos por dificultad, ubicación, categoría de duración, estación del año y fecha planificada.

Recomendaciones de Seguridad: Obtén consejos de seguridad específicos para senderismo, adaptados a la dificultad de la ruta.

Información de Museos: Accede a detalles sobre los museos y sitios culturales de Ushuaia y Río Grande, incluyendo horarios y tarifas.

Guía de Deportes de Invierno: Descubre las actividades y centros de deportes invernales disponibles en la provincia.

Flora y Fauna: Conoce los ecosistemas y las especies más representativas de la naturaleza fueguina.

Pesca Deportiva: Información sobre ubicaciones, especies, regulaciones y temporadas de pesca.

API RESTful: Todos los servicios se exponen a través de una API RESTful, fácil de consumir desde cualquier cliente web.

Documentación Interactiva: Incluye documentación automática de la API (Swagger UI) para facilitar su exploración y prueba.

Estructura del Proyecto

El proyecto se organiza en los siguientes archivos y directorios:

SE_Senderos_TDF/

├── README.md # El archivo README que ya tenemos
├── docs/ # Documentos, bocetos, imagenes
│ └── arquitectura_conocimiento.pdf
│ └── decision_tree_turismo.png # La imagen del árbol de decisión
├── backend/ # Carpeta para todo el código Python (FastAPI)
│ ├── data/
│ │ ├── senderos.json
│ │ ├── museums.json
│ │ ├── winter_sports.json
│ │ ├── nature.json
│ │ └── fishing.json
│ ├── main.py
│ ├── models.py
│ ├── logic.py
│ ├── data_loader.py
│ └── requirements.txt # Dependencias del backend
└── frontend/ # Carpeta para todo el código React
├── build/
├── node_modules/
├── public/
├── src/
├── package.json
├── package-lock.json
├── .gitignore # Para ignorar archivos que no deben ir a Git
├── .env # Para variables de entorno del frontend (ej. URL del backend)
├── README
└── ... otros archivos de React

Requisitos

Python 3.7+

pip (gestor de paquetes de Python)

Instalación:

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

- Clona el repositorio:

git clone https://github.com/tu_usuario/tu_proyecto.git

cd tu_proyecto

- (Reemplaza tu_usuario y tu_proyecto con los datos de tu repositorio)

- Crea la carpeta data y copia los archivos JSON:

Asegúrate de tener la estructura de carpetas y los archivos JSON tal como se describe en la sección "Estructura del Proyecto". Puedes copiar los contenidos de los archivos JSON proporcionados en la conversación anterior.

- Instala las dependencias:

pip install fastapi "uvicorn[standard]" pydantic

Uso:

Una vez que hayas completado la instalación, puedes iniciar el servidor FastAPI:
uvicorn main:app --reload

El servidor se iniciará en http://127.0.0.1:8000.

Acceso a la Documentación de la API

Puedes acceder a la documentación interactiva de la API (Swagger UI) en tu navegador web:

http://127.0.0.1:8000/docs

Desde esta interfaz, podrás explorar todos los endpoints disponibles, ver sus parámetros, modelos de respuesta y realizar pruebas directamente.

Endpoints de la API

A continuación, se describen los principales endpoints expuestos por la API:

General

GET /

Descripción: Mensaje de bienvenida al sistema experto.

Respuesta: {"message": "¡Bienvenido al Sistema Experto de Turismo en Tierra del Fuego!..."}

GET /activities

Descripción: Lista los tipos de actividades turísticas disponibles en el sistema.

Respuesta: [{"name": "Senderismo", "description": "..."}, ...]

Senderismo

POST /senderos/filter

Descripción: Filtra senderos según criterios como dificultad, ubicación, duración, estación del año o fecha planificada.

Cuerpo de la Solicitud (JSON):

{
"difficulty": "Baja",
"location": "Parque Nacional Tierra del Fuego",
"duration_category": "Corta",
"season": "Verano (Dic-Feb)",
"planned_date": "2025-01-15"
}

(Todos los campos son opcionales)

Respuesta: [{"name": "Castorera", ...}, ...] (lista de senderos filtrados)

GET /senderos/recommendations/safety

Descripción: Obtiene recomendaciones de seguridad para senderismo, opcionalmente filtradas por dificultad.

Parámetros de Consulta:

difficulty (opcional): Baja, Media, Alta

Ejemplo: GET /senderos/recommendations/safety?difficulty=Alta

Respuesta: {"difficulty": "Alta", "recommendations": ["...", "..."]}

Museos

GET /museums

Descripción: Retorna una lista de todos los museos y sitios culturales en Tierra del Fuego.

Respuesta: [{"name": "Museo del Fin del Mundo (MFM)", ...}, ...]

Deportes de Invierno

GET /winter_sports

Descripción: Proporciona información sobre las ubicaciones y actividades de deportes de invierno.

Respuesta: [{"location": "Ushuaia", "activities": ["...", "..."], ...}, ...]

Naturaleza

GET /nature

Descripción: Ofrece información sobre la flora y fauna autóctona de los diferentes ecosistemas.

Respuesta: [{"ecosystem": "Bosques Subantárticos", "flora": "...", "fauna": "...", ...}, ...]

Pesca

GET /fishing

Descripción: Detalla información sobre la pesca deportiva, incluyendo ubicaciones, especies, regulaciones y temporadas.

Respuesta: [{"location": "Río Grande", "type": "Río/Mar", ...}, ...]

Datos (Knowledge Base)

Los datos utilizados por el sistema experto se almacenan en archivos JSON dentro de la carpeta data/. Esta estructura facilita la actualización y el mantenimiento de la información. Cada archivo JSON corresponde a una categoría de datos específica:

senderos.json: Contiene la información detallada de cada sendero.

museums.json: Almacena los datos de los museos y sitios culturales.

winter_sports.json: Guarda la información sobre los lugares y actividades de deportes de invierno.

nature.json: Contiene descripciones de los ecosistemas, flora y fauna.

fishing.json: Incluye detalles sobre las zonas de pesca, especies y regulaciones.

Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes:

Reportar errores.

Sugerir nuevas características.

Enviar pull requests con mejoras de código o datos.

Por favor, asegúrate de seguir las buenas prácticas de codificación y de documentar tus cambios.

Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
