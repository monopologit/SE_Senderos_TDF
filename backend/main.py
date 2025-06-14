from fastapi import FastAPI, Query, HTTPException
from typing import List, Optional
from datetime import date

from models import (
    ActivityType, Sendero, SenderosFilterRequest, SafetyRecommendations,
    Museum, WinterSportLocation, NatureInfo, FishingInfo
)
import logic

app = FastAPI(
    title="Sistema Experto de Senderismo y Turismo en Tierra del Fuego",
    description="API que proporciona información y recomendaciones sobre actividades de senderismo y tambien turísticas en Tierra del Fuego, Argentina.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# --- Endpoints del Menú Principal ---


@app.get("/", summary="Bienvenida al Sistema Experto", response_model=dict)
async def read_root():
    """
    Mensaje de bienvenida al Sistema Experto de Turismo en Tierra del Fuego.
    """
    return {"message": "¡Bienvenido al Sistema Experto de Turismo en Tierra del Fuego! Navega a /docs para ver las opciones disponibles."}


@app.get("/activities", summary="Listar tipos de actividades", response_model=List[ActivityType])
async def get_activities():
    """
    Retorna una lista de los tipos de actividades turísticas disponibles en el sistema.
    """
    return [
        ActivityType(
            name="Senderismo", description="Explora los senderos y rutas de trekking de la región."),
        ActivityType(
            name="Museos", description="Descubre la rica historia y cultura de Tierra del Fuego a través de sus museos."),
        ActivityType(name="Deportes de Invierno",
                     description="Conoce las opciones para esquí, snowboard y otras actividades invernales."),
        ActivityType(
            name="Naturaleza", description="Información sobre la flora y fauna autóctona de los diversos ecosistemas fueguinos."),
        ActivityType(
            name="Pesca", description="Detalles sobre la pesca deportiva, regulaciones y temporadas.")
    ]

# --- Endpoints de Senderismo ---


@app.post("/senderos/filter", summary="Filtrar senderos", response_model=List[Sendero])
async def filter_senderos_endpoint(filters: SenderosFilterRequest):
    """
    Permite filtrar senderos por dificultad, ubicación, categoría de duración, estación del año o fecha planificada.
    """
    filtered_list = logic.filter_senderos(
        difficulty=filters.difficulty,
        location=filters.location,
        duration_category=filters.duration_category,
        season=filters.season,
        planned_date=filters.planned_date
    )
    return filtered_list


@app.get("/senderos/recommendations/safety", summary="Obtener recomendaciones de seguridad para senderismo", response_model=SafetyRecommendations)
async def get_senderos_safety_recommendations_endpoint(
    difficulty: Optional[str] = Query(
        None, description="Dificultad del sendero para recomendaciones específicas (Baja, Media, Alta).")
):
    """
    Proporciona recomendaciones generales de seguridad para senderismo,
    con énfasis adicional si se especifica una dificultad.
    """
    recommendations = logic.get_safety_recommendations(difficulty)
    return SafetyRecommendations(difficulty=difficulty or "General", recommendations=recommendations)

# --- Endpoints de Museos ---


@app.get("/museums", summary="Listar museos", response_model=List[Museum])
async def get_museums_endpoint():
    """
    Retorna una lista de los museos y sitios culturales en Tierra del Fuego, con sus horarios y tarifas.
    """
    return logic.get_all_museums()

# --- Endpoints de Deportes de Invierno ---


@app.get("/winter_sports", summary="Listar deportes de invierno", response_model=List[WinterSportLocation])
async def get_winter_sports_endpoint():
    """
    Retorna información sobre los centros y actividades de deportes de invierno en Tierra del Fuego.
    """
    return logic.get_all_winter_sports_locations()

# --- Endpoints de Naturaleza ---


@app.get("/nature", summary="Información sobre flora y fauna", response_model=List[NatureInfo])
async def get_nature_info_endpoint():
    """
    Ofrece un informe detallado sobre la flora y fauna autóctona de los diversos ecosistemas fueguinos.
    """
    return logic.get_all_nature_info()

# --- Endpoints de Pesca ---


@app.get("/fishing", summary="Información sobre pesca deportiva", response_model=List[FishingInfo])
async def get_fishing_info_endpoint():
    """
    Proporciona detalles sobre la pesca deportiva en Tierra del Fuego, incluyendo ubicaciones, especies,
    y recomendaciones sobre regulaciones y épocas del año.
    """
    return logic.get_all_fishing_info()
