const express = require("express");
const bodyParser = require("body-parser");
const { insertarPost } = require("./mongo"); // Importamos la función para guardar en MongoDB

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(bodyParser.json());

// ruta para recibir datos de la ESP32 mediante POST
app.post("/api/humedad", async (req, res) => {
    try {
        const horaESP = req.body.hora_local;
        const fechaServidor = new Date(); // Fecha actual del servidor

        //timestamp final
        const yyyy = fechaServidor.getFullYear();
        const mm = String(fechaServidor.getMonth() + 1).padStart(2, "0");
        const dd = String(fechaServidor.getDate()).padStart(2, "0");

        const fechaHoraISO = `${yyyy}-${mm}-${dd}T${horaESP}`;
        //estructura los datos recibidos desde el ESP32 a formato que recibe mongoDB
        const datos = {
            sensor_id: req.body.sensor_id,
            ubicacion: {
                latitud: req.body.ubicacion.latitud,
                longitud: req.body.ubicacion.longitud
            },
            lectura: {
                temperatura: req.body.lectura.temperatura,
                humedad: req.body.lectura.humedad
            },
            timestamp: new Date(fechaHoraISO) // Se usa la hora del servidor
        };

        await insertarPost(datos); // Guardamos los datos en MongoDB
        res.status(201).json({ mensaje: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al insertar en MongoDB:", error);
        res.status(500).json({ mensaje: "Error al guardar los datos" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

