import React, { useState } from "react";
import MultiSelectStats from "./MultiSelectStats";
import GroupedBarChart from "./GroupedBarChart";
import UserModal from "./UserModal";

const StatsSection = ({ statsDetails }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="max-padd-container-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <GroupedBarChart
            title="Statut × Budget"
            data={Object.entries(statsDetails.statusBudget || {}).map(
              ([statut, budgets]) => ({ statut, ...budgets })
            )}
            xKey="statut"
            seriesKeys={Array.from(
              new Set(
                Object.values(statsDetails.statusBudget || {}).flatMap((b) =>
                  Object.keys(b)
                )
              )
            )}
            colors={[
              "#10b981",
              "#3b82f6",
              "#f59e0b",
              "#ef4444",
              "#6366f1",
              "#ec4899",
            ]}
          />
        </div>
        <div className="xl:col-span-1">
          <GroupedBarChart
            title="Secteur × Statut"
            data={Object.entries(statsDetails.statusSector || {}).map(
              ([secteur, statuts]) => ({ secteur, ...statuts })
            )}
            xKey="secteur"
            seriesKeys={Array.from(
              new Set(
                Object.values(statsDetails.statusSector || {}).flatMap((s) =>
                  Object.keys(s)
                )
              )
            )}
            colors={[
              "#f87171",
              "#fb923c",
              "#facc15",
              "#4ade80",
              "#38bdf8",
              "#a78bfa",
            ]}
          />
        </div>
        <div className="xl:col-span-1">
          <GroupedBarChart
            title="Secteur × Budget"
            data={Object.entries(statsDetails.sectorBudget || {}).map(
              ([secteur, budgets]) => ({ secteur, ...budgets })
            )}
            xKey="secteur"
            seriesKeys={Array.from(
              new Set(
                Object.values(statsDetails.sectorBudget || {}).flatMap((b) =>
                  Object.keys(b)
                )
              )
            )}
            colors={[
              "#0ea5e9",
              "#22c55e",
              "#eab308",
              "#ef4444",
              "#8b5cf6",
              "#ec4899",
            ]}
          />
        </div>
        <div className="xl:col-span-1">
          <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-xl text-secondary dark:text-white h-full">
            <h4 className="h4 mb-4 text-center">
              3 dernières demandes de contact
            </h4>
            <ul className="space-y-2">
              {statsDetails.contactList
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(b.date || b.createdAt) -
                    new Date(a.date || a.createdAt)
                )
                .slice(0, 3)
                .map((c, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => setSelectedUser(c)}
                  >
                    <div>
                      <p className="font-bold">
                        {c.prenom} {c.nom}
                      </p>
                      <p className="text-sm text-secondary dark:text-white">
                        {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col text-right text-sm">
                      <span className="font-semibold text-secondary dark:text-white">
                        {c.statut}
                      </span>
                      <span className="italic text-primary">{c.canal}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-xl shadow-xl text-secondary dark:text-white text-center">
        <h4 className="h4 mb-2">Taux de conversion</h4>
        <p className="text-2xl font-bold !text-primary">
          {statsDetails.contactConversionRate}%
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MultiSelectStats
          title="Fréquence des types de site (Q7)"
          data={statsDetails.siteTypes}
        />
        <MultiSelectStats
          title="Outils marketing utilisés (Q13 & Q14)"
          data={statsDetails.marketingTools}
        />
      </div>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default StatsSection;
