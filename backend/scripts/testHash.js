import bcrypt from "bcrypt";

const motDePasseClair = "AdminTest";
console.log("Mot de passe en clair (inspecté) :", JSON.stringify(motDePasseClair));

const hashEnBD = "Mettre ici votre mot de passe Hashé en base de donnée pour une vérification"; // Hash enregistré en base de donnée

bcrypt.compare(motDePasseClair, hashEnBD)
  .then((isMatch) => {
    console.log("Mot de passe valide ?", isMatch);
  })
  .catch((err) => console.error("Erreur lors de la comparaison :", err));