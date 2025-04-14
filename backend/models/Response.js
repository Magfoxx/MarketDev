import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Response", ResponseSchema);