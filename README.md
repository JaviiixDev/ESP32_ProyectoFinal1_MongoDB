-------------------------------------------------------------------------------
Este proyecto consiste en un sistema de monitoreo de humedad y temperatura utilizando una ESP32 y un sensor de humedad del suelo YL-69. 
La ESP32 lee los valores del sensor, los convierte a un formato adecuado y los envía a un servidor mediante una petición HTTP POST en formato JSON.

Los datos incluyen:

Identificación del sensor
Ubicación geográfica (latitud y longitud)
Lecturas de temperatura y humedad
Marca de tiempo (timestamp) en milisegundos
El servidor almacena los datos en una base de datos MongoDB.
-------------------------------------------------------------------------------
Pasos para ejecutarlo(Antes de nada debe de instalarse node.js desde su pagina oficial y en tu cluster debe haber una base de datos llamada "SensoresDB" con una coleccion llamada "Lecturas"):
1. Armar el circuito especificado en la ruta "\Proyecto_ESP32_MongoDB\Diagrama_Conexiones.png"

2. Entrar en el archivo en la ruta "\Codigo\Servidor_NodeJS\mongo.js" y modificar la "const uri" por la uri de tu cluster,
esta se obtiene llendo a la web de mongoDB>DATABASE>Cluster>"Tu Cluster">Connect>Drivers seleccionas node.js en el 1 y copias la cadena del 3.

3. Entrar a la carpeta del proyecto desde CMD

4. Entrar a la ruta \Codigo\Servidor_NodeJS

5. Ejecutar "server.js" desde cmd con el comando "node server.js"

6. Si aparece el mensaje: Servidor corriendo en http://localhost:3000 significa que el servidor ya esta activo

7. Abrir el codigo en la ruta "\Codigo\ESP32" con ArduinoIDE

8. Cambiar las variables "ssid", "password","serverUrl" por el nombre y contraseña correcto de tu wifi al igual la ip de tu computadora en "ServerURL"

9. Automaticamente la ESP32 deberia de enviar datos cada minuto al servidor y el servidor a MongoDB
