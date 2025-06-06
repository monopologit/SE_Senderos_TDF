from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

# --- Modelos de datos para Senderos ---


class Sendero(BaseModel):
    name: str
    difficulty: str
    distance: str
    duration: str
    location: str
    seasonal_availability: str
    notes: Optional[str] = None
    gpx_url: Optional[str] = None


class SenderosFilterRequest(BaseModel):
    difficulty: Optional[str] = Field(
        None, description="Dificultad del sendero (Baja, Media, Alta).")
    location: Optional[str] = Field(
        None, description="Ubicación del sendero (ej. Parque Nacional Tierra del Fuego, Ushuaia, Tolhuin, Río Grande).")
    duration_category: Optional[str] = Field(
        None, description="Categoría de duración del sendero (Corta, Media, Larga).")
    season: Optional[str] = Field(
        None, description="Estación del año (Verano, Otoño, Invierno, Primavera).")
    planned_date: Optional[date] = Field(
        None, description="Fecha planificada para la actividad (YYYY-MM-DD).")

# --- Modelos de datos para Museos ---


class Museum(BaseModel):
    name: str
    location: str
    address: str
    hours: str
    fees: str
    description: str

# --- Modelos de datos para Deportes de Invierno ---


class WinterSportLocation(BaseModel):
    location: str
    activities: List[str]
    notes: str

# --- Modelos de datos para Naturaleza ---


class NatureInfo(BaseModel):
    ecosystem: str
    flora: str
    fauna: str
    notes: str

# --- Modelos de datos para Pesca ---


class FishingInfo(BaseModel):
    location: str
    type: str
    species: str
    notes: str

# --- Otros modelos ---


class ActivityType(BaseModel):
    name: str
    description: str


class Recommendation(BaseModel):
    recommendation: str


class SafetyRecommendations(BaseModel):
    difficulty: str
    recommendations: List[str]
