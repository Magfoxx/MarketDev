# 🧠 MarketDev – Plateforme d'Étude de Marché pour le Développement Web

## 📋 Objectif du projet

MarketDev est un site complet de type dashboard permettant de collecter, centraliser, analyser et visualiser les besoins en développement web exprimés par des entreprises, auto-entrepreneurs et particuliers via un questionnaire en ligne.

Le but principal est d’identifier les besoins clients (type de site, budget, fonctionnalités), les profils d’utilisateurs, et les potentiels prospects à recontacter, afin d’adapter l’offre commerciale d’un service de création web.

---

## 🛠 Stack & Technologies

- **Frontend** : React + Vite, TailwindCSS, Shadcn/ui
- **Graphiques** : Recharts
- **Backend** : Node.js + Express
- **Base de données** : MongoDB (Mongoose)
- **Export** : CSV/Excel ( à implémenter plus tard )
- **Outils** : Axios, dotenv, cors

---

## 🚀 Fonctionnalités complètes

### ✅ Collecte de données

- Formulaire d’étude de marché complet (plus de 25 questions)
- Enregistrement en base MongoDB
- Gestion des autres champs (`_other`) avec valeur personnalisée
- Choix d’être recontacté

### 📊 Dashboard d’analyse

- **Vue d’ensemble**
  - Nombre total de réponses
  - Statistiques par statut, secteur, budget
  - Taux de conversion contact / total

- **Graphiques**
  - Répartition des budgets par secteur
  - Statut × Secteur / Statut × Budget
  - Analyse des fonctionnalités marketing choisies

- **Détails utilisateur**
  - Liste des participants avec nom, statut, secteur, budget
  - Tri, recherche, filtres dynamiques
  - Modal affichant toutes les réponses d’un utilisateur
  - Pagination (5 / 10 / 20 / 30 / 50 par page)
  - Export CSV/Excel des données filtrées (à faire plus tard)

---

## 🔗 API disponible

| Route                                | Méthode | Description |
|-------------------------------------|---------|-------------|
| `/api/survey`                       | POST    | Enregistrer une réponse |
| `/api/survey`                       | GET     | Récupérer toutes les réponses |
| `/api/admin/stats`                  | GET     | Statistiques globales |
| `/api/admin/stats/details`         | GET     | Détails analytiques des réponses |
| `/api/admin/users/details`         | GET     | Détail structuré de tous les utilisateurs |

---

## 🧪 Lancement en local

### ⚙️ Backend

```bash
cd backend
npm install
touch .env
# Renseigner le .env :
MONGO_URI="mongodb+srv://<utilisateur>:<mot_de_passe>@cluster.mongodb.net/marketdev"
PORT=5000

npm run dev
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Visiter [http://localhost:5173](http://localhost:5173)

---

## ✨ Prochaines idées

- Ajout d’un système d’authentification (admin)
- Ajout de tags auto pour segmentation des profils
- Système d’email automatique aux contacts “à recontacter”

---

## 👨‍💻 Auteur

**Magfoxx**  
Développeur fullstack MERN  
📧 Contact : _hamcha.martial@gmail.com_
