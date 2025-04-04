import mongoose from "mongoose";

// Schéma pour une option d'une question
const OptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    colors: { type: [String], default: [] },
    description: { type: String },
    requiresTextInput: { type: Boolean, default: false },
    nextStep: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

// Schéma pour une question
const SubQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    placeholder: { type: String },
    unique: { type: Boolean },
    options: { type: [OptionSchema], default: [] },
    nextStep: { type: mongoose.Schema.Types.Mixed },
    conditions: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { _id: false }
);

// Schéma pour une section de questions
const QuestionSectionSchema = new mongoose.Schema({
  sectionId: { type: Number, required: true },
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  questions: { type: [SubQuestionSchema], required: true },
});

export default mongoose.model("Questions", QuestionSectionSchema);