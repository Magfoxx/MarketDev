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
})

export default router;