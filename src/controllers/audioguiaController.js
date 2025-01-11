const Audioguia = require("../models/audioguia");

const audioguiaController = {
  // Obtener todas las audioguías desde la base de datos
  getAllAudioguia: async (req, res) => {
    try {
      // Buscamos todas las audioguías
      const audioguias = await Audioguia.find();
      res.status(200).json(audioguias);
    } catch (error) {
      console.error(error);
      // Si hay un error en el servidor, respondemos con el estado 500
      res.status(500).json({ error: "Server error" });
    }
  },

  // Crear una nueva audioguía
  createAudiguia: async (req, res) => {
    try {
      // Creamos un nuevo objeto Audioguia con los datos del body
      const newAudioguia = new Audioguia(req.body);
      // Guardamos la audioguía en la base de datos
      await newAudioguia.save();
      //Devolvemos el estado 201
      res.status(201).json(newAudioguia);
    } catch (error) {
      console.error(error);

      // Si el error es un ValidationError, mostramos un mensaje personalizado
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error when creating the audioguide" });
    }
  },
};

module.exports = audioguiaController;
