import json
from pathlib import Path


def load_json_data(filename: str):
    """Carga datos desde un archivo JSON en la carpeta 'data/'."""
    current_dir = Path(__file__).parent
    data_dir = current_dir / "data"
    filepath = data_dir / filename
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: El archivo {filepath} no fue encontrado.")
        return []
    except json.JSONDecodeError:
        print(f"Error: No se pudo decodificar el JSON de {filepath}.")
        return []


# Cargar todos los datos al inicio
senderos_data = load_json_data("senderos.json")
museums_data = load_json_data("museums.json")
winter_sports_data = load_json_data("winter_sports.json")
nature_data = load_json_data("nature.json")
fishing_data = load_json_data("fishing.json")


def get_senderos_data():
    return senderos_data


def get_museums_data():
    return museums_data


def get_winter_sports_data():
    return winter_sports_data


def get_nature_data():
    return nature_data


def get_fishing_data():
    return fishing_data
