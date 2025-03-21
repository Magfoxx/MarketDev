import React from "react";

const QuestionInput = ({
  question,
  valeur,
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
        <input
          type={question.type}
          placeholder={question.placeholder || ""}
          value={valeur || ""}
          onChange={(e) => onChangement(question.id, e.target.value)}
          className={classesInput}
        />
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
                  value={
                    typeof valeur === "object"
                      ? valeur[`${question.id}autre`] || ""
                      : ""
                  }
                  onChange={(e) =>
                    onChangement(`${question.id}autre`, e.target.value)
                  }
                  className={classesTextarea}
                />
              )}
            </div>
          ))}
        </div>
      );
    case "select":
      return (
        <div>
          <select
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
          {valeur === "autre" && (
            <textarea
              placeholder="Précisez..."
              value={
                typeof valeur === "object"
                  ? valeur[`${question.id}autre`] || ""
                  : ""
              }
              onChange={(e) =>
                onChangement(`${question.id}autre`, e.target.value)
              }
              className={classesTextarea}
            />
          )}
        </div>
      );
    case "multi-select":
      return question.options.map((option) => (
        <div key={option.value}>
          <label className="flex items-center gap-2 text-secondary dark:text-white mt-4">
            <input
              type="checkbox"
              name={`question-${question.id}`}
              value={option.value}
              checked={Array.isArray(valeur) && valeur.includes(option.value)}
              onChange={() => onChangementCheckbox(question.id, option.value)}
              className="max-w-5 max-h-5 accent-primary mt-1 cursor-pointer"
            />
            <span className="leading-tight">{option.label}</span>
          </label>
          {option.requiresTextInput &&
            Array.isArray(valeur) &&
            valeur.includes("autre") && (
              <textarea
                placeholder="Précisez..."
                value={
                  typeof valeur === "object"
                    ? valeur[`${question.id}autre`] || ""
                    : ""
                }
                onChange={(e) =>
                  onChangement(`${question.id}autre`, e.target.value)
                }
                className={classesTextarea}
              />
            )}
        </div>
      ));
    default:
      return null;
  }
};

export default QuestionInput;
