import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/SidebarDashboard";
import Title from "../components/Title";

import DashboardSection from "../components/Dashboard/SectionDashboard/DashboardSection";
import StatsSection from "../components/Dashboard/SectionStats/StatsSection";
import UsersSection from "../components/Dashboard/SectionUsers/UserSection";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsDetails, setStatsDetails] = useState(null);
  const [statsUsers, setStatsUsers] = useState(null)
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const [resStats, resDetails, resUsers] = await Promise.all([
          axios.get("http://localhost:5001/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5001/api/admin/stats/details", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5001/api/admin/users/details", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats(resStats.data);
        setStatsDetails(resDetails.data);
        setStatsUsers(resUsers.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection stats={stats} />;
      case "statistiques":
        return <StatsSection statsDetails={statsDetails} />;
      case "utilisateurs":
        return <UsersSection stats={statsUsers} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-padd-container-dashboard">
      <Sidebar onChangeActive={setActiveSection} />
      <header className="flex justify-center text-center items-center mb-8">
        <Title
          title1="Tableau de bord - "
          title2={
            activeSection === "dashboard"
              ? "Analyse globale"
              : activeSection === "statistiques"
              ? "Statistiques"
              : activeSection === "utilisateurs"
              ? "Utilisateurs"
              : ""
          }
          titleStyles="h2"
        />
      </header>
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;
