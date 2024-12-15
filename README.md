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

## 1. Requerimientos No Funcionales

### 1.1. Escenario para el Particionamiento

En el contexto del torneo de ajedrez, se anticipa que la base de datos contendrá un gran volumen de información relacionada con los jugadores, árbitros, rondas y resultados. A medida que el torneo crece en popularidad, se espera que la cantidad de jugadores supere los 10,000, lo que generará una carga significativa en la base de datos.

Para garantizar un rendimiento óptimo y una respuesta rápida a las consultas, se requiere la implementación de sharding (particionamiento horizontal). Este enfoque permitirá distribuir los datos entre múltiples servidores (shards), lo que mejorará la escalabilidad y la disponibilidad del sistema.

### 1.2. Criterios de Calidad

- **Desempeño**: 
  - La base de datos debe ser capaz de manejar al menos 1000 consultas por segundo durante las horas pico del torneo.
  - Las operaciones de lectura deben completarse en menos de 50 ms y las operaciones de escritura en menos de 100 ms.

- **Escalabilidad**:
  - El sistema debe permitir la adición de nuevos shards sin interrupciones en el servicio.
  - Se debe poder aumentar la capacidad del sistema conforme crezca el número de jugadores y partidas.

- **Disponibilidad**:
  - El sistema debe estar disponible 24/7, con un tiempo de inactividad mínimo.
  - En caso de fallo en uno o más shards, el sistema debe seguir funcionando sin pérdida de datos.

- **Mantenibilidad**:
  - La arquitectura debe ser fácil de mantener y actualizar.
  - Se deben proporcionar herramientas para monitorear el rendimiento del sistema y realizar ajustes según sea necesario.
mongosh --port 27019
rs.initiate({
    _id: "configReplSet",
    members: [
        { _id: 0, host: "localhost:27019" }
    ]
});
mongod --shardsvr --replSet shardReplSet1 --dbpath C:\data\shard1 --port 27020
mongod --shardsvr --replSet shardReplSet2 --dbpath C:\data\shard2 --port 27021
mongosh --port 27020
rs.initiate({
    _id: "shardReplSet1",
    members: [
        { _id: 0, host: "localhost:27020" }
    ]
});
mongosh --port 27021
rs.initiate({
    _id: "shardReplSet2",
    members: [
        { _id: 0, host: "localhost:27021" }
    ]
});
sh.enableSharding("torneo_ajedrez");

db.jugadores.createIndex({ jugador_id: 1 });

for (let i = 0; i < 100; i++) {
    db.jugadores.insertOne({ jugador_id: i, nombre: "Jugador_" + i });
}
sh.status();
