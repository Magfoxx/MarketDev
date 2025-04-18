import React from "react";
import DashboardCard from "./DashboardCard";
import StatusBarChart from "./BarChart";
import EvolutionChart from "./EvolutionChart";
import TopList from "./TopList";
import ChannelBarChart from "./ChannelBarChart";
import PieSummary from "./PieSummary";

const DashboardSection = ({ stats }) => (
  <div className="max-w-[1600px] mx-auto space-y-10 mb-10">
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Left Column: KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-1 gap-6 xl:w-1/4">
        <DashboardCard title="Total Réponses" value={stats.totalResponses} />
        <DashboardCard
          title="Demandes de Contact"
          value={stats.contactRequests}
        />
        <DashboardCard
          title="Budget Moyen"
          value={`${stats.averageBudget} €`}
        />
        <DashboardCard
          title="Budget Médian"
          value={`${stats.medianBudget} €`}
        />
      </div>
      {/* Right Column: Status + Evolution and Top & Canaux */}
      <div className="flex flex-col gap-6 xl:w-3/4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <StatusBarChart countByStatus={stats.countByStatus} />
          <EvolutionChart data={stats.evolution} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <PieSummary
        data={stats.satisfactionCounts}
        title="Satisfaction site actuel"
      />
      <PieSummary
        data={stats.refonteCounts}
        title="Projets de création/refonte"
      />
    </div>
  </div>
);

export default DashboardSection;
