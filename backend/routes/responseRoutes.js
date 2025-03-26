import express from "express";
import Response from "../models/Response.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const responsesData = req.body;
    const newResponse = await Response.create({ data: responsesData });
    res.status(201).json({ message: "Réponses enregistrées avec succès", response: newResponse });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des réponses :", error.message);
    res.status(500).json({ message: "Erreur lors de l'enregistrement des réponses", error: error.message });
  }
});

export default router;