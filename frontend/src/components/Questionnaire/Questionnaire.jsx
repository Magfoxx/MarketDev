import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import QuestionInput from "./QuestionInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gererRedirection from "./QuestionnaireRedirection"; // Fonction de redirection externalisée

const Questionnaire = () => {
  // États
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [erreursFormulaire, setErreursFormulaire] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

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
      <div className="flex items-center justify-center h-[70vh]">
        <span className="loader">Chargement...</span>
      </div>
    );
  if (erreur) return <div>{erreur}</div>;
  if (!questions.length) return <div>Aucune donnée disponible.</div>;

  // Exemple d'emails déjà utilisés (pour validation email)
  const emailsUtilises = ["exemple@domaine.com", "test@example.com"];

  // Fonction de validation d'une question
  const validerQuestion = (question, rep) => {
    if (question.type === "multi-select") {
      if (!Array.isArray(rep) || rep.length === 0) {
        return "Ce champ est requis *";
      }
      if (rep.includes("autre")) {
        const repAutre = reponses[`${question.id}_other`];
        if (!repAutre || repAutre.trim() === "") {
          return "Veuillez préciser votre réponse *";
        }
      }
    } else {
      if (!rep || (typeof rep === "string" && rep.trim() === "")) {
        return "Ce champ est requis *";
      }
      if (question.type === "email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(rep.trim())) {
          return "Veuillez entrer une adresse email valide *";
        }
        if (emailsUtilises.includes(rep.trim().toLowerCase())) {
          return "Cet email est déjà utilisé *";
        }
      }
    }
    return "";
  };

  // Vérifie si une question doit être affichée en fonction de ses conditions
  const doitAfficherQuestion = (question) => {
    if (!question.conditions || question.conditions.length === 0) return true;
    return question.conditions.every((cond) => {
      const rep = reponses[cond.questionId];
      return cond.equals.includes(rep);
    });
  };

  // Validation de la section actuelle
  const validerSectionActuelle = () => {
    const sectionActuel = questions[currentSectionIndex];
    let estValide = true;
    let erreurs = {};

    sectionActuel.questions.forEach((question) => {
      if (doitAfficherQuestion(question) && question.isRequired) {
        const rep = reponses[question.id];
        const erreurMsg = validerQuestion(question, rep);
        if (erreurMsg) {
          estValide = false;
          erreurs[question.id] = erreurMsg;
        }
      }
    });

    setErreursFormulaire(erreurs);
    if (!estValide) {
      toast.error("Veuillez remplir tous les champs requis de cette section.");
    }
    return estValide;
  };

  // Fonction qui retourne la couleur associée au statut (basée sur la question 4)
  const getStatusColor = () => {
    const statut = reponses["4"];
    switch (statut) {
      case "particulier":
        return "red";
      case "auto_entrepreneur":
        return "green";
      case "tpe_pme":
        return "blue";
      case "sarl_eurl_sas_sasu":
        return "orange";
      case "grande_entreprise":
        return "yellow";
      default:
        return "";
    }
  };

  // Gestion des changements pour les inputs simples
  const gererChangementInput = (questionId, valeur) => {
    setReponses((prev) => ({ ...prev, [questionId]: valeur }));
  };

  // Gestion des changements pour les checkboxes (multi-select)
  const gererChangementCheckbox = (idQuestion, valeurOption) => {
    const selectionsActuelles = reponses[idQuestion] || [];
    const nouvelleValeur = selectionsActuelles.includes(valeurOption)
      ? selectionsActuelles.filter((v) => v !== valeurOption)
      : [...selectionsActuelles, valeurOption];
    setReponses((prev) => ({ ...prev, [idQuestion]: nouvelleValeur }));
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
                  <p className="!mt-5 !text-secondary dark:!text-white !font-semibold">
                    {question.text}
                    {question.isRequired && (
                      <span className="text-red-500"> * </span>
                    )}
                  </p>
                  <QuestionInput
                    question={question}
                    valeur={reponses[question.id]}
                    valeurComplementaire={reponses[`${question.id}_other`]}
                    erreur={erreursFormulaire[question.id]}
                    onChangement={gererChangementInput}
                    onChangementCheckbox={gererChangementCheckbox}
                    statusColor={getStatusColor()}
                  />
                </div>
              )
          )}
        </div>
      </div>
    );
  };

  // Bouton "Suivant" : Validation puis redirection ou passage à la section suivante
  const boutonSuivant = () => {
    if (validerSectionActuelle()) {
      const sectionActuel = questions[currentSectionIndex];
      // Recherche la première question qui possède une propriété nextStep dans la section
      const questionAvecNextStep = sectionActuel.questions.find(
        (q) => q.nextStep
      );
      if (questionAvecNextStep) {
        const valeur = reponses[questionAvecNextStep.id];
        // Utilisation de la fonction de redirection importée
        gererRedirection(
          questionAvecNextStep,
          valeur,
          reponses,
          questions,
          currentSectionIndex,
          setCurrentSectionIndex
        );
      } else {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    }
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
          {currentSectionIndex < questions.length - 1 ? (
            <button
              onClick={boutonSuivant}
              className="btn-primary py-2 px-4 text-lg ml-auto"
            >
              <FaArrowRight />
            </button>
          ) : (
            // Lorsque c'est la dernière section, on affiche le bouton "Envoyer"
            <button
              onClick={() => {
                if (validerSectionActuelle()) {
                  axios
                    .post("http://localhost:5001/api/responses", reponses)
                    .then(() => {
                      toast.success("Formulaire soumis avec succès !");
                    })
                    .catch((err) => {
                      console.error("Erreur lors de la soumission :", err);
                      toast.error(
                        "Une erreur est survenue lors de la soumission."
                      );
                    });
                }
              }}
              className="btn-primary py-2 px-4 text-lg ml-auto"
            >
              Envoyer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
