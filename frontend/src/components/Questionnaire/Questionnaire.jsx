import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import QuestionInput from "./QuestionInput";

const Questionnaire = () => {
  // États
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Permet l'affichage des sections

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/questions")
      .then((response) => {
        setQuestions(response.data);
        setChargement(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement :", err);
        setErreur("Désolé, une erreur s'est produite pendant la préparation.");
        setChargement(false);
      });
  }, []);

  if (chargement)
    return (
      <div className="flex items-center justify-center">
        <span className="loader">Chargement...</span>
      </div>
    );
  if (erreur) return <div>{erreur}</div>;
  if (!questions.length) return <div>Aucune donnée disponible.</div>;

  // Définition de la fonction qui vérifie si une question doit être affichée
  const doitAfficherQuestion = (question) => {
    // Si la question n'a pas de conditions, on l'affiche
    if (!question.conditions || question.conditions.length === 0) return true;
    // Sinon, on vérifie que toutes les conditions sont remplies
    return question.conditions.every((cond) => {
      const rep = reponses[cond.questionId];
      return cond.equals.includes(rep);
    });
  };

  const affichageSection = () => {
    // Récupérer la section actuelle grâce à l'indice
    const sectionActuel = questions[currentSectionIndex];
    // Afficher la section actuelle
    return (
      <div>
        <div>
          <h4 className="h4 uppercase tracking-wide !font-extrabold text-center">
            {sectionActuel.sectionTitle}
          </h4>
          <p className="bg-gray-300 dark:bg-gray-700 rounded-2xl text-center p-4 italic">
            {sectionActuel.sectionDescription}
          </p>
        </div>
        <div className="my-7">
          {sectionActuel.questions.map(
            (question) =>
              doitAfficherQuestion(question) && (
                <div key={question.id}>
                  <p className="!mt-5">
                    {question.text}
                    {question.isRequired && (
                      <span className="text-red-500"> * </span>
                    )}
                  </p>
                  <QuestionInput
                    question={question}
                    valeur={reponses[question.id]}
                    onChangement={gererChangementInput}
                    onChangementCheckbox={gererChangementCheckbox}
                  />
                </div>
              )
          )}
        </div>
      </div>
    );
  };

  const gererChangementInput = (questionId, valeur) => {
    setReponses({ ...reponses, [questionId]: valeur });
  };

  const gererChangementCheckbox = (idQuestion, valeurOption) => {
    const selectionsActuelles = reponses[idQuestion] || [];
    const nouvelleValeur = selectionsActuelles.includes(valeurOption)
      ? selectionsActuelles.filter((v) => v !== valeurOption)
      : [...selectionsActuelles, valeurOption];
    setReponses((prev) => ({ ...prev, [idQuestion]: nouvelleValeur }));
  };

  return (
    <div className="max-padd-container bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 md:w-[600px] h-auto">
      {affichageSection()}
      <div className="flex justify-between mt-4">
        <div className="flex flex-end">
          {currentSectionIndex > 0 && (
            <button
              onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
              className="btn-secondary"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <div className="flex flex-start ">
          {currentSectionIndex < questions.length - 1 && (
            <button
              onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
              className="btn-primary"
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
