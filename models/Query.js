const mongoose = require("mongoose");

const Querychema = mongoose.Schema({
  name: String,
  email: String,
  project: String,
  message: String,
});

module.exports = mongoose.model("Query", Querychema);
