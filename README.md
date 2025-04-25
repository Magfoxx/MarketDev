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
- ✅ Tableau de bord d'analyse des réponses
- ✅ Authentification admin sécurisée (email + mot de passe)
- ✅ Formulaire de contact avec envoi d'email via EmailJS

---

## 🛠️ Technologies Utilisées

- **Frontend** : React (Vite), TailwindCSS
- **Backend** : Node.js, Express
- **Base de données** : MongoDB avec Mongoose
- **Autres** : CORS, dotenv...
- **Email** : EmailJS (pour le formulaire de contact)

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
PORT=5001
```

Le système d’authentification nécessite la présence d’un compte administrateur pré-enregistré dans la base MongoDB (email + mot de passe hashé).
Pour cela, utilisez le fichier seedAdmin.js situé dans backend/scripts/ en Démarrant le serveur :

```bash
nodemon server.js
```

Puis en exécutant la commande suivante depuis le terminal :
```bash
node backend/scripts/seedAdmin.js
```


### 3️⃣ Installation du Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend est accessible sur **http://localhost:5173** et le backend sur **http://localhost:5001**.

### 📬 Configuration EmailJS

Le projet utilise [EmailJS](https://www.emailjs.com/) pour permettre l'envoi d'email depuis le formulaire de contact (frontend).

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service, un template, et récupérez votre `userID`, `serviceID` et `templateID`
3. Dans le frontend, créez un fichier `.env` et ajoutez :

```bash
VITE_EMAILJS_USER_ID=your_user_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

⚠️ Ces variables sont utilisées dans le formulaire de contact pour envoyer les mails vers votre adresse directement via EmailJS.

---

## 📌 API Endpoints

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/survey` | **POST** | Enregistrer une réponse |
| `/api/survey` | **GET** | Récupérer toutes les réponses |

### 🔐 Authentification Admin

| Route              | Méthode | Description                            |
|--------------------|---------|----------------------------------------|
| `/api/auth/login`  | **POST** | Connexion de l'admin avec email/mot de passe |

---

## 📌 Améliorations Prévues

- [ ] Export des résultats en CSV / Excel
- [ ] Notifications pour les réponses importantes

---

## 📌 Auteur

- **Auteur :** _Magfoxx_  
- **Date :** _Février 2025_

📧 Contactez-moi pour toute question ou suggestion !
