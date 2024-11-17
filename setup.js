const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://localhost:27017'); // Cambia la URL si usas MongoDB Atlas
    try {
        await client.connect();
        const database = client.db('torneo_ajedrez');
        
        // Crear colecciones y documentos
        const jugadores = database.collection('jugadores');
        const arbitros = database.collection('arbitros');
        const rondas = database.collection('rondas');

        // Insertar documentos de ejemplo en jugadores
        await jugadores.insertMany([
            { _id: "J001", nombre: "Juan Martínez", ranking: "1500", pais: "Argentina", puntos: 0 },
            { _id: "J002", nombre: "Sofía López", ranking: "1600", pais: "Chile", puntos: 0 },
            { _id: "J003", nombre: "Carlos Pérez", ranking: "1450", pais: "México", puntos: 0 }
        ]);

        // Insertar documentos de ejemplo en arbitros
        await arbitros.insertMany([
            { _id: "A001", nombre: "Roberto Díaz", experiencia: "5 años", rol: "Principal" },
            { _id: "A002", nombre: "Ana Gómez", experiencia: "3 años", rol: "Asistente" }
        ]);

        // Insertar documentos de ejemplo en rondas
        await rondas.insertOne({
            _id: "R001",
            numero_ronda: 1,
            fecha: new Date("2024-11-20T10:00:00Z"),
            resultados: [
                { jugador1: "Juan Martínez", jugador2: "Sofía López", resultado: "1-0" },
                { jugador1: "Carlos Pérez", jugador2: "Ana Gómez", resultado: "0-1" }
            ]
        });

        console.log("Datos insertados correctamente.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);