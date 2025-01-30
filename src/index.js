// Importamos dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Eureka } = require("eureka-js-client");
const actuator = require("express-actuator");

// Instancia de Express
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

// Configuración de Actuator con datos personalizados
app.use(
  actuator({
    basePath: "/actuator",
    info: {
      app: {
        name: "Microservicio Audioguías",
        description: "Microservicio para gestionar audioguías.",
        version: "1.0.0",
      },
      build: {
        name: "microservicioaudioguias",
        description: "Descripción del microservicio.",
        version: "1.0.0",
      },
    },
  })
);

// Función para conectar a la base de datos
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`The server is listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
}

// Configuración de Eureka
const eurekaClient = new Eureka({
  instance: {
    app: "audioguia",
    instanceId: `192.168.1.46:audioguia:${process.env.PORT}`,
    hostName: "192.168.1.46",
    ipAddr: "192.168.1.46",
    port: {
      $: process.env.PORT,
      "@enabled": true,
    },
    vipAddress: "audioguia",
    healthCheckUrl: `http://192.168.1.46:${process.env.PORT}/actuator/health`,
    statusPageUrl: `http://192.168.1.46:${process.env.PORT}/actuator/info`,
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
    preferIpAddress: true,
  },
});

// Inicia el cliente Eureka
eurekaClient.start((error) => {
  if (error) {
    console.log("Error al registrar en Eureka:", error);
  } else {
    console.log("Microservicio Audioguía registrado en Eureka");
  }
});

// Llamamos a la función
main().catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});
