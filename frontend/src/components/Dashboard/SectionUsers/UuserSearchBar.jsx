import React from "react";

const UuserSearchBar = ({ query, onQueryChange }) => {
  return (
    <div className="w-full md:w-auto">
      <label htmlFor="search" className="sr-only">
        Rechercher
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Rechercher par nom, prénom ou email"
        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default UuserSearchBar;