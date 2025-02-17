const fetch = require('node-fetch');

async function testAPI() {
    const response = await fetch("http://localhost:3000/api/humedad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sensor_id: "sensor_008",
            ubicacion: { latitud: 19.4326, longitud: -7.1332 },
            lectura: { temperatura: 30, humedad: 90 },
            timestamp: new Date().toISOString()
        })
    });

    const data = await response.json();
    console.log(data);
}

testAPI();
