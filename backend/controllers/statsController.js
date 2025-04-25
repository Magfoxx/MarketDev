import ResponseModel from "../models/Response.js";
import analysisDashboard from "../services/analysisDashboard.js";
import analysisStats from "../services/analysisStats.js";
import analysisUsers from "../services/analysisUsers.js";


export const getDashboardStats = async (req, res) => {
  try {
    // Récupérer toutes les réponses de la collection
    const responses = await ResponseModel.find();
    // console.log("📊 getDashboardStats - Nombre de réponses :", responses.length);
    const stats = analysisDashboard.analyzeResponses(responses);
    // console.log("Résultat de l'analyse :", stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Erreur dans getDashboardStats:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des réponses" });
  }
};

export const getStatsDetails = async (req, res) => {
  try {
    const responses = await ResponseModel.find();
    console.log("📊 getStatsDetails - Nombre de réponses :", responses.length);
    const stats = analysisStats.analyzeStats(responses);
    // console.log("Résultat de l'analyse :", stats);
    // console.log("📊 Stats détaillées :", stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Erreur dans getStatsDetails:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des statistiques" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const responses = await ResponseModel.find();
    const userDetails = analysisUsers(responses);
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Erreur dans getUserDetails:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'analyse des utilisateurs" });
  }
};