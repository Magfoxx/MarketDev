import React from "react";

// Format de la date "YYYY-MM-DD" en "Mois YYYY"
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
  // Capitalize le première lettre
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const EvolutionChart = ({ data }) => (
  <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded shadow-xl text-secondary dark:text-white">
    <h4 className="h4 mb-2">Évolution des réponses</h4>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          opacity={0.2}
        />
        <XAxis
          dataKey="date"
          stroke="currentColor"
          tickFormatter={formatDate}
        />
        <YAxis stroke="currentColor" allowDecimals={false} />
        <Tooltip
          labelFormatter={(d) => `Date: ${formatDate(d)}`}
          formatter={(v) => [`${v}`, "Réponses"]}
          wrapperStyle={{ color: "currentColor" }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default EvolutionChart;
