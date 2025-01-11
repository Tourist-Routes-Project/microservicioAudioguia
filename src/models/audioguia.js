const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AudioguiaSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url_audioguia: {
    type: String,
    required: true,
  },
  id_checkpoint: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Audioguia", AudioguiaSchema);
