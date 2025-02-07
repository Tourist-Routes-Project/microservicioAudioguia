const express = require("express");
const router = express.Router();
const audioguiaController = require("../controllers/audioguiaController");

router.get("/api/v1/audioguides", audioguiaController.getAllAudioguia);
router.post("/api/v1/audioguide", audioguiaController.createAudiguia);
router.put("/api/v1/audioguide/:id", audioguiaController.editarAudioguia);
router.delete("/api/v1/audioguide/:id", audioguiaController.eliminarAudioguia);
router.get(
  "/api/v1/audioguide/checkpoint/:id_checkpoint",
  audioguiaController.getAudioguiaByCheckpoint
);

module.exports = router;
