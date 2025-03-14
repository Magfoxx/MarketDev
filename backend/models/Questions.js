import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  sectionTitle: { type: String, required: true },
  description: { type: String, required: true },
  sectionOrder: { type: Number, required: true },
  step: { type: Number, required: true },
  order: { type: Number, required: true },
  questionTitle: { type: String, required: true },
  questionDescription: { type: String, required: true },
  question: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["text", "radio", "checkbox", "textarea", "select", "boolean", "email", "multi-select"]
  },
  options: { type: Array, default: [] },
  hasOtherOption: { type: Boolean, default: false },
  otherPlaceholder: { type: String, default: "" },
  isRequired: { type: Boolean, default: false },
  parentQuestion: { type: mongoose.Schema.Types.ObjectId, ref: "Question", default: null },
  visibleIf: { type: Object, default: null },
  applicableTo: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Question", QuestionSchema);