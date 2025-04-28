import express from "express";
import { insertQuestions } from "../controllers/questionController.js";
import Questions from "../models/Questions.js";

const router = express.Router();

// ➔ Insérer les questions depuis un fichier JSON
router.post("/insert", async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Le corps de la requête doit contenir un tableau de questions non vide." });
    }
    await insertQuestions(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion des questions :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'insertion des questions." });
  }
});

// ➔ Récupérer toutes les questions triées par sectionId
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find().sort({ sectionId: 1 });
    res.json(questions);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des questions." });
  }
});

// ➔ Supprimer une question par son ID
router.delete("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const result = await Questions.updateOne(
      { "questions.id": Number(questionId) },
      { $pull: { questions: { id: Number(questionId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "❌ Question non trouvée." });
    }

    res.json({ message: "✅ Question supprimée avec succès." });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la question :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression de la question." });
  }
});

export default router;