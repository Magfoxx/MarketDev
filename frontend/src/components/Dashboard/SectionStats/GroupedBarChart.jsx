import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GroupedBarChart = ({ data, xKey, seriesKeys, colors, title }) => {
  return (
    <div className="max-padd-container-dashboardbg-gray-300 dark:bg-gray-800 h-full w-full rounded-xl text-secondary dark:text-white p-4">
      <h4 className="h4">{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey={xKey} stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip wrapperStyle={{ color: "currentColor" }} />
          <Legend />
          {seriesKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
