import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
      <h4 className="h4">{title}</h4>
      <p className="text-center">{value}</p>
    </div>
  );
};

export default DashboardCard;
