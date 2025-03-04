import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// Initialisation du serveur
const app = express();
const port = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 API en cours d'exécution !");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${port}`);
});