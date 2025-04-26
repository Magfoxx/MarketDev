import { api } from "./api";

export const getQuestions = async () => {
  try {
    const response = await api.get("/questions");
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des questions :", error);
    return [];
  }
};