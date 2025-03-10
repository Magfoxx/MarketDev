import Question from "../models/Questions.js";
import questionsData from "../data/questions.json" with { type: "json" };

export const insertQuestions = async (req, res) => {
  try {
    const formattedQuestions = questionsData.flatMap((section) =>
      section.questions.map((question) => ({
        ...question,
        section: section.section,
        sectionOrder: section.sectionOrder
      }))
    );

    await Question.insertMany(formattedQuestions);
    console.log("✅ Questions insérées en base !");
    res.status(201).json({ message: "Questions ajoutées avec succès !" });
  } catch (error) {
    console.error("❌ Erreur d'ajout :", error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout des questions" });
  }
};