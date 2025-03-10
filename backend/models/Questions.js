import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  section: { type: String, required: true }, // Titre de la section
  sectionOrder: { type: Number, required: true }, // Ordre de la section
  order: { type: Number, required: true }, // Ordre dans la section
  question: { type: String, required: true }, // Texte de la question
  type: {
    type: String,
    required: true,
    enum: ["text", "radio", "checkbox", "textarea", "select", "boolean", "email", "multi-select"]
  },
  options: { type: [String], default: [] }, // Options pour les choix multiples
  hasOtherOption: { type: Boolean, default: false }, // Champ "Autre" si nécessaire
  otherPlaceholder: { type: String, default: "" }, // Placeholder pour "Autre"
  isRequired: { type: Boolean, default: false }, // Rend la question obligatoire
  parentQuestion: { type: mongoose.Schema.Types.ObjectId, ref: "Question", default: null }, // Question parent
  visibleIf: { type: Object, default: null }, // Condition pour afficher la question
  applicableTo: { type: [String], required: true }, // Ex: ["particulier", "tpe_pme"...]
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Question", QuestionSchema);