import express from "express";
import { insertQuestions } from "../controllers/questionController.js";
import Questions from "../models/Questions.js";

const router = express.Router();

// Route pour insérer les questions depuis le fichier questionnaire.json dans la base de données
router.post("/insert", insertQuestions);


// Route pour récupérer toutes les questions triées
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find().sort({ sectionId: 1 });
    // console.log(questions)
    res.json(questions)
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error)
    res.status(500).json({ message: "Erreur lors de la récupération des questions" });
  }
});

// Route pour supprimer une question
router.delete("/questions/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    // On supprime la question dont l'id est questionId
    const result = await Questions.updateOne(
      { "questions.id": Number(questionId) },              // Cherche la section qui a une question avec l'id questionId
      { $pull: { questions: { id: questionId } } } // Retire du tableau la question correspondante
    );

    if (result.modifiedCount === 0) {
      // Aucune question n'a été supprimée
      return res.status(404).json({ message: "Question non trouvée" });
    }

    res.json({ message: "Question supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;