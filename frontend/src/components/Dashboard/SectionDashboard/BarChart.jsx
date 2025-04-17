import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const StatusBarChart = ({ countByStatus }) => {
  // Transformation de l'objet countByStatus en tableau pour Recharts,
  // avec les couleurs correspondantes.
  const data = [
    {
      name: "Particulier",
      value: countByStatus.particulier || 0,
      fill: "#EF4444",
    },
    {
      name: "Entrepreneur",
      value: countByStatus.auto_entrepreneur || 0,
      fill: "#22C55E",
    },
    { name: "TPE, PME", value: countByStatus.tpe_pme || 0, fill: "#3B82F6" },
    {
      name: "EURL, SARL",
      value: countByStatus.sarl_eurl_sas_sasu || 0,
      fill: "#F97316",
    },
    {
      name: "G Entreprise",
      value: countByStatus.grande_entreprise || 0,
      fill: "#FACC15",
    },
  ];

  return (
    <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-xl text-secondary dark:text-white">
      <h4 className="h4">Répartition par Statut</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusBarChart;
