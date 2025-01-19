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

  editarAudioguia: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedAudioguia = await Audioguia.findByIdAndUpdate(
        id, // ID de la audioguía
        updates, // Datos a actualizar
        { new: true, runValidators: true }
      );

      // Si no se encuentra la audioguía, mandanmos un error 404
      if (!updatedAudioguia) {
        return res.status(404).json({ error: "Audioguide not found" });
      }
      // Devolver la audioguía actualizada
      res.status(200).json(updatedAudioguia);
    } catch (error) {
      console.error(error);

      // Si el error es un ValidationError, respondemos con un error 400
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }

      // Si ocurre otro tipo de error, respondemos con un error 500
      res.status(500).json({ error: "Error when updating the audioguide" });
    }
  },

  eliminarAudioguia: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteAudioguide = await Audioguia.findByIdAndDelete(id);
      // Si no se encuentra la audioguía, mandanmos un error 404
      if (!deleteAudioguide) {
        return res.status(404).json({ error: "Audioguide not found" });
      }
      // Devolver la audioguía elimininada
      res.status(200).json(deleteAudioguide);
    } catch (error) {
      res.status(500).json({ error: "Error when deleting the audioguide" });
    }
  },
};

module.exports = audioguiaController;
