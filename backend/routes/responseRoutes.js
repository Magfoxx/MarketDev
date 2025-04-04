import express from "express";
import Response from "../models/Response.js";

const router = express.Router();

// Route pour enregistrer les réponses utilisateur
router.post("/", async (req, res) => {
  try {
    const responsesData = req.body;
    // Supposons que l'email se trouve à la clé "3"
    const email = responsesData["3"]?.trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ message: "L'email est requis." });
    }
    // Créer une réponse en stockant l'email directement dans le document
    const newResponse = await Response.create({ email, data: responsesData });
    res.status(201).json({ message: "Réponses enregistrées avec succès", response: newResponse });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error.message);
    res.status(500).json({ message: "Erreur lors de l'enregistrement des réponses", error: error.message });
  }
});

// Route pour récupérer toutes les réponses (filtrées par email si fourni)
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    let filter = {};
    if (email) {
      // On filtre par email en s'assurant que celui-ci est en minuscule et sans espaces superflus
      filter = { email: email.trim().toLowerCase() };
    }
    const responses = await Response.find(filter);
    res.json(responses);
  } catch (error) {
    console.error("Erreur lors de la récupération des réponses :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des réponses", error: error.message });
  }
});

export default router;