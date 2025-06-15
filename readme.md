# Sistema Experto de Senderismo y Turismo en Tierra del Fuego

- Para Desarrollo de Sistemas de IA
- Profesor: Martin Mirabete
- Alumno: Carlos A. Gongora
- Instituto Politécnico Malvinas Argentinas de Rio Grande

Descripción del Proyecto
Este proyecto implementa un Sistema Experto de Senderismo y tambien abarca una parte de Turismo ya que engloba otro grupo de actividades para disfrutar en la hermosa provincia de Tierra del Fuego, Argentina. Utiliza FastAPI para el backend (la lógica del sistema) y React para el frontend (la interfaz de usuario). El objetivo principal es ofrecer información detallada y recomendaciones sobre diversas actividades turísticas, como senderismo, museos, deportes de invierno, flora y fauna, y pesca deportiva, facilitando así la planificación de viajes al "Fin del Mundo".
El sistema está diseñado para ser modular y fácilmente escalable, permitiendo una integración eficiente en diversas plataformas web.
Características Principales
  - Frontend Interactivo (React): Interfaz de usuario intuitiva con menús de navegación y filtros.
  - Backend Robusto (FastAPI): Procesa solicitudes, filtra datos y sirve la información turística.
  - Filtrado de Senderos: Busca rutas por dificultad, ubicación, duración, estación y fecha planificada.
  - Recomendaciones de Seguridad: Ofrece consejos de seguridad específicos para senderismo.
  - Información Detallada: Acceso a datos sobre museos, centros de deportes de invierno, flora y fauna por ecosistema, y pautas de pesca deportiva (incluyendo regulaciones).
  - API RESTful: Todos los servicios del backend se exponen a través de una API RESTful, fácil de consumir.
  - Documentación Interactiva de la API: Incluye Swagger UI para exploración y pruebas del backend.
  - Base de Conocimiento Estructurada: Datos almacenados en archivos JSON de fácil mantenimiento.Estructura del RepositorioEl repositorio se organiza de la siguiente manera:

SE_Senderos_TDF/

├── .gitignore                # Reglas para Git de archivos a ignorar

├── LICENSE                   # Licencia del proyecto

├── README.md                 # Este archivo de documentación

├── docs/                     # Documentación adicional del proyecto

│   ├── arquitectura_conocimiento.pdf   # Detalle de la arquitectura del conocimiento

│   └── decision_tree_turismo.png   # Diagrama visual del árbol de decisión

├── backend/                  # Código Python (FastAPI) y la base de conocimiento

│   ├── data/                 # Archivos JSON con los datos del sistema experto

│   │   ├── senderos.json

│   │   ├── museums.json

│   │   ├── winter_sports.json

│   │   ├── nature.json

│   │   └── fishing.json

│   ├── main.py               # Aplicación FastAPI y definición de endpoints

│   ├── models.py             # Modelos de datos Pydantic

│   ├── logic.py              # Lógica de negocio y funciones de inferencia

│   ├── data_loader.py        # Carga de datos desde archivos JSON

│   └── requirements.txt      # Dependencias de Python del backend

└── frontend/                 # Código React (interfaz de usuario)

    ├── public/               # Archivos estáticos (ej. index.html)
    
    ├── src/                  # Componentes y lógica de React
    
    ├── .env                  # Variables de entorno para el frontend (ej. URL del backend)
    
    ├── package.json          # Metadatos del proyecto y scripts de Node.js
    
    ├── package-lock.json     # Registro de dependencias exactas
    
    ├── node_modules/         # (Ignorado por Git) Librerías de Node.js
    
    └── build/                # (Ignorado por Git) Versión optimizada para despliegue
    
Requisitos Previos

Para ejecutar el proyecto localmente, necesitarás tener instalado lo siguiente:

  - Python 3.7+: Asegúrate de tener Python instalado y configurado en tu PATH.
  
  - pip: El gestor de paquetes de Python (normalmente viene con Python).
  
  - Node.js y npm (o npx): Node.js es el entorno de ejecución de JavaScript y npm (Node Package Manager) es su gestor de paquetes. npx viene con npm. Puedes descargarlo desde nodejs.org.
  
  - Git: Para clonar el repositorio.

Configuración e Instalación Local

Sigue estos pasos detallados para poner en marcha el sistema en tu máquina local.

1. Clonar el Repositorio
   - Abre tu terminal (o la terminal integrada de VS Code) y ejecuta:git clone https://github.com/tu_usuario/SE_Senderos_TDF.git cd SE_Senderos_TDF (Asegúrate de reemplazar tu_usuario por tu nombre de usuario de GitHub real si ya subiste el proyecto).

