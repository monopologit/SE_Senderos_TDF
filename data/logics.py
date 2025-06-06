from typing import List, Optional
from datetime import date
from data_loader import get_senderos_data, get_museums_data, get_winter_sports_data, get_nature_data, get_fishing_data
from models import Sendero, Museum, WinterSportLocation, NatureInfo, FishingInfo, SafetyRecommendations

# --- Funciones para Senderismo ---


def get_duration_in_minutes(duration_str: str) -> float:
    """Normaliza la duración de un sendero a minutos para comparación."""
    if not duration_str or duration_str.upper() == 'N/A':
        return float('inf')

    duration_str = duration_str.lower()
    if 'min' in duration_str:
        return float(''.join(filter(str.isdigit, duration_str)))
    elif 'hs' in duration_str or 'h' in duration_str:
        return float(''.join(filter(str.isdigit, duration_str))) * 60
    return float('inf')


def is_sendero_available(sendero: dict, planned_date: Optional[date], selected_season: Optional[str]) -> bool:
    """Verifica la disponibilidad estacional de un sendero."""
    availability = sendero.get("seasonal_availability", "Todo el año")

    if planned_date:
        planned_month = planned_date.month  # 1-12 (Enero-Diciembre)

        if availability == "Todo el año" or availability == "Habilitado":
            return True
        elif availability == "Noviembre a Abril":
            # Nov (11), Dic (12), Ene (1), Feb (2), Mar (3), Abr (4)
            return (11 <= planned_month <= 12) or (1 <= planned_month <= 4)
        elif availability == "Condicionado a clima":
            return True  # Asumimos que el usuario verificará las condiciones
        return False

    if selected_season:
        # Mapeo de estaciones a meses (aproximado para el hemisferio sur)
        season_month_map = {
            'Verano': [12, 1, 2],  # Dic, Ene, Feb
            'Otoño': [3, 4, 5],   # Mar, Abr, May
            'Invierno': [6, 7, 8],  # Jun, Jul, Ago
            'Primavera': [9, 10, 11]  # Sep, Oct, Nov
        }

        # Si la disponibilidad es "Todo el año" o "Habilitado", siempre es true para cualquier estación
        if availability in ["Todo el año", "Habilitado"]:
            return True

        # Si la disponibilidad es "Noviembre a Abril"
        if availability == "Noviembre a Abril":
            if selected_season in ['Verano (Dic-Feb)', 'Primavera (Sep-Nov)', 'Otoño (Mar-May)']:
                return True  # Nov-Abr cubre parte de primavera, verano y otoño
            return False

        # Si la disponibilidad es "Condicionado a clima", asumimos true para la estación seleccionada
        if availability == "Condicionado a clima":
            return True

        return False  # Si no coincide con ninguna regla

    return True  # Si no hay filtros de fecha/estación, mostrar todos


def filter_senderos(
    difficulty: Optional[str] = None,
    location: Optional[str] = None,
    duration_category: Optional[str] = None,
    season: Optional[str] = None,
    planned_date: Optional[date] = None
) -> List[Sendero]:
    """Filtra la lista de senderos según los criterios."""
    senderos = get_senderos_data()
    filtered_senderos = []

    for sendero_data in senderos:
        sendero_obj = Sendero(**sendero_data)  # Convertir a modelo Pydantic

        # Filtrar por dificultad
        if difficulty and sendero_obj.difficulty != difficulty:
            continue

        # Filtrar por ubicación
        if location and sendero_obj.location != location:
            continue

        # Filtrar por categoría de duración
        if duration_category:
            sendero_duration_min = get_duration_in_minutes(
                sendero_obj.duration)
            if duration_category == 'Corta' and sendero_duration_min >= 60:
                continue
            elif duration_category == 'Media' and not (60 <= sendero_duration_min <= 240):
                continue
            elif duration_category == 'Larga' and sendero_duration_min <= 240:
                continue

        # Filtrar por disponibilidad estacional/fecha
        if not is_sendero_available(sendero_data, planned_date, season):
            continue

        filtered_senderos.append(sendero_obj)

    return filtered_senderos


def get_safety_recommendations(difficulty: Optional[str] = None) -> List[str]:
    """Retorna recomendaciones de seguridad basadas en la dificultad del sendero."""
    recommendations = []

    if difficulty == 'Alta':
        recommendations.append(
            'Para senderos de alta dificultad, el registro previo obligatorio es crucial. Asegúrate de hacerlo en el Centro de Visitantes Alakush o de forma virtual.')
        recommendations.append(
            'Se recomienda contratar excursiones con operadores turísticos habilitados para senderos de alta dificultad.')

    if difficulty in ['Media', 'Alta']:
        recommendations.append(
            'Siempre ve acompañado. Nunca realices caminatas en solitario.')
        recommendations.append(
            'Vístete en capas con ropa impermeable y térmica. Usa calzado adecuado para trekking (impermeable y con buen agarre).')
        recommendations.append(
            'Lleva un botiquín de primeros auxilios, ropa de repuesto, silbato, linterna, mapa/GPS, y suficiente comida y agua.')

    recommendations.append(
        'El clima en Tierra del Fuego es muy cambiante. Verifica las condiciones meteorológicas antes de salir y prepárate para cambios bruscos.')
    recommendations.append(
        'Sal temprano por la mañana para aprovechar la luz del día y finaliza las actividades antes del anochecer.')
    recommendations.append('En caso de emergencia, llama al 103.')
    recommendations.append(
        'Solo se permite hacer fuego en lugares habilitados y con artefactos aprobados. Consulta el Índice Diario de Peligro de Incendio.')

    return recommendations

# --- Funciones para otras categorías ---


def get_all_museums() -> List[Museum]:
    """Retorna la lista completa de museos."""
    return [Museum(**m) for m in get_museums_data()]


def get_all_winter_sports_locations() -> List[WinterSportLocation]:
    """Retorna la lista de ubicaciones de deportes de invierno."""
    return [WinterSportLocation(**w) for w in get_winter_sports_data()]


def get_all_nature_info() -> List[NatureInfo]:
    """Retorna la información sobre flora y fauna."""
    return [NatureInfo(**n) for n in get_nature_data()]


def get_all_fishing_info() -> List[FishingInfo]:
    """Retorna la información sobre pesca."""
    return [FishingInfo(**f) for f in get_fishing_data()]
