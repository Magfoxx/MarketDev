// Mapping pour convertir les options de budget en valeurs numériques
const budgetMapping = {
  moins_500: 500,
  "500_1000": 1000,
  "1000_3000": 3000,
  "3000_5000": 5000,
  "5000_10000": 10000,
  plus_10000: 12000,
  indecis: null,
};

// Fonction utilitaire pour calculer la médiane d'un tableau de nombres
function median(values) {
  if (values.length === 0) return 0;
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 !== 0
    ? values[mid]
    : (values[mid - 1] + values[mid]) / 2;
}

export default {
  analyzeResponses(responses) {
    // Nombre total de réponses
    const totalResponses = responses.length;

    // Comptage par statut (question id "4")
    const countByStatus = responses.reduce((acc, curr) => {
      const statut = curr.data["4"];
      if (statut) {
        acc[statut] = (acc[statut] || 0) + 1;
      }
      return acc;
    }, {});

    // Calcul du budget moyen et médian
    const budgets = responses
      .map((resp) => {
        const opt = resp.data["22"];
        return budgetMapping[opt];
      })
      .filter((val) => val !== null && typeof val === "number");

    const averageBudget = budgets.length
      ? (budgets.reduce((sum, cur) => sum + cur, 0) / budgets.length).toFixed(2)
      : 0;
    const medianBudget = median(budgets);

    // Secteur dominant (question id "5")
    const sectorCounts = responses.reduce((acc, curr) => {
      const secteur = curr.data["5"];
      if (secteur) {
        acc[secteur] = (acc[secteur] || 0) + 1;
      }
      return acc;
    }, {});
    const dominantSector = Object.keys(sectorCounts).reduce(
      (maxSecteur, secteur) =>
        sectorCounts[secteur] > (sectorCounts[maxSecteur] || 0) ? secteur : maxSecteur,
      "N/A"
    );

    // Type de projet dominant (question id "7") – ces réponses peuvent être des tableaux si multi-select
    const projectCounts = responses.reduce((acc, curr) => {
      const projects = curr.data["7"];
      if (Array.isArray(projects)) {
        projects.forEach((project) => {
          acc[project] = (acc[project] || 0) + 1;
        });
      }
      return acc;
    }, {});
    const dominantProject = Object.keys(projectCounts).reduce(
      (maxProj, proj) =>
        projectCounts[proj] > (projectCounts[maxProj] || 0) ? proj : maxProj,
      "N/A"
    );

    // Analyse des demandes de contact (question id "24")
    // On considère que si la réponse est "oui", c'est une demande de contact.
    const contactRequests = responses.filter(
      (resp) => resp.data["24"] === "oui"
    ).length;

    // Pour afficher plus de détails dans un tableau par exemple, on extrait le nom, prénom, email et le statut
    const contactDetails = responses
      .filter((resp) => resp.data["24"] === "oui")
      .map((resp) => ({
        nom: resp.data["1"],
        prenom: resp.data["2"],
        email: resp.data["3"],
        statut: resp.data["4"],
      }));

    // 1️⃣ Évolution dans le temps (par jour)
    const evolMap = {};
    responses.forEach((resp) => {
      const date = new Date(resp.createdAt).toISOString().slice(0, 10); // "YYYY‑MM‑DD"
      evolMap[date] = (evolMap[date] || 0) + 1;
    });
    const evolution = Object.entries(evolMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // 3️⃣ Top 3 secteurs
    const topSectors = Object.entries(sectorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([secteur, count]) => ({ secteur, count }));

    // 3️⃣ Top 3 budgets (par tranche, non valeur numérique)
    const budgetCounts = responses.reduce((acc, resp) => {
      const b = resp.data["22"];
      if (b) acc[b] = (acc[b] || 0) + 1;
      return acc;
    }, {});
    const topBudgets = Object.entries(budgetCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([budget, count]) => ({ budget, count }));

    // 4️⃣ Répartition projet par statut (matrix)
    const projectByStatus = {}; // { statut: { projet: count } }
    responses.forEach((resp) => {
      const statut = resp.data["4"];
      const projets = resp.data["7"] || [];
      if (!projectByStatus[statut]) projectByStatus[statut] = {};
      projets.forEach((proj) => {
        projectByStatus[statut][proj] =
          (projectByStatus[statut][proj] || 0) + 1;
      });
    });

    // 5️⃣ Canaux de com. (réseaux sociaux question "12")
    const channelCounts = {};
    responses.forEach((resp) => {
      const chans = resp.data["12"] || [];
      chans.forEach((ch) => {
        channelCounts[ch] = (channelCounts[ch] || 0) + 1;
      });
    });

    // 6️⃣ Satisfaction (question "9") et refonte (question "11")
    const satisfactionCounts = {};
    const refonteCounts = {};
    responses.forEach((resp) => {
      const sat = resp.data["9"];
      if (sat) satisfactionCounts[sat] = (satisfactionCounts[sat] || 0) + 1;
      const ref = resp.data["11"];
      if (ref) refonteCounts[ref] = (refonteCounts[ref] || 0) + 1;
    });

    return {
      totalResponses,
      countByStatus,
      averageBudget,
      medianBudget,
      dominantSector,
      dominantProject,
      contactRequests,
      contactDetails,
      evolution,
      topSectors,
      topBudgets,
      projectByStatus,
      channelCounts,
      satisfactionCounts,
      refonteCounts,
    };
  },
};