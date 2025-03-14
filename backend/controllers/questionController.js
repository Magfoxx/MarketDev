import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Questions.js";

// Gérer le __dirname en mode ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const insertQuestions = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../data");

    // Vérifier si le dossier "data" existe
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Le dossier data n'existe pas à cet emplacement : ${dataPath}`);
    }

    const files = fs.readdirSync(dataPath);
    let allQuestions = [];

    files.forEach((file) => {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(dataPath, file);
          const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

          if (!jsonData || typeof jsonData !== "object" || !jsonData.questions) {
            console.warn(`⚠️ Format incorrect dans ${file} : le fichier doit contenir une structure JSON valide.`);
            return;
          }

          jsonData.questions.forEach((question) => {
            allQuestions.push({
              section: jsonData.section || "Section non définie",
              sectionTitle: jsonData.sectionTitle || "Sans titre",
              description: jsonData.description || "Pas de description fournie",
              sectionOrder: jsonData.sectionOrder ?? 0,
              step: question.step ?? jsonData.step ?? 0,
              order: question.order ?? 0,
              questionTitle: question.questionTitle || "Titre non défini",
              questionDescription: question.questionDescription || "Pas de description disponible",
              question: question.question || "Question non définie",
              type: question.type || "text",
              options: question.options || [],
              hasOtherOption: question.hasOtherOption || false,
              otherPlaceholder: question.otherPlaceholder || "",
              isRequired: question.isRequired || false,
              parentQuestion: question.parentQuestion || null,
              visibleIf: question.visibleIf || null,
              applicableTo: question.applicableTo || [],
              createdAt: new Date(),
            });
          });
        } catch (error) {
          console.error(`❌ Erreur lors de la lecture du fichier ${file}:`, error.message);
        }
      }
    });

    if (allQuestions.length === 0) {
      return res.status(400).json({ message: "Aucune question valide à insérer en base." });
    }

    // Supprimer les anciennes questions avant d'insérer les nouvelles
    await Question.deleteMany({});
    console.log("🗑 Anciennes questions supprimées.");

    await Question.insertMany(allQuestions);
    console.log(`✅ ${allQuestions.length} questions ont été insérées avec succès !`);
    res.status(201).json({ message: `${allQuestions.length} questions ajoutées avec succès !` });

  } catch (error) {
    console.error("❌ Erreur d'ajout :", error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout des questions", error: error.message });
  }
};