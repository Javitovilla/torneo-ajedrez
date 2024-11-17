# Torneo de Ajedrez

## Descripción
Este proyecto es un sistema para gestionar un torneo de ajedrez. Permite registrar jugadores, árbitros, rondas y resultados.


# Torneo de Ajedrez

## Descripción
Este proyecto gestiona un torneo de ajedrez, incluyendo información sobre los jugadores, árbitros y rondas. La base de datos está diseñada para almacenar y organizar estos datos de manera eficiente.

## Estructura de la Base de Datos

### Colecciones

#### 1. Jugadores
- **Descripción**: Almacena información sobre los jugadores que participan en el torneo.
- **Campos**:
  - `_id`: Identificador único del jugador (String).
  - `nombre`: Nombre completo del jugador (String).
  - `ranking`: Ranking actual del jugador (String).
  - `pais`: País de origen del jugador (String).
  - `puntos`: Puntos acumulados durante el torneo (Number).

**Ejemplo de Documento en Jugadores**:
```json
{
    "_id": "J001",
    "nombre": "Juan Martínez",
    "ranking": "1500",
    "pais": "Argentina",
    "puntos": 0
}
{
    "_id": "J002",
    "nombre": "Sofía López",
    "ranking": "1600",
    "pais": "Chile",
    "puntos": 0
}
{
    "_id": "J003",
    "nombre": "Carlos Pérez",
    "ranking": "1450",
    "pais": "México",
    "puntos": 0
}
###2. Árbitros
Descripción: Almacena información sobre los árbitros que supervisan el torneo.
Campos:
_id: Identificador único del árbitro (String).
nombre: Nombre completo del árbitro (String).
experiencia: Años de experiencia como árbitro (String).
rol: Rol del árbitro en el torneo (String).

{
    "_id": "A001",
    "nombre": "Roberto Díaz",
    "experiencia": "5 años",
    "rol": "Principal"
}
{
    "_id": "A002",
    "nombre": "Ana Gómez",
    "experiencia": "3 años",
    "rol": "Asistente"
}
###3. Rondas
Descripción: Contiene detalles sobre las rondas del torneo.
Campos:
_id: Identificador único de la ronda (String).
numero_ronda: Número de la ronda en el torneo (Number).
fecha: Fecha en que se lleva a cabo la ronda (Date).
resultados: Resultados de los partidos en esta ronda (Array).
Ejemplo de Documento en Rondas:
{
    "_id": "R001",
    "numero_ronda": 1,
    "fecha": "2024-11-20T10:00:00Z",
    "resultados": [
        {"jugador1": "Juan Martínez", "jugador2": "Sofía López", "resultado": "1-0"},
        {"jugador1": "Carlos Pérez", "jugador2": "Ana Gómez", "resultado": "0-1"}
    ]
}

