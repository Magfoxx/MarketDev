import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import questionRoutes from "./routes/questionsRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: "https://marketdev-uroz.onrender.com",
  credentials: true,
};

connectDB();

app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://marketdev-uroz.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/admin", adminRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("🚀 API en cours d'exécution !");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "❌ Route non trouvée" });
});

app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err.message);
  res.status(err.status || 500).json({ message: err.message || "Erreur interne du serveur" });
});

app.listen(port, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${port}`);
});