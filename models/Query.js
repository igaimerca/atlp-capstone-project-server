import mongoose from "mongoose";

const Querychema = mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

export default mongoose.model("Query", Querychema);
