const questionLabels = {
  1: "Nom",
  2: "Prénom",
  3: "Email",
  4: "Statut",
  5: "Secteur",
  6: "Déjà un site ?",
  7: "Types de site souhaités",
  8: "URL de l’actuel",
  9: "Satisfaction du site actuel",
  10: "Problèmes rencontrés",
  "10_other": "Autre (problèmes)",
  11: "Refonte / Création",
  12: "Canaux de communication actuels",
  13: "Fréquence des actions marketing",
  14: "Outils marketing utilisés",
  15: "Objectifs du site",
  16: "Statistiques utilisées ?",
  17: "Outils statistiques",
  18: "Fonctionnalités attendues",
  "18_other": "Autre (fonctionnalités)",
  19: "Fonction business du site",
  20: "Fonctionnalités avancées",
  21: "Outils techniques souhaités",
  22: "Budget estimé",
  23: "Services attendus",
  24: "Souhaite être recontacté",
  25: "Canal préféré",
  26: "Remarques",
};
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={!!user}
      onRequestClose={onClose}
      contentLabel="Détails utilisateur"
      className="bg-gray-300 dark:bg-gray-800 p-4 rounded-xl ring-3 ring-primary shadow-primary text-secondary dark:text-white"
      overlayClassName="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center"
    >
      <h3 className="h3 text-center !mb-10 underline">
        Réponses de {user.prenom} {user.nom}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2 text-sm text-left">
          <p>
            <strong className="text-primary">Nom :</strong> {user.nom}
          </p>
          <p>
            <strong className="text-primary">Prénom :</strong> {user.prenom}
          </p>
          <p>
            <strong className="text-primary">Email :</strong> {user.email}
          </p>
        </div>
        <div className="space-y-2 text-sm text-left">
          <p>
            <strong className="text-primary">Téléphone :</strong>{" "}
            {user.telephone || user.data?.["25_other"] || "non fourni"}
          </p>
          <p>
            <strong className="text-primary">Statut :</strong> {user.statut}
          </p>
          <p>
            <strong className="text-primary">Secteur :</strong>{" "}
            {user.secteur || "non précisé"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="h4">Toutes les réponses :</h4>
        <div className="max-h-[40vh] overflow-auto bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm space-y-1">
          {user?.data &&
            Object.entries(user.data).map(([key, val]) => (
              <div key={key}>
                <p className="font-bold !text-primary">
                  {questionLabels[key] || `Question ${key}`} :
                </p>
                {Array.isArray(val) ? (
                  <ul className="list-disc list-inside ml-2">
                    {val.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-2 whitespace-pre-line">
                    {val === "" || val === undefined || val === null ? "—" : val}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
