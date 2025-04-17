import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/SidebarDashboard";
import DashboardCard from "../components/Dashboard/SectionDashboard/DashboardCard";
import StatusBarChart from "../components/Dashboard/SectionDashboard/BarChart";
import EvolutionChart from "../components/Dashboard/SectionDashboard/EvolutionChart";
import TopList from "../components/Dashboard/SectionDashboard/TopList";
import ChannelBarChart from "../components/Dashboard/SectionDashboard/ChannelBarChart";
import PieSummary from "../components/Dashboard/SectionDashboard/PieSummary";
import Title from "../components/Title";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          "http://localhost:5001/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  // Fonction qui retourne le contenu à afficher selon la section sélectionnée
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            {/* SECTION : KPIs Globaux */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <DashboardCard
                title="Total Réponses"
                value={stats.totalResponses}
              />
              <DashboardCard
                title="Demandes de Contact"
                value={stats.contactRequests || 0}
              />
              <DashboardCard
                title="Budget Moyen"
                value={`${stats.averageBudget} €`}
              />
              <DashboardCard
                title="Budget Médian"
                value={`${stats.medianBudget} €`}
              />
            </section>

            {/* SECTION : Répartition & Évolution */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <StatusBarChart countByStatus={stats.countByStatus} />
              <EvolutionChart data={stats.evolution} />
            </section>

            {/* SECTION : Top 3 & Canaux */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className="space-y-6">
                <TopList
                  title="Top 3 Secteurs"
                  items={stats.topSectors}
                  labelKey="secteur"
                />
                <TopList
                  title="Top 3 Budgets"
                  items={stats.topBudgets}
                  labelKey="budget"
                />
              </div>
              <ChannelBarChart data={stats.channelCounts} />
            </section>

            {/* SECTION : Satisfaction & Refonte */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <PieSummary
                data={stats.satisfactionCounts}
                title="Satisfaction site actuel"
              />
              <PieSummary
                data={stats.refonteCounts}
                title="Projets de création/refonte"
              />
            </section>
          </>
        );
      case "statistiques":
        return (
          <section className="mb-10">
            <h4 className="h4">Statistiques Complémentaires</h4>
            <div className="bg-gray-800 p-6 rounded shadow-xl text-white">
              <p>
                Ici, vous pouvez afficher d'autres analyses détaillées, par
                exemple une répartition par secteur, une analyse des budgets par
                statut, des indicateurs de performance supplémentaires, etc.
              </p>
            </div>
          </section>
        );
      case "graphiques":
        return (
          <section className="mb-10">
            <h4 className="h4">Graphiques & Analyses Avancées</h4>
            <div className="bg-gray-800 p-6 rounded shadow-xl text-white">
              <p>
                Affichez ici des graphiques supplémentaires (courbes
                d'évolution, histogrammes, etc.) pour analyser les tendances sur
                le temps et les comparaisons croisées entre statuts, secteurs et
                budgets.
              </p>
            </div>
          </section>
        );
      case "utilisateurs":
        return (
          <section className="mb-10">
            <h4 className="h4">Liste des Utilisateurs</h4>
            <div className="bg-gray-800 p-6 rounded shadow-xl text-white">
              <p>
                Insérez ici un tableau interactif affichant les utilisateurs
                (avec filtrage, tri et détails lorsqu'on clique sur une ligne).
              </p>
            </div>
          </section>
        );
      case "parametres":
        return (
          <section className="mb-10">
            <h4 className="text-xl font-bold mb-4">Paramètres</h4>
            <div className="bg-gray-800 p-6 rounded shadow-xl text-white">
              <p>
                Options et réglages divers pour personnaliser l'affichage du
                dashboard et la collecte des données.
              </p>
            </div>
          </section>
        );
      default:
        return <div>Section non définie</div>;
    }
  };

  return (
    <div className="max-padd-container">
      <Sidebar onChangeActive={setActiveSection} />
      <header className="flex justify-between items-center mb-8">
        <Title
          title1="Tableau de bord - "
          title2="Analyse utilisateurs"
          titleStyles="h2"
        />
      </header>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
