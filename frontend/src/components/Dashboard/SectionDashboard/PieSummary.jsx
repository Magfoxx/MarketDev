import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#EF4444", "#F59E0B", "#22C55E"]; // oui/partiel/non

const PieSummary = ({ data, title }) => {
  const entries = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));
  return (
    <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded shadow-xl text-secondary dark:text-white">
      <h4 className="h4 mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={entries}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={60}
            // label
          >
            {entries.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ color: "currentColor" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieSummary;
