const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL est manquant. Vérifiez votre .env.");
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});