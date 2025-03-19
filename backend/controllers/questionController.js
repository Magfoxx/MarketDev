import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Questions.js"; // Notre modèle représente une section de questions

// Recréer __dirname en mode ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const insertQuestions = async (req, res) => {
  try {
    // Chemin vers le fichier questionnaire.json
    const filePath = path.join(__dirname, "../data/questionnaire.json");

    // Vérifier que le fichier existe
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        message: `Le fichier questionnaire.json n'existe pas ici : ${filePath}`
      });
    }

    // Lire et analyser le contenu du fichier JSON
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Vérifier que le contenu est un tableau de sections
    if (!Array.isArray(jsonData)) {
      return res.status(400).json({
        message: "Format incorrect : le fichier doit contenir un tableau de sections."
      });
    }

    // Transformer chaque section et ses questions en ajoutant éventuellement des valeurs par défaut
    const sections = jsonData.map((section) => ({
      sectionId: section.sectionId || null,
      sectionTitle: section.sectionTitle || "Sans titre",
      sectionDescription: section.sectionDescription || "Pas de description",
      questions: Array.isArray(section.questions)
        ? section.questions.map((question) => ({
          id: question.id || null,
          text: question.text || "Question non définie",
          type: question.type || "text",
          isRequired: question.isRequired || false,
          placeholder: question.placeholder || "",
          unique: question.unique || false,
          options: question.options || [],
          colors: question.colors || [],
          nextStep: question.nextStep || null,
          createdAt: new Date(),
        }))
        : [],
    }));

    // Supprimer les anciennes sections de questions avant d'insérer les nouvelles
    await Question.deleteMany({});
    await Question.insertMany(sections);

    res.status(201).json({
      message: `${sections.length} sections de questions ajoutées avec succès !`
    });
  } catch (error) {
    console.error("Erreur lors de l'insertion :", error.message);
    res.status(500).json({
      message: "Erreur lors de l'insertion des questions",
      error: error.message
    });
  }
};