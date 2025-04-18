import React from "react";

const labelMapping = {
  site_vitrine: "Site vitrine",
  application_web_mobile: "Application web/mobile",
  blog_reservation: "Blog / Réservation",
  optimisation_seo: "Optimisation SEO",
  reseaux_sociaux: "Réseaux sociaux",
  seo: "SEO",
  crm: "CRM",
  autre: "Autre",
  jamais: "Jamais",
  occasionnellement: "Occasionnellement",
  regulierement: "Régulièrement",
  google_analytics: "Google Analytics",
  statistiques_reseaux: "Statistiques réseaux",
  marketing_automation: "Marketing / automatisation",
  big_data: "Big data",
  email_marketing: "Email marketing",
  blog_professionnel: "Blog professionnel",
  site_personnel: "ite personnel",
  site_corporate: "Site corporate",
  portail_multi_services: "Portail multi services",
  site_ecommerce: "Site E-commerce",
};

const MultiSelectStats = ({ title, data }) => {
  if (!data || typeof data !== "object") return null;

  const sortedEntries = Object.entries(data).sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-xl text-secondary dark:text-white">
      <h4 className="h4">{title}</h4>
      <ul className="space-y-2">
        {sortedEntries.map(([label, value]) => (
          <li
            key={label}
            className="border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-1 flex justify-between"
          >
            <span className="truncate text-secondary dark:text-white">
              {labelMapping[label] || label}
            </span>
            <span className="font-bold text-primary">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectStats;
