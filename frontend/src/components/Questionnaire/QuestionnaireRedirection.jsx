// Cette fonction gère la redirection du questionnaire en fonction de la réponse de l'utilisateur et des règles définies dans le JSON (via la propriété nextStep).
// Les paramètres sont :
// - question : l'objet question contenant la propriété nextStep
// - valeur : la réponse de l'utilisateur pour cette question
// - reponses : l'objet contenant toutes les réponses de l'utilisateur
// - questions : le tableau complet des sections du questionnaire
// - currentSectionIndex : l'indice de la section actuellement affichée
// - setCurrentSectionIndex : la fonction pour mettre à jour l'indice de la section
const gererRedirection = (
  question,
  valeur,
  reponses,
  questions,
  currentSectionIndex,
  setCurrentSectionIndex
) => {
  if (!question.nextStep) return;
  let redirection = null;

  // Redirection pour la question d'ID "6" (située en section 4)
  // Si l'utilisateur répond "oui", on redirige vers { sectionId: 5, questionId: 7 }.
  // Si la réponse est "non", on regarde la valeur du statut (question 4) :
  // - Si le statut est "particulier", on redirige vers question.nextStep.non.particulier.
  // - Sinon, on redirige vers question.nextStep.non.default.
  if (question.id === "6") {
    console.log("Redirection question 6, valeur:", valeur);
    if (valeur === "oui") {
      redirection = question.nextStep["oui"];
    } else if (valeur === "non") {
      const statut = reponses["4"] || "";
      // console.log("Statut question 4:", statut);
      redirection =
        statut === "particulier"
          ? question.nextStep.non.particulier
          : question.nextStep.non.default;
    }
  }
  // Redirection pour la question d'ID "9" (située en section 6)
  // Si la réponse est "non", on redirige selon question.nextStep["non"].
  // Si la réponse est "oui" ou "partiellement", on utilise question.nextStep["default"].
  else if (question.id === "9") {
    if (valeur === "non") {
      redirection = question.nextStep["non"];
    } else if (valeur === "oui" || valeur === "partiellement") {
      redirection = question.nextStep["default"];
    }
  }
  // Redirection pour la question d'ID "12" (située en section 9)
  // La redirection dépend du statut (question 4) et de la réponse à la question 6 :
  // - Si le statut est "particulier" et la réponse à la question 6 est "non", on redirige vers { sectionId: 15, questionId: 22 }.
  // - Si le statut est "particulier" et la réponse à la question 6 est "oui", on redirige vers { sectionId: 11, questionId: 15 }.
  // - Sinon, on redirige vers { sectionId: 10, questionId: 13 }.
  else if (question.id === "12") {
    const statut = reponses["4"] || "";
    if (statut === "particulier") {
      const repQuestion6 = reponses["6"];
      if (repQuestion6 === "non") {
        redirection = { sectionId: 15, questionId: 22 };
      } else if (repQuestion6 === "oui") {
        redirection = { sectionId: 11, questionId: 15 };
      } else {
        redirection = { sectionId: 10, questionId: 13 };
      }
    } else {
      redirection = { sectionId: 10, questionId: 13 };
    }
  }
  // Redirection pour la question d'ID "14" (située en section 10, multi-select)
  // Ici, la réponse est un tableau.
  // Si le tableau contient "aucun", on redirige vers question.nextStep["aucun"].
  // Sinon, on utilise question.nextStep["default"].
  else if (question.id === "14") {
    if (Array.isArray(valeur)) {
      if (valeur.includes("aucun")) {
        redirection = question.nextStep["aucun"];
      } else {
        redirection = question.nextStep["default"];
      }
    } else {
      redirection = question.nextStep[valeur] || question.nextStep["default"];
    }
  }
  // Redirection pour la question d'ID "16" (située en section 12, multi-select)
  // Si le tableau de réponses contient "non_pas_interesse", on redirige vers question.nextStep["non_pas_interesse"].
  // Sinon, on utilise question.nextStep["default"].
  else if (question.id === "16") {
    if (Array.isArray(valeur)) {
      if (valeur.includes("non_pas_interesse")) {
        redirection = question.nextStep["non_pas_interesse"];
      } else {
        redirection = question.nextStep["default"];
      }
    } else {
      redirection = question.nextStep[valeur] || question.nextStep["default"];
    }
  }
  // Redirection pour la question d'ID "24" (située en section 16, radio)
  // Si la réponse est "oui", on redirige via question.nextStep["oui"], sinon via question.nextStep["non"].
  else if (question.id === "24") {
    if (valeur === "oui") {
      redirection = question.nextStep["oui"];
    } else {
      redirection = question.nextStep["non"];
    }
  }
  // Pour toutes les autres questions ayant une propriété nextStep
  else {
    if (question.nextStep[valeur]) {
      redirection = question.nextStep[valeur];
    }
  }

  //console.log("Redirection calculée pour question",question.id,":",redirection);
  if (redirection && redirection.sectionId) {
    const index = questions.findIndex(
      (sec) => sec.sectionId === redirection.sectionId
    );
    if (index !== -1 && index !== currentSectionIndex) {
      setCurrentSectionIndex(index);
    }
  }
};

export default gererRedirection;
