import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis." });
    }

    console.log("Tentative de connexion pour l'email :", email);

    // Recherche de l'administrateur en nettoyant l'email
    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      console.log("Aucun administrateur trouvé pour l'email :", email);
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const passwordClean = password.trim();
    console.log("Mot de passe saisi :", passwordClean);
    console.log("Hash en BD :", admin.password);

    const isMatch = await bcrypt.compare(passwordClean, admin.password);
    console.log("Mot de passe valide ?", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Génération du token JWT (expire après 1h)
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion admin :", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
});

export default router;