import React from "react";
import Title from "../components/Title";

const AdminDashboard = () => {
  return (
    <div className="section">
      <div className="max-padd-container">
        <Title 
          title1="Admin " 
          title2="Dashboard" 
          titleStyles="h2 pb-6" 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
