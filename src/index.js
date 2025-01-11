// Importamos dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Instancia de Expresss
const app = express();

// Importar las rutas
const audioguiaRoutes = require("./routes/audioguiaRoutes");

require("dotenv").config();
mongoose.set("strictQuery", false);

// Habilitar CORS para manejar las solicitudes
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use(audioguiaRoutes);

//Funcion para conectar a la base de datos
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
}

//Llamamos a la función
main().catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(
    `El servidor está en funcionamiento en el puerto ${process.env.PORT}`
  );
});
