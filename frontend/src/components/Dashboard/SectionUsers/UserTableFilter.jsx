import React from "react";

// Composant de filtres permettant de sélectionner un statut et un budget
const UserTableFilter = ({ filter, onChange }) => {
  // Gère le changement des filtres et met à jour l'état parent
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filter, [name]: value });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Filtre par statut d'utilisateur */}
      <div className="flex flex-col">
        <label htmlFor="statut" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Statut
        </label>
        <select
          id="statut"
          name="statut"
          value={filter.statut}
          onChange={handleChange}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="">Tous</option>
          <option value="particulier">Particulier</option>
          <option value="auto_entrepreneur">Entrepreneur</option>
          <option value="tpe_pme">TPE / PME</option>
          <option value="sarl_eurl_sas_sasu">SARL / EURL / SAS / SASU</option>
          <option value="grande_entreprise">Grande entreprise</option>
        </select>
      </div>

      {/* Filtre par tranche de budget */}
      <div className="flex flex-col">
        <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Budget
        </label>
        <select
          id="budget"
          name="budget"
          value={filter.budget}
          onChange={handleChange}
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <option value="">Tous</option>
          <option value="moins_1000">Moins de 1000 €</option>
          <option value="1000_3000">1000 - 3000 €</option>
          <option value="3000_5000">3000 - 5000 €</option>
          <option value="plus_5000">Plus de 5000 €</option>
        </select>
      </div>
    </div>
  );
};

export default UserTableFilter;