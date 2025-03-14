import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import questionRoutes from "./routes/questionsRoutes.js";

// Charger les variables d'environnement
dotenv.config();

// Initialisation du serveur
const app = express();
const port = process.env.PORT || 5001;

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes API
app.use("/api/questions", questionRoutes);

// Route principale pour tester l'API
app.get("/", (req, res) => {
  res.send("🚀 API en cours d'exécution !");
});

// Gestion des routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "❌ Route non trouvée" });
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err.message);
  res.status(err.status || 500).json({ message: err.message || "Erreur interne du serveur" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${port}`);
});