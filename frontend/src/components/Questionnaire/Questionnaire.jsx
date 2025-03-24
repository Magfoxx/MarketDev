import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import QuestionInput from "./QuestionInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Questionnaire = () => {
  // États
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [erreursFormulaire, setErreursFormulaire] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Affichage des sections

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

  // Exemple de tableau d'emails déjà utilisés pour la validation email
  const emailsUtilises = ["exemple@domaine.com", "test@example.com"];

  // Fonction de validation d'une question (pour le type email : format et unicité)
  const validerQuestion = (question, reponse) => {
    if (!reponse || (typeof reponse === "string" && reponse.trim() === "")) {
      return "Ce champ est requis *";
    }
    if (question.type === "email" && reponse) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(reponse.trim())) {
        return "Veuillez entrer une adresse email valide *";
      }
      if (emailsUtilises.includes(reponse.trim().toLowerCase())) {
        return "Cet email est déjà utilisé *";
      }
    }
    return "";
  };

  // Fonction qui vérifie si une question doit être affichée en fonction des conditions
  const doitAfficherQuestion = (question) => {
    if (!question.conditions || question.conditions.length === 0) return true;
    return question.conditions.every((cond) => {
      const rep = reponses[cond.questionId];
      return cond.equals.includes(rep);
    });
  };

  // Fonction de validation de la section actuelle
  const validerSectionActuelle = () => {
    const sectionActuel = questions[currentSectionIndex];
    let estValide = true;
    let erreurs = {};

    sectionActuel.questions.forEach((question) => {
      if (doitAfficherQuestion(question) && question.isRequired) {
        const rep = reponses[question.id];
        let erreur = "";
        if (question.type === "email") {
          erreur = validerQuestion(question, rep);
        } else {
          if (!rep || (typeof rep === "string" && rep.trim() === "")) {
            erreur = "Ce champ est requis *";
          }
        }
        // Vérification pour le cas où la réponse principale est "autre"
        if (question.type === "multi-select") {
          // Pour multi-select, rep est supposé être un tableau
          if (Array.isArray(rep) && rep.includes("autre")) {
            const repAutre = reponses[`${question.id}_other`];
            if (!repAutre || repAutre.trim() === "") {
              erreur = "Veuillez préciser votre réponse pour 'autre' *";
            }
          }
        } else {
          if (rep === "autre") {
            const repAutre = reponses[`${question.id}_other`];
            if (!repAutre || repAutre.trim() === "") {
              erreur = "Veuillez préciser votre réponse pour 'autre' *";
            }
          }
        }
        if (erreur !== "") {
          estValide = false;
          erreurs[question.id] = erreur;
        }
      }
    });
    setErreursFormulaire(erreurs);
    if (!estValide) {
      toast.error("Veuillez remplir tous les champs requis de cette section.");
    }
    return estValide;
  };

  // Affichage de la section actuelle
  const affichageSection = () => {
    const sectionActuel = questions[currentSectionIndex];
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
                    // On passe également la valeur complémentaire, si existante, via la clé question.id+"_other"
                    valeurComplementaire={reponses[`${question.id}_other`]}
                    erreur={erreursFormulaire[question.id]}
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

  // Fonction de gestion des changements pour les inputs simples
  const gererChangementInput = (questionId, valeur) => {
    setReponses({ ...reponses, [questionId]: valeur });
  };

  // Fonction de gestion des changements pour les checkboxes (multi-select)
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
        <div className="flex">
          {currentSectionIndex > 0 && (
            <button
              onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
              className="btn-secondary py-2 px-4 text-lg"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <div className="flex">
          {currentSectionIndex < questions.length - 1 && (
            <button
              onClick={() => {
                if (validerSectionActuelle()) {
                  setCurrentSectionIndex(currentSectionIndex + 1);
                }
              }}
              className="btn-primary py-2 px-4 text-lg ml-auto"
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
