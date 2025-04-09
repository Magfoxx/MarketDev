import React from "react";
import { toast } from "react-toastify";

const QuestionInput = ({
  question,
  valeur,
  valeurComplementaire,
  erreur,
  onChangement,
  onChangementCheckbox,
  onEmailBlur, // utilisée pour la vérification d'unicité de l'email
  statusColor,
}) => {
  // Classes de base pour les inputs et textareas
  const classesInput =
    "w-full mt-3 p-3 text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700";
  const classesTextarea =
    "w-full mt-2 p-3 ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-secondary dark:text-white min-h-[50px] max-h-[150px]";
  const classesDescription =
    "absolute left-0 top-full mt-2 hidden group-hover:block bg-white dark:bg-secondary text-[14px] text-gray-800 dark:text-gray-100 p-2 ring-1 ring-primary rounded-lg shadow-lg z-10";

  // Filtrer les options selon la couleur du statut
  const filtrerOptions = (options) => {
    if (!statusColor) return options;
    return options.filter((option) => {
      if (!option.colors || option.colors.length === 0) return true;
      return option.colors.includes(statusColor);
    });
  };

  switch (question.type) {
    case "text":
      return (
        <>
          <input
            type="text"
            placeholder={question.placeholder || ""}
            value={valeur || ""}
            onChange={(e) => onChangement(question.id, e.target.value)}
            className={classesInput}
          />
          {erreur && (
            <span className="text-red-400 text-sm font-bold">{erreur}</span>
          )}
        </>
      );

    case "email":
      return (
        <>
          <input
            type="email"
            placeholder={question.placeholder || ""}
            value={valeur || ""}
            onChange={(e) => onChangement(question.id, e.target.value)}
            onBlur={(e) => {
              if (question.type === "email" && onEmailBlur) {
                onEmailBlur(e.target.value);
              }
            }}
            className={classesInput}
          />
          {erreur && (
            <span className="text-red-400 text-sm font-bold">{erreur}</span>
          )}
        </>
      );

    case "radio":
      return (
        <div>
          {filtrerOptions(question.options).map((option) => (
            <div key={option.value} className="group relative mb-2">
              <label className="flex items-center gap-2 text-secondary dark:text-white cursor-pointer">
                <input
                  type="radio"
                  value={option.value}
                  checked={valeur === option.value}
                  onChange={() => onChangement(question.id, option.value)}
                  className="mr-2 accent-primary my-3"
                />
                <span>{option.label}</span>
              </label>
              {option.description && (
                <div className={classesDescription}>{option.description}</div>
              )}
              {/* Si l'option en question est "autre" et qu'elle est sélectionnée, on affiche le textarea */}
              {option.value === "autre" && valeur === "autre" && (
                <textarea
                  placeholder="Précisez..."
                  value={valeurComplementaire || ""}
                  onChange={(e) =>
                    onChangement(`${question.id}_other`, e.target.value)
                  }
                  className={classesTextarea}
                />
              )}
              {/* Pour les options "email" et "telephone", si besoin de champs complémentaires */}
              {valeur === option.value && option.value === "email" && (
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={
                    typeof valeurComplementaire === "string"
                      ? valeurComplementaire
                      : ""
                  }
                  onChange={(e) =>
                    onChangement(`${question.id}_other`, e.target.value)
                  }
                  className={classesInput}
                />
              )}
              {valeur === option.value && option.value === "telephone" && (
                <input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={
                    typeof valeurComplementaire === "string"
                      ? valeurComplementaire
                      : ""
                  }
                  onChange={(e) =>
                    onChangement(`${question.id}_other`, e.target.value)
                  }
                  className={classesInput}
                />
              )}
              {/* Pour les options nécessitant un champ complémentaire autre que "autre", "email" ou "telephone" */}
              {valeur === option.value &&
                option.requiresTextInput &&
                option.value !== "autre" &&
                option.value !== "email" &&
                option.value !== "telephone" && (
                  <textarea
                    placeholder="Précisez..."
                    value={
                      typeof valeurComplementaire === "string"
                        ? valeurComplementaire
                        : ""
                    }
                    onChange={(e) =>
                      onChangement(`${question.id}_other`, e.target.value)
                    }
                    className={classesTextarea}
                  />
                )}
            </div>
          ))}
          {erreur && (
            <span className="text-red-400 text-sm font-bold">{erreur}</span>
          )}
        </div>
      );

    case "select":
      return (
        <div>
          <select
            name={`question-${question.id}`}
            value={valeur || ""}
            onChange={(e) => onChangement(question.id, e.target.value)}
            className={`${classesInput} text-lg`}
          >
            <option value="" disabled>
              Sélectionnez une option
            </option>
            {filtrerOptions(question.options).map((option) => (
              <option
                key={option.value}
                value={option.value}
                title={option.description || ""}
              >
                {option.label}
              </option>
            ))}
          </select>
          {erreur && (
            <span className="text-red-400 text-sm font-bold">{erreur}</span>
          )}
          {valeur === "autre" && (
            <textarea
              placeholder="Précisez..."
              value={valeurComplementaire || ""}
              onChange={(e) =>
                onChangement(`${question.id}_other`, e.target.value)
              }
              className={classesTextarea}
            />
          )}
        </div>
      );

    case "multi-select":
      return (
        <div>
          {filtrerOptions(question.options).map((option) => (
            <div key={option.value} className="group relative">
              <label className="flex items-center gap-2 text-secondary dark:text-white mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={
                    Array.isArray(valeur) && valeur.includes(option.value)
                  }
                  onChange={() =>
                    onChangementCheckbox(question.id, option.value)
                  }
                  className="max-w-5 h-5 accent-primary mt-1 cursor-pointer"
                />
                <span className="leading-tight">{option.label}</span>
              </label>
              {option.description && (
                <div className={classesDescription}>{option.description}</div>
              )}
            </div>
          ))}
          {erreur && (
            <span className="text-red-400 text-sm font-bold">{erreur}</span>
          )}
          {Array.isArray(valeur) && valeur.includes("autre") && (
            <textarea
              placeholder="Précisez..."
              value={valeurComplementaire || ""}
              onChange={(e) =>
                onChangement(`${question.id}_other`, e.target.value)
              }
              className={classesTextarea}
            />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default QuestionInput;
