const budgetMapping = {
  moins_500: 500,
  "500_1000": 1000,
  "1000_3000": 3000,
  "3000_5000": 5000,
  "5000_10000": 10000,
  plus_10000: 12000,
  indecis: null,
};

export default {
  analyzeStats(responses) {
    // Croisement Statut x Secteur
    const statusSector = {};
    // Croisement Statut x Budget
    const statusBudget = {};
    // Croisement Secteur x Budget
    const sectorBudget = {};
    // Demandes de contact
    const contactList = [];
    let contactCount = 0;
    const total = responses.length;

    // Fréquence des types de site (question 7)
    const siteTypes = {};
    // Outils marketing utilisés (question 13 & 14)
    const marketingTools = {};

    responses.forEach((resp) => {
      const { data } = resp;

      const statut = data["4"];
      const secteur = data["5"];
      const budget = data["22"];
      const contact = data["24"];
      const canal = data["25"];
      const email = data["1"];
      const nom = data["2"];
      const prenom = data["3"];
      const outils13 = data["13"];
      const outils14 = data["14"];
      const projets = data["7"];

      // Statut x Secteur
      if (statut && secteur) {
        statusSector[secteur] = statusSector[secteur] || {};
        statusSector[secteur][statut] = (statusSector[secteur][statut] || 0) + 1;
      }

      // Statut x Budget
      if (statut && budget) {
        statusBudget[statut] = statusBudget[statut] || {};
        statusBudget[statut][budget] = (statusBudget[statut][budget] || 0) + 1;
      }

      // Secteur x Budget
      if (secteur && budget) {
        sectorBudget[secteur] = sectorBudget[secteur] || {};
        sectorBudget[secteur][budget] = (sectorBudget[secteur][budget] || 0) + 1;
      }

      // Demandes de contact
      if (contact === "oui") {
        contactList.push({
          nom,
          prenom,
          email,
          telephone: data["phone"],
          statut,
          canal,
          secteur,
          data,
          createdAt: resp.createdAt,
        });
        contactCount++;
      }

      // Multi-sélections - Types de sites
      if (Array.isArray(projets)) {
        projets.forEach((p) => {
          siteTypes[p] = (siteTypes[p] || 0) + 1;
        });
      }

      // Outils marketing
      const outils = [].concat(outils13 || [], outils14 || []);
      outils.forEach((o) => {
        marketingTools[o] = (marketingTools[o] || 0) + 1;
      });
    });

    // Indicateur de croissance : comparaison sur 7 derniers jours
    const dateMap = {};
    responses.forEach((resp) => {
      const date = new Date(resp.createdAt).toISOString().slice(0, 10);
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dateMap).sort();
    const recent7 = sortedDates.slice(-7);
    const before7 = sortedDates.slice(-14, -7);

    const totalRecent7 = recent7.reduce((acc, date) => acc + (dateMap[date] || 0), 0);
    const totalBefore7 = before7.reduce((acc, date) => acc + (dateMap[date] || 0), 0);
    const growthPercent = totalBefore7
      ? (((totalRecent7 - totalBefore7) / totalBefore7) * 100).toFixed(2)
      : null;

    return {
      statusSector,
      statusBudget,
      sectorBudget,
      contactList,
      contactConversionRate: total ? ((contactCount / total) * 100).toFixed(2) : 0,
      siteTypes,
      marketingTools,
      growthPercent,
    };
  },
};