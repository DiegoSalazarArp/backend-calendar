const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");
require("dotenv").config();

// Crear el servidor de express.
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo de body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));


// Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});
