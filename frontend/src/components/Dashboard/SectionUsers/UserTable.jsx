import React, { useState } from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTableFilter from "./UserTableFilter";
import UuserSearchBar from "./UuserSearchBar";

const UserTable = ({ users, onRowClick = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ statut: "", budget: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Filtrage des utilisateurs en fonction de la recherche et des filtres statut / budget
  const filteredUsers = users.filter((user) => {
    const { nom, prenom, email, statut, budget } = user;
    const matchesSearch = [nom, prenom, email].some((field) =>
      field?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatut = filter.statut ? user.statut === filter.statut : true;
    const matchesBudget = filter.budget ? user.budget === filter.budget : true;
    return matchesSearch && matchesStatut && matchesBudget;
  });

  // Détermination de la pagination : utilisateurs affichés sur la page courante
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Rendu du composant principal : barre de recherche, filtres, tableau, pagination
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <UuserSearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        <UserTableFilter filter={filter} onChange={setFilter} />
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <UserTableHeader />
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {currentUsers.map((user, index) => (
              <UserTableRow
                key={index}
                user={user}
                onClick={() => onRowClick(user)}
              />
            ))}
          </tbody>
        </table>
        {/* Message si aucun utilisateur ne correspond aux filtres */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-4 text-red-400">
            Aucun utilisateur trouvé.
          </div>
        )}
        {/* Composants de pagination et sélection du nombre d’utilisateurs par page */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-gray-400 text-sm p-4">
              Utilisateurs par page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded p-1 text-gray-400"
            >
              {[5, 10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-5 p-4 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-secondary !m-0"
            >
              Précédent
            </button>
            <span className="text-gray-400 text-sm m-0">
              Page {currentPage} /{" "}
              {Math.ceil(filteredUsers.length / itemsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredUsers.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
              }
              className="btn-primary !m-0"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
