import mongoose from "mongoose";

// Schéma pour chaque option d'une question
const OptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    colors: { type: [String], default: [] },
    description: { type: String }, // Optionnel : toutes les options n'ont pas de description.
    requiresTextInput: { type: Boolean, default: false },
    nextStep: { type: mongoose.Schema.Types.Mixed } // Peut être un objet complexe.
  },
  { _id: false }
);

// Schéma pour chaque question
const SubQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    placeholder: { type: String }, // Présent uniquement pour certaines questions.
    unique: { type: Boolean },
    options: { type: [OptionSchema], default: [] }, // Vide si la question n'a pas d'options.
    nextStep: { type: mongoose.Schema.Types.Mixed }, // Pour les questions avec des sauts conditionnels.
    conditions: { type: [mongoose.Schema.Types.Mixed], default: [] }
  },
  { _id: false }
);

// Schéma pour une section de questions
const QuestionSectionSchema = new mongoose.Schema({
  sectionId: { type: Number, required: true },
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  questions: { type: [SubQuestionSchema], required: true }
});

export default mongoose.model("Questions", QuestionSectionSchema);