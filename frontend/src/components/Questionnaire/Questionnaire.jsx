import { useState, useEffect, useRef } from "react";
import { axiosInstance as api } from "../../api/axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import QuestionInput from "./QuestionInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gererRedirection from "./QuestionnaireRedirection";

const Questionnaire = () => {
  // États
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [erreursFormulaire, setErreursFormulaire] = useState({});
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [emailDuplique, setEmailDuplique] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const emailTimeoutRef = useRef(null);

  useEffect(() => {
    api
      .get("/questions")
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

  // Exemple d'emails pour tests locaux (optionnel)
  const emailsUtilises = ["exemple@domaine.com", "test@example.com"];

  const validerQuestion = (question, rep) => {
    if (question.type === "multi-select") {
      if (!Array.isArray(rep) || rep.length === 0) {
        return "Ce champ est requis *";
      }
      if (rep.includes("autre")) {
        const repAutre = reponses[`${question.id}_other`];
        if (!repAutre || repAutre.trim() === "") {
          return "Veuillez préciser votre réponse pour 'autre' *";
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
        if (emailDuplique) {
          return "Cet email est déjà utilisé *";
        }
      }
    }
    return "";
  };

  const doitAfficherQuestion = (question) => {
    if (!question.conditions || question.conditions.length === 0) return true;
    return question.conditions.every((cond) => {
      const rep = reponses[cond.questionId];
      return cond.equals.includes(rep);
    });
  };

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

  // Vérification d'unicité de l'email : on effectue la requête sans afficher le toast ici
  const handleEmailBlur = (email) => {
    if (!email) return;
    setIsVerifyingEmail(true);
    api
      .get(
        `/responses?email=${email
          .trim()
          .toLowerCase()}`
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setEmailDuplique(true);
        } else {
          setEmailDuplique(false);
        }
        setIsVerifyingEmail(false);
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la vérification de l'unicité de l'email",
          err
        );
        setIsVerifyingEmail(false);
      });
  };

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

  const gererChangementInput = (questionId, valeur) => {
    setReponses((prev) => ({ ...prev, [questionId]: valeur }));
  };

  const gererChangementCheckbox = (idQuestion, valeurOption) => {
    const selectionsActuelles = reponses[idQuestion] || [];
    const nouvelleValeur = selectionsActuelles.includes(valeurOption)
      ? selectionsActuelles.filter((v) => v !== valeurOption)
      : [...selectionsActuelles, valeurOption];
    setReponses((prev) => ({ ...prev, [idQuestion]: nouvelleValeur }));
  };

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
          {Array.isArray(sectionActuel.questions) && sectionActuel.questions.map(
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
                    valeurComplementaire={reponses[`${question.id}_other`]}
                    erreur={erreursFormulaire[question.id]}
                    onChangement={gererChangementInput}
                    onChangementCheckbox={gererChangementCheckbox}
                    onEmailBlur={handleEmailBlur}
                    statusColor={getStatusColor()}
                  />
                </div>
              )
          )}
        </div>
      </div>
    );
  };

  // Bouton "Suivant" : Validation, vérification de l'unicité de l'email et redirection
  const boutonSuivant = async () => {
    // Bloquer la progression si l'email est dupliqué
    if (reponses["3"]) {
      setIsVerifyingEmail(true);
      try {
        const response = await api.get(
          `/responses?email=${reponses["3"]
            .trim()
            .toLowerCase()}`
        );
        if (response.data && response.data.length > 0) {
          setEmailDuplique(true);
          toast.error(
            "Cet email est déjà utilisé. Veuillez en saisir un autre."
          );
          setIsVerifyingEmail(false);
          return;
        } else {
          setEmailDuplique(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'email", error);
        setIsVerifyingEmail(false);
        return;
      }
      setIsVerifyingEmail(false);
    }
    if (validerSectionActuelle()) {
      const sectionActuel = questions[currentSectionIndex];
      const questionAvecNextStep = sectionActuel.questions.find(
        (q) => q.nextStep
      );
      if (questionAvecNextStep) {
        const valeur = reponses[questionAvecNextStep.id];
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

  // Bouton "Envoyer" : Soumission finale
  const boutonEnvoyer = () => {
    if (validerSectionActuelle()) {
      api
        .post("/responses", reponses)
        .then(() => {
          toast.success("Formulaire soumis avec succès !");
          setFormSubmitted(true);
        })
        .catch((err) => {
          console.error("Erreur lors de la soumission :", err);
          toast.error("Une erreur est survenue lors de la soumission.");
        });
    }
  };

  if (formSubmitted) {
    return (
      <div className="max-padd-container bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 md:w-[600px] h-auto text-center">
        <h3 className="h3">Merci pour votre participation !</h3>
        <p className="mb-6">
          Nous apprécions le temps que vous nous avez consacré. Pour toute
          question ou pour en savoir plus sur nos services, n'hésitez pas à nous
          contacter ou à visiter la page "À propos".
        </p>
        <div className="flex justify-between px-5 md:px-25 ">
          <button
            onClick={() => navigate("/contact")}
            className="btn-primary py-2 px-4 text-lg"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/a-propos")}
            className="btn-primary py-2 px-4 text-lg"
          >
            À propos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-padd-container bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 md:w-[600px] h-auto">
      {affichageSection()}
      <div className="flex justify-end mt-4">
        <div className="flex">
          {currentSectionIndex < questions.length - 1 ? (
            <button
              onClick={boutonSuivant}
              className="btn-primary py-2 px-4 text-lg ml-auto"
              disabled={isVerifyingEmail}
            >
              <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={boutonEnvoyer}
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
