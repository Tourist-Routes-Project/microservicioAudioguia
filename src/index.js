// Importamos dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();
mongoose.set("strictQuery", false);

// Habilitar CORS para manejar las solicitudes
app.use(cors());
app.use(express.json());

