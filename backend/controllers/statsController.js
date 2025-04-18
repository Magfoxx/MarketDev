import ResponseModel from "../models/Response.js";
import analysisDashboard from "../services/analysisDashboard.js";
import analysisStats from "../services/analysisStats.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Récupérer toutes les réponses de la collection
    const responses = await ResponseModel.find();

    // Utiliser le service pour analyser les réponses
    const stats = analysisDashboard.analyzeResponses(responses);

    // Retourner les statistiques sous forme de JSON
    res.status(200).json(stats);
  } catch (error) {
    console.error("Erreur dans getDashboardStats:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des réponses" });
  }
};

export const getStatsDetails = async (req, res) => {
  try {
    const responses = await ResponseModel.find();
    const stats = analysisStats.analyzeStats(responses);
    // console.log("📊 Stats détaillées :", stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Erreur dans getStatsDetails:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des statistiques" });
  }
};