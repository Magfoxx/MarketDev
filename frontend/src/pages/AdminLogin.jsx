// frontend/src/pages/AdminLogin.jsx
import React, { useState } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });
  const navigate = useNavigate();

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification que tous les champs sont remplis
    if (Object.values(formData).some((value) => !value.trim())) {
      return toast.error("Veuillez remplir tous les champs.");
    }

    // Vérification du format de l'email via regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      return toast.error("Veuillez entrer une adresse email valide.");
    }

    try {
      // Appel API pour la connexion admin
      const response = await axios.post(
        "http://localhost:5001/api/admin/login",
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.motDePasse,
        }
      );
      // Stocker le token dans le localStorage
      localStorage.setItem("adminToken", response.data.token);
      toast.success("Connexion réussie !");
      // Rediriger vers le tableau de bord admin
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion admin :", error);
      toast.error(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  };

  return (
    <div className="max-padd-container">
      <div className="text-center py-16">
        <Title
          title1="Connexion "
          title2="Administrateur"
          titleStyles="h2 pb-6"
        />
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6 mt-10"
        >
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-secondary dark:text-white font-medium capitalize"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700"
              required
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="motDePasse"
              className="block text-secondary dark:text-white font-medium capitalize"
            >
              mot de passe
            </label>
            <input
              type="password"
              name="motDePasse"
              id="motDePasse"
              placeholder="Votre mot de passe"
              value={formData.motDePasse}
              onChange={handleChange}
              className="w-full mt-2 p-3 text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-lg">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
