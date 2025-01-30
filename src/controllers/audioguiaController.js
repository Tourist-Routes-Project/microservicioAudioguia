const Audioguia = require("../models/audioguia");
const axios = require("axios");

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
    const { id_checkpoint, title, url_audioguia } = req.body;

    try {
      // Verificar si el checkpoint existe en el microservicio de routeCheckpoint
      const response = await axios.get(
        `http://routeCheckpoint/api/v1/checkpoint/${id_checkpoint}`
      );
      const checkpoint = response.data;

      // Si el checkpoint existe, crear la audioguía
      const newAudioguia = new Audioguia({
        title,
        url_audioguia,
        id_checkpoint,
      });
      await newAudioguia.save();

      res.status(201).json(newAudioguia);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ error: "Checkpoint not found" });
      }
      console.error(error);
      res.status(500).json({ error: "Error when creating the audioguide" });
    }
  },

  // Editar una audioguía
  editarAudioguia: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedAudioguia = await Audioguia.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedAudioguia) {
        return res.status(404).json({ error: "Audioguide not found" });
      }
      res.status(200).json(updatedAudioguia);
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error when updating the audioguide" });
    }
  },

  // Eliminar una audioguía
  eliminarAudioguia: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAudioguide = await Audioguia.findByIdAndDelete(id);
      if (!deleteAudioguide) {
        return res.status(404).json({ error: "Audioguide not found" });
      }
      res.status(200).json(deleteAudioguide);
    } catch (error) {
      res.status(500).json({ error: "Error when deleting the audioguide" });
    }
  },
};

module.exports = audioguiaController;
