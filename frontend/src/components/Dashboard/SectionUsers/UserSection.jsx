import React, { useState } from "react";
import UserTable from "./UserTable";
import UserModal from "../SectionStats/UserModal";

// Composant principal pour l'affichage de la section utilisateurs du dashboard
const UserSection = ({ stats }) => {
  // État local pour gérer l'utilisateur sélectionné (affiché dans la modal)
  const [selectedUser, setSelectedUser] = useState(null);

  // Fonction déclenchée lorsqu'une ligne du tableau est cliquée
  // Elle prépare les données pour l'affichage dans la modal
  const handleRowClick = (user) => {
    setSelectedUser({
      ...user,
      data: user.data || user.complet || {},
    });
  };

  // Affichage principal de la section : titre, tableau utilisateur et modal conditionnelle
  return (
    <div className="max-padd-container-dashboard">
      <h3 className="h3">Liste des utilisateurs</h3>
      <UserTable users={stats} onRowClick={handleRowClick} />
      {selectedUser && (
        <UserModal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          user={selectedUser} // Données de l'utilisateur à afficher dans la modal
        />
      )}
    </div>
  );
};

export default UserSection;
