import React from "react";

const UserTableHeader = () => {
  return (
    <tr>
      <th scope="col" className="px-6 py-3">
        Nom
      </th>
      <th scope="col" className="px-6 py-3">
        Prénom
      </th>
      <th scope="col" className="px-6 py-3">
        Email
      </th>
      <th scope="col" className="px-6 py-3">
        Statut
      </th>
      <th scope="col" className="px-6 py-3">
        Secteur
      </th>
      <th scope="col" className="px-6 py-3">
        Budget
      </th>
      <th scope="col" className="px-6 py-3">
        Contact
      </th>
    </tr>
  );
};

export default UserTableHeader;
