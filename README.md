# Projet d'Étude de Marché - Développement Web

## 📌 Introduction

Ce projet est un **formulaire d'étude de marché** visant à collecter des données sur les besoins en développement web des entreprises et entrepreneurs. Il permet de stocker et analyser les réponses des participants afin d'affiner l'offre de services.

Le projet repose sur une stack **MERN (MongoDB, Express, React, Node.js)** et utilise **Vite** pour un développement frontend rapide.

---

## 🚀 Fonctionnalités

- ✅ Formulaire d'étude de marché avec questions ciblées
- ✅ Stockage des réponses en **MongoDB**
- ✅ API Express REST pour gérer les réponses
- ✅ Interface **React + Vite** pour une UX fluide
- ✅ Possibilité d'être recontacté
- 🔄 Tableau de bord d'analyse des réponses (**en cours**)

---

## 🛠️ Technologies Utilisées

- **Frontend** : React (Vite), TailwindCSS
- **Backend** : Node.js, Express
- **Base de données** : MongoDB avec Mongoose
- **Autres** : CORS, dotenv...

---

## 📂 Structure du Projet

```
.
├── backend  # Serveur Express + MongoDB
│   ├── server.js
│   ├── models/Survey.js
│   ├── routes/surveyRoutes.js
│   ├── .env
│   ├── package.json
│   ├── README.md
├── frontend  # Interface React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── README.md
└── README.md  # Documentation principale
```

---

## 📌 Installation et Lancement

### 1️⃣ Prérequis

- **Node.js** (16+)
- **MongoDB** (local ou MongoDB Atlas)
- **Git** (optionnel)

### 2️⃣ Installation du Backend

```bash
cd backend
npm install
```

Créez un fichier **.env** dans `/backend` avec :

```bash
MONGO_URI="mongodb+srv://<utilisateur>:<mot_de_passe>@cluster.mongodb.net/nom_de_ta_db"
PORT=5000
```

Démarrer le serveur :

```bash
nodemon server.js
```

### 3️⃣ Installation du Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend est accessible sur **http://localhost:5173** et le backend sur **http://localhost:5000**.

---

## 📌 API Endpoints

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/survey` | **POST** | Enregistrer une réponse |
| `/api/survey` | **GET** | Récupérer toutes les réponses |

---

## 📌 Améliorations Prévues

- [ ] Interface d'analyse des réponses (graphiques, tendances)
- [ ] Export des résultats en CSV / Excel
- [ ] Notifications pour les réponses importantes

---

## 📌 Auteur

- **Auteur :** _Magfoxx_  
- **Date :** _Février 2025_

📧 Contactez-moi pour toute question ou suggestion !

