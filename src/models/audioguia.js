const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateUrl } = require("../helpers/db-validators");

const AudioguiaSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  url_audioguia: {
    type: String,
    required: [true, "The URL of the audioguide is required"],
    validate: [validateUrl, "Please enter a valid URL"],
  },
  id_checkpoint: {
    type: Number,
    required: [true, "El ID of checkpoint is required"],
  },
});

module.exports = mongoose.model("Audioguia", AudioguiaSchema);
