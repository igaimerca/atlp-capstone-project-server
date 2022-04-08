const mongoose = require("mongoose");

const Userchema = mongoose.Schema({
  name: String,
  email: String,
  position: String,
  experience: String,
  company: String,
  password: String,
  role: {
      type: String,
      enum: ['admin', 'standard'],
      default: 'admin'
  }
});

module.exports = mongoose.model("User", Userchema);
