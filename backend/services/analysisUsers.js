export default function analysisUsers(responses) {
  return responses.map((r) => {
    const data = r.data || {};
    return {
      email: data["1"] || "",
      nom: data["2"] || "",
      prenom: data["3"] || "",
      statut: data["4"] || "",
      secteur: data["5"] || "",
      budget: data["22"] || "",
      contact: data["24"] === "oui" ? "oui" : "non",
      data, // pour la modal
    };
  });
}