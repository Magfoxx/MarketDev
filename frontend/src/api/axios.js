import axios from "axios";

// Définit une URL de secours si VITE_API_URL n'est pas définie
const API_URL = import.meta.env.VITE_API_URL || "https://marketdev-bakend.onrender.com/api";

if (!API_URL) {
  throw new Error("VITE_API_URL est manquant. Vérifiez votre fichier .env");
}

// Création de l'instance axios
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important pour les cookies/session
});