import React from "react";

const QuestionInput = ({
  question,
  valeur,
  valeurComplementaire, // Nouvelle prop pour la réponse complémentaire
  erreur, // Prop pour le message d'erreur
  onChangement,
  onChangementCheckbox,
}) => {
  // Définition des classes pour input et textarea
  const classesInput =
    "w-full mt-3 p-3 text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700";
  const classesTextarea =
    "w-full mt-2 p-3 ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-secondary dark:text-white min-h-[50px] max-h-[150px]";

  switch (question.type) {
    case "text":
    case "email":
      return (
        <>
          <input
            type={question.type}
            placeholder={question.placeholder || ""}
            value={valeur || ""}
            onChange={(e) => onChangement(question.id, e.target.value)}
            className={classesInput}
          />
          {erreur && <span className="text-red-500 text-sm">{erreur}</span>}
        </>
      );
    case "radio":
      return (
        <div>
          {question.options.map((option) => (
            <div key={option.value}>
              <label className="flex items-center gap-2 text-secondary dark:text-white">
                <input
                  type="radio"
                  value={option.value}
                  checked={valeur === option.value}
                  onChange={() => onChangement(question.id, option.value)}
                  className="mr-2 accent-primary my-3 cursor-pointer"
                />
                {option.label}
              </label>
              {option.requiresTextInput && valeur === "autre" && (
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
          ))}
          {erreur && <span className="text-red-500 text-sm">{erreur}</span>}
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
            {question.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {erreur && <span className="text-red-500 text-sm">{erreur}</span>}
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
          {question.options.map((option) => (
            <div key={option.value}>
              <label className="flex items-center gap-2 text-secondary dark:text-white mt-4">
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
                  className="max-w-5 max-h-5 accent-primary mt-1 cursor-pointer"
                />
                <span className="leading-tight">{option.label}</span>
              </label>
            </div>
          ))}
          {erreur && <span className="text-red-500 text-sm">{erreur}</span>}
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
