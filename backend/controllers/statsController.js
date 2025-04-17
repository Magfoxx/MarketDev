import ResponseModel from "../models/Response.js";
import analysisService from "../services/analysisService.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Récupérer toutes les réponses de la collection
    const responses = await ResponseModel.find();

    // Utiliser le service pour analyser les réponses
    const stats = analysisService.analyzeResponses(responses);

    // Retourner les statistiques sous forme de JSON
    res.status(200).json(stats);
  } catch (error) {
    console.error("Erreur dans getDashboardStats:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des réponses" });
  }
};