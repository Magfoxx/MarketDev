import express from "express";
import { insertQuestions } from "../controllers/questionController.js";
import Question from "../models/Questions.js";

const router = express.Router();

// Route pour insérer les questions
router.post("/insert", insertQuestions);

// Route pour récupérer toutes les questions triées
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ sectionOrder: 1, order: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "❌ Erreur lors de la récupération des questions" });
  }
});

// Nouvelle route pour récupérer les questions selon le statut de l'utilisateur
router.get("/:statut", async (req, res) => {
  try {
    const statut = req.params.statut;
    const questions = await Question.find({
      applicableTo: { $in: [statut] }
    }).sort({ sectionOrder: 1, order: 1 });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "❌ Erreur lors de la récupération des questions par statut" });
  }
});

export default router;