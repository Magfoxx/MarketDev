import axios from "axios";

const API_URL = "http://localhost:5001/api/questions";
export const getQuestions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error);
    return [];
  }
};