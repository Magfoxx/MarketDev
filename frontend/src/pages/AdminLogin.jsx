import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { axiosInstance as api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  // État pour stocker les données du formulaire de connexion
  const [formData, setFormData] = useState({ email: "", motDePasse: "" });
  const navigate = useNavigate();

  // Vérifie si l'administrateur est déjà connecté à l'arrivée sur la page
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      try {
        await api.get("/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/admin/dashboard");
      } catch {
        localStorage.removeItem("adminToken");
      }
    };
    checkIfLoggedIn();
  }, [navigate]);

  // Met à jour les valeurs du formulaire lors de la saisie utilisateur
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gère la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v.trim())) {
      return toast.error("Veuillez remplir tous les champs.");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      return toast.error("Veuillez entrer une adresse email valide.");
    }

    try {
      const response = await api.post("/admin/", {
        email: formData.email.trim().toLowerCase(),
        password: formData.motDePasse,
      });
      localStorage.setItem("adminToken", response.data.token);
      toast.success("Connexion réussie !");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  };

  // Affichage du formulaire de connexion administrateur
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
              className="w-full mt-2 p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-secondary dark:text-white"
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
              className="w-full mt-2 p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-secondary dark:text-white"
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
