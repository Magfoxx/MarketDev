import React from "react";

const UserTableRow = ({ user, onClick }) => {
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <tr
      className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
      onClick={onClick}
    >
      <td className="px-6 py-3">{user.nom}</td>
      <td className="px-6 py-3">{user.prenom}</td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">{user.statut}</td>
      <td className="px-6 py-3">{user.secteur}</td>
      <td className="px-6 py-3">{user.budget}</td>
      <td className="px-6 py-3">
        {user.contact === "oui" ? (
          <span className="text-green-500 font-bold">Oui</span>
        ) : (
          <span className="text-red-400 font-bold">Non</span>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;