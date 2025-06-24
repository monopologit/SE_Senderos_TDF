Sistema Experto de Senderismo y Turismo en Tierra del Fuego (Backend)

Descripción del Proyecto

Este proyecto implementa el backend del Sistema Experto de Turismo para la provincia de Tierra del Fuego, Argentina. Está construido con FastAPI y proporciona una API web eficiente para gestionar y consultar información detallada sobre diversas actividades turísticas, como senderismo, museos, deportes de invierno, flora y fauna, y pesca deportiva.El backend actúa como el "cerebro" del sistema, procesando las consultas, aplicando la lógica experta y recuperando datos de la base de conocimiento para ofrecer respuestas personalizadas y precisas al frontend o a cualquier otro cliente.

Características del BackendAPI 

- RESTful: Todos los servicios se exponen a través de una API RESTful, lo que permite una comunicación estandarizada con el frontend u otras aplicaciones.Lógica Experta: Contiene la implementación de la lógica de decisión para filtrar senderos, ofrecer recomendaciones de seguridad y organizar la información turística.Base de Conocimiento: Carga y gestiona datos desde archivos JSON locales, que actúan como la base de conocimiento del sistema.
- Validación de Datos: Utiliza Pydantic para la validación y serialización de los modelos de datos de entrada y salida, asegurando la integridad de la información.Documentación Automática: Incluye documentación interactiva de la API (Swagger UI y ReDoc), facilitando la exploración y prueba de los endpoints.

Estructura del Proyecto

El backend se organiza en los siguientes archivos y directorios:

tu_proyecto_backend/

├── data/

│   ├── senderos.json        # Base de datos de senderos

│   ├── museums.json         # Base de datos de museos

│   ├── winter_sports.json   # Base de datos de deportes de invierno

│   ├── nature.json          # Base de datos de flora y fauna

│   └── fishing.json         # Base de datos de pesca

├── main.py                  # Aplicación FastAPI, define y expone los endpoints

├── models.py                # Define los modelos de datos (Pydantic)

├── logic.py                 # Contiene la lógica de negocio y las funciones de inferencia

└── data_loader.py           # Módulo para cargar datos desde los archivos JSON

Requisitos

- Para ejecutar el backend, necesitarás:
            Python 3.7+pip (gestor de paquetes de Python)

Instalación

Sigue estos pasos para configurar y ejecutar el backend localmente:

                    Clona el repositorio:git clone https://github.com/tu_usuario/tu_proyecto.git
                    cd tu_proyecto/backend # O la ruta donde tengas tu backend
                    (Ajusta la ruta si tu backend no está directamente en la raíz del repositorio o está en una subcarpeta como backend/)
                    Asegúrate de tener la carpeta data con los archivos JSON:La carpeta data/ debe existir en el mismo nivel que main.py, models.py, etc., y debe contener los archivos senderos.json, museums.json, winter_sports.json, nature.json, y fishing.json. 
                    Puedes obtener el contenido de estos JSON de la conversación si no los tienes aún.
                    Instala las dependencias de Python:pip install fastapi "uvicorn[standard]" pydantic

Uso

Una vez que hayas completado la instalación, puedes iniciar el servidor 
                    FastAPI:uvicorn main:app --reload
                    El servidor se iniciará por defecto en http://127.0.0.1:8000.

Acceso a la Documentación de la APIPuedes acceder a la documentación interactiva de la API (Swagger UI) en tu navegador web, lo cual es muy útil para entender y probar los endpoints:http://127.0.0.1:8000/docsDesde esta interfaz, podrás explorar todos los endpoints disponibles, ver sus parámetros, modelos de respuesta y realizar pruebas directamente.
También puedes acceder a la documentación ReDoc en:http://127.0.0.1:8000/redocEndpoints de la APILos endpoints disponibles son los siguientes (consulta la documentación interactiva en /docs para detalles completos):
GeneralGET /Bienvenida al sistema experto.GET /activitiesLista los tipos de actividades turísticas disponibles.
SenderismoPOST /senderos/filterDescripción: Filtra senderos por dificultad, ubicación, categoría de duración, estación del año o fecha planificada.

Cuerpo de la Solicitud (JSON):{
  "difficulty": "Media",
  "location": "Parque Nacional Tierra del Fuego",
  "season": "Verano (Dic-Feb)"
}

(Todos los campos son opcionales)

GET /senderos/recommendations/safety

Descripción: Obtiene recomendaciones de seguridad para senderismo, opcionalmente filtradas por dificultad.
Parámetros de Consulta: difficulty (opcional: Baja, Media, Alta)
Museos
GET /museums
Lista todos los museos y sitios culturales con sus detalles.
Deportes de Invierno
GET /winter_sports
Proporciona información sobre ubicaciones y actividades de deportes de invierno.
Naturaleza
GET /nature
Ofrece un informe detallado sobre la flora y fauna autóctona.
Pesca
GET /fishing
Detalla información sobre la pesca deportiva, incluyendo ubicaciones, especies y regulaciones.
Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes:
Reportar errores.
Sugerir nuevas características.
Enviar pull requests con mejoras de código o datos.
Por favor, asegúrate de seguir las buenas prácticas de codificación y de documentar tus cambios.
LicenciaEste proyecto está bajo la licencia MIT. 
Consulta el archivo LICENSE en la raíz del repositorio para más detalles.
