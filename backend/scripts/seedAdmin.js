// backend/scripts/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

// Charge le fichier .env depuis la racine du projet
dotenv.config({ path: "../.env" });
// Vérifier que MONGO_URI est bien chargé
if (!process.env.MONGO_URI) {
  console.error("Erreur: La variable d'environnement MONGO_URI n'est pas définie.");
  process.exit(1);
}

console.log("MONGO_URI =", process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    // Connexion à la base de données
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion à MongoDB réussie");

    // Récupérer l'email et le mot de passe depuis le fichier .env
    const email = process.env.ADMIN_EMAIL;
    const motDePasseClair = process.env.ADMIN_PASSWORD;

    if (!email || !motDePasseClair) {
      throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans le fichier .env");
    }

    // Créer l'administrateur (le mot de passe sera haché par le middleware pre‑save dans le modèle Admin "models/Admin.js")
    const admin = await Admin.create({
      email: email.trim().toLowerCase(),
      password: motDePasseClair,
    });

    console.log("Administrateur inséré avec succès :", admin);
    process.exit();
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'administrateur :", error.message);
    process.exit(1);
  }
};

seedAdmin();