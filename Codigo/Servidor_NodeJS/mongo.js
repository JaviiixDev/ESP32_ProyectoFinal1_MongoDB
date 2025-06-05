// Importamos MongoClient desde la librería 'mongodb' para conectar con MongoDB
const { MongoClient } = require("mongodb");

// uri de conexión a MongoDB  
const uri = "YOUR-URI";

// Creamos una instancia de MongoClient utilizando la URI proporcionada
const client = new MongoClient(uri);

/**
 * Función asíncrona para insertar un documento en una coleccion.
 * @param {Object} datos - Objeto que representa el post a insertar en la base de datos.
 */
async function insertarPost(datos) {
    try {
        // Conectamos al servidor de MongoDB Atlas
        await client.connect();

        // Seleccionamos la base de datos
        const db = client.db("SensoresDB");

        // Seleccionamos la colección 
        const collection = db.collection("Lecturas");

        // Insertamos el documento (datos)
        const resultado = await collection.insertOne(datos);

        // Mostramos en consola el ID del documento insertado
        console.log("Post insertado con ID:", resultado.insertedId);
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante la inserción
        console.error("Error al insertar post:", error);
    } finally {
        // Cerramos la conexión a la base de datos
        await client.close();
    }
}

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = { insertarPost };
