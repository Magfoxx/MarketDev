import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getStatsDetails,
} from "../controllers/statsController.js";

const router = express.Router();

// Vérifie le token JWT d'un admin
router.get("/verify", verifyAdminToken, (req, res) => {
  res.status(200).json({ message: "Token valide", admin: req.admin });
});

// Statistiques globales pour le Dashboard
router.get("/stats", verifyAdminToken, getDashboardStats);

// Statistiques détaillées pour la section Statistiques
router.get("/stats-details", verifyAdminToken, getStatsDetails);

// Connexion admin (authentification)
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et mot de passe sont requis." });
    }

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(password.trim(), admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur de connexion admin :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la connexion admin." });
  }
});

export default router;