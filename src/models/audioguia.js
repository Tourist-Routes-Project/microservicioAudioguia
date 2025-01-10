const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Audioguia = new Schema({
  id: {
    type: number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  url_audioguia: {
    type: String,
    require: true,
  },
  id_checkpoint: {
    type: number,
    require: true,
  },
});

module.exports = mongoose.model("Audioguia", Audioguia);