2. Configurar y Ejecutar el Backend (FastAPI)
   - Navega a la carpeta del backend:
     cd backend
   - Crea un entorno virtual (recomendado):
   - python -m venv venv
   - Activa el entorno virtual:
      - En Windows (PowerShell):
        .\venv\Scripts\Activate
      - En Windows (CMD - Símbolo del sistema):
        venv\Scripts\activate.bat
      - En Linux / macOS:
        source venv/bin/activate
Verás (venv) al inicio de tu línea de comandos si está activo.

   - Instala las dependencias de Python:
     pip install -r requirements.txt
   - Ejecuta el servidor FastAPI:
     uvicorn main:app --reload
El backend estará corriendo en http://127.0.0.1:8000. Puedes acceder a su documentación interactiva en http://127.0.0.1:8000/docs.Deja esta terminal abierta y el servidor corriendo.

3. Configurar y Ejecutar el Frontend (React)
   - Abre una NUEVA terminal (en VS Code: Terminal > New Terminal).
   - Navega a la carpeta del frontend:
     cd frontend
   - Instala las dependencias de Node.js:
     npm install
   - Configura la URL del backend en el frontend:
     Crea (o abre) el archivo .env en la carpeta frontend/.
     Añade la siguiente línea:REACT_APP_API_URL=http://127.0.0.1:8000
     Importante: Para pruebas locales, apuntamos a tu backend local. Cuando despliegues, esta URL deberá ser la URL pública real de tu backend.
     Ejecuta la aplicación React en modo desarrollo:
     npm start
     Esto abrirá automáticamente tu aplicación React en tu navegador (usualmente en http://localhost:3000). Si no se abre, cópiala y pégala en tu navegador.

Uso del Sistema Experto

Una vez que ambos servidores (backend y frontend) estén corriendo localmente:
  Abre tu navegador web y ve a http://localhost:3000.
  Serás recibido por el Menú Principal, donde podrás seleccionar el tipo de actividad turística que te interesa.
  Al seleccionar una opción, la interfaz te guiará a la sección correspondiente (filtrado de senderos, información de museos, etc.).
  En la sección de senderismo, puedes aplicar filtros y obtener recomendaciones de seguridad. El botón "Descargar GPX" simulará una descarga (para una implementación real, requeriría un servicio de almacenamiento de archivos).

Endpoints de la API (Backend)

La API de FastAPI expone los siguientes endpoints (accede a http://127.0.0.1:8000/docs para una documentación interactiva completa):
  GET /: Mensaje de bienvenida.
  GET /activities: Lista los tipos de actividades disponibles.
  POST /senderos/filter: Filtra senderos por dificultad, ubicación, duración, estación o fecha.
  GET /senderos/recommendations/safety: Obtiene recomendaciones de seguridad para senderismo, opcionalmente por dificultad.
  GET /museums: Lista museos y sitios culturales.
  GET /winter_sports: Muestra información sobre deportes de invierno.
  GET /nature: Proporciona detalles sobre flora y fauna.
  GET /fishing: Ofrece información sobre pesca deportiva.
  
Documentación Adicional

  Para una comprensión más profunda de la arquitectura y la lógica del sistema experto, consulta los siguientes documentos en la carpeta docs/:
  arquitectura_conocimiento.pdf: Detalla cómo se estructura y organiza el conocimiento, las reglas de inferencia y la lógica detrás del sistema.
  decision_tree_turismo.png: Una representación visual del árbol de decisión conceptual que guía el flujo del sistema.
  
Árbol de Decisión del Sistema Experto

  Aquí se visualiza el flujo lógico de decisiones del sistema:

Despliegue en la Web (Consideraciones)

Para desplegar este sistema en un dominio como www.senderofueguinosturismo.com.ar, se recomienda:

  Frontend (React): Desplegarlo en un servicio de hosting estático como Netlify, Vercel o GitHub Pages. La carpeta frontend/build/ es la que se debe desplegar.
  Backend (FastAPI): Desplegarlo en una plataforma que soporte aplicaciones Python, como Render, Heroku o Google Cloud Run.
  Configuración de Dominio (DNS): Apuntar el dominio principal (ej., www.senderofueguinosturismo.com.ar) al frontend y un subdominio (ej., api.senderofueguinosturismo.com.ar) al backend.
  CORS: Configurar el CORSMiddleware en el archivo backend/main.py para permitir que el frontend acceda al backend desde diferentes orígenes.
  Variables de Entorno: Configurar REACT_APP_API_URL en el servicio de hosting del frontend con la URL pública real del backend.
  
  Contribuciones
  
  ¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes:
  
    Reportar errores.
    Sugerir nuevas características.
    Enviar pull requests con mejoras de código o datos.
    Por favor, asegúrate de seguir las buenas prácticas de codificación y de documentar tus cambios.
  
  Licencia
  
  Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
