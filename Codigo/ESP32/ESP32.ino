#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

const char* ssid = "TU-WIFI"; // Nombre de la red
const char* password = "TU-CONTRASENA"; // Contraseña de la red
const char* serverUrl = "http://TU-IP:3000/api/humedad"; // URL del servidor

int sensorPin = 33;  // Pin del sensor de humedad
String sensorID = "SENSOR_YL-69";
int temperatura = 19;//cambiar por la temperatura actual

// Configuración del cliente NTP
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -21600, 60000); // UTC-6 (México central)

void setup() {
    Serial.begin(115200);
    
    WiFi.begin(ssid, password);
    Serial.print("Conectando a WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConectado a WiFi");

    timeClient.begin();  // Iniciar el cliente NTP
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        int humedad = analogRead(sensorPin);
        humedad = map(humedad, 4095, 0, 0, 100); // Convertir a porcentaje

        // Obtener la fecha y hora
        timeClient.update();
        String fechaHora = timeClient.getFormattedTime();

        // Coordenadas fijas(cambiar por tus coordenadas)
        float latitud = 215.403830;
        float longitud = -03.111166;

        // Crear JSON con la estructura correcta
        StaticJsonDocument<256> jsonDoc;
        jsonDoc["sensor_id"] = sensorID;

        JsonObject ubicacion = jsonDoc.createNestedObject("ubicacion");
        ubicacion["latitud"] = latitud;
        ubicacion["longitud"] = longitud;

        JsonObject lectura = jsonDoc.createNestedObject("lectura");
        lectura["temperatura"] = temperatura;
        lectura["humedad"] = humedad;

        jsonDoc["timestamp"] = fechaHora;

        String jsonString;
        serializeJson(jsonDoc, jsonString);

        // Enviar datos por HTTP POST
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        int httpResponseCode = http.POST(jsonString);

        if (httpResponseCode > 0) {
            Serial.println("Datos enviados correctamente:");
            Serial.println(jsonString);
        } else {
            Serial.println("Error en la petición HTTP: " + String(httpResponseCode));
        }

        http.end();
    } else {
        Serial.println("Error: No conectado a WiFi");
    }

    delay(60000); // Esperar 1 minuto antes de la siguiente medición
}
