import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Response", ResponseSchema);