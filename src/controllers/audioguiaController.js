const Audioguia = require("../models/audioguia");

const audioguiaController = {
  getAllAudioguia: async (req, res) => {
    try {
      const audioguias = await Audioguia.find();
      res.status(200).json(audioguias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error del servidor" });
    }
  },

  createAudiguia: async (req, res) => {
    try {
      const newAudioguia = new Audioguia(req.body);
      await newAudioguia.save();
      res.status(201).json(newAudioguia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la audioguía" });
    }
  },
};

module.exports = audioguiaController;
