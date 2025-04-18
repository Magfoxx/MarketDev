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
    const totalResponses = responses.length;

    const countByStatus = responses.reduce((acc, curr) => {
      const statut = curr.data["4"];
      if (statut) {
        acc[statut] = (acc[statut] || 0) + 1;
      }
      return acc;
    }, {});

    const budgets = responses
      .map((resp) => budgetMapping[resp.data["22"]])
      .filter((val) => val !== null && typeof val === "number");

    const averageBudget = budgets.length
      ? (budgets.reduce((sum, cur) => sum + cur, 0) / budgets.length).toFixed(2)
      : 0;
    const medianBudget = median(budgets);

    const sectorCounts = responses.reduce((acc, curr) => {
      const secteur = curr.data["5"];
      if (secteur) acc[secteur] = (acc[secteur] || 0) + 1;
      return acc;
    }, {});
    const dominantSector = Object.entries(sectorCounts).reduce(
      (max, [key, val]) => (val > (sectorCounts[max] || 0) ? key : max),
      "N/A"
    );

    const projectCounts = responses.reduce((acc, curr) => {
      const projects = curr.data["7"];
      if (Array.isArray(projects)) {
        projects.forEach((project) => {
          acc[project] = (acc[project] || 0) + 1;
        });
      }
      return acc;
    }, {});
    const dominantProject = Object.entries(projectCounts).reduce(
      (max, [key, val]) => (val > (projectCounts[max] || 0) ? key : max),
      "N/A"
    );

    const contactRequests = responses.filter(
      (resp) => resp.data["24"] === "oui"
    ).length;

    const contactDetails = responses
      .filter((resp) => resp.data["24"] === "oui")
      .map((resp) => ({
        nom: resp.data["1"],
        prenom: resp.data["2"],
        email: resp.data["3"],
        statut: resp.data["4"],
      }));

    const evolMap = {};
    responses.forEach((resp) => {
      const date = new Date(resp.createdAt).toISOString().slice(0, 10);
      evolMap[date] = (evolMap[date] || 0) + 1;
    });
    const evolution = Object.entries(evolMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const topSectors = Object.entries(sectorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([secteur, count]) => ({ secteur, count }));

    const budgetCounts = responses.reduce((acc, resp) => {
      const b = resp.data["22"];
      if (b) acc[b] = (acc[b] || 0) + 1;
      return acc;
    }, {});
    const topBudgets = Object.entries(budgetCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([budget, count]) => ({ budget, count }));

    const channelCounts = {};
    responses.forEach((resp) => {
      const chans = resp.data["12"] || [];
      chans.forEach((ch) => {
        channelCounts[ch] = (channelCounts[ch] || 0) + 1;
      });
    });

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
      channelCounts,
      satisfactionCounts,
      refonteCounts,
    };
  },
};