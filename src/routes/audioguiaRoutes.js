const express = require("express");
const router = express.Router();
const audioguiaController = require("../controllers/audioguiaController");

router.get("/api/v1/audioguides", audioguiaController.getAllAudioguia);
router.post("/api/v1/audioguide", audioguiaController.createAudiguia);

module.exports = router;
