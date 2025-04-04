import express from "express";
import { insertQuestions } from "../controllers/questionController.js";
import Questions from "../models/Questions.js";

const router = express.Router();

// Insérer les questions depuis le fichier JSON
router.post("/insert", insertQuestions);

// Récupérer toutes les questions triées par sectionId
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find().sort({ sectionId: 1 });
    res.json(questions);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des questions" });
  }
});

// Supprimer une question par son id (dans la section)
router.delete("/questions/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const result = await Questions.updateOne(
      { "questions.id": Number(questionId) },
      { $pull: { questions: { id: questionId } } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Question non trouvée" });
    }
    res.json({ message: "Question supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;