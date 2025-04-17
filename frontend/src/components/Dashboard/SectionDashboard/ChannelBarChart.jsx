import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaPinterest, FaSlack, FaTwitter } from "react-icons/fa";

const channelMeta = {
  facebook: { icon: FaFacebook, color: "#3b5998" },
  instagram: { icon: FaInstagram, color: "#E1306C" },
  linkedin: { icon: FaLinkedin, color: "#0077B5" },
  tiktok: { icon: FaTiktok, color: "#000000" },
  pinterest: { icon: FaPinterest, color: "#E60023" },
  reseaux_internes: { icon: FaSlack, color: "#FFD63A" },
  twitter: { icon: FaTwitter, color: "#1DA1F2" },
};

const ChannelBarChart = ({ data }) => {
  const formatted = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    color: channelMeta[name]?.color || "#10B981"
  }));
  return (
    <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded shadow-xl text-secondary dark:text-white">
      <h4 className="h4 mb-2">Canaux principaux</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formatted}>
          <XAxis dataKey="name" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip wrapperStyle={{ color: "currentColor" }} />
          <Bar dataKey="value">
            {formatted.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-secondary dark:text-white">
        {formatted.map(({ name, color }) => {
          const Icon = channelMeta[name]?.icon;
          return (
            <div key={name} className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              {Icon && <Icon size={16} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelBarChart;