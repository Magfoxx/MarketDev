import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";
import Sidebar from "../components/Dashboard/SidebarDashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      try {
        await axios.get("http://localhost:5001/api/admin/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <span className="loader">Vérification de l'accès...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 text-secondary dark:text-white">
      <Sidebar />
      <header className="flex justify-between items-center mb-8">
        <h3 className="h3">Tableau de bord - Analyse utilisateurs</h3>
        <button className="btn-primary">Exporter les données</button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-400">
            Total réponses
          </h2>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-400">
            % Particuliers
          </h2>
          <p className="text-2xl font-bold">28%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-400">
            Demandes de contact
          </h2>
          <p className="text-2xl font-bold">4</p>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Répartition par statut</h2>
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-sm text-gray-400">Auto-entrepreneurs</p>
            <p className="text-lg font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Particuliers</p>
            <p className="text-lg font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">SARL / SASU...</p>
            <p className="text-lg font-bold">1</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="py-2">Nom</th>
              <th className="py-2">Prénom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Statut</th>
              <th className="py-2">Re contacter ?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-700 cursor-pointer">
              <td className="py-2">User</td>
              <td className="py-2">One</td>
              <td className="py-2">userone@gmail.com</td>
              <td className="py-2">Particulier</td>
              <td className="py-2">Non</td>
            </tr>
            <tr className="hover:bg-gray-700 cursor-pointer">
              <td className="py-2">User</td>
              <td className="py-2">Two</td>
              <td className="py-2">usertwo@gmail.com</td>
              <td className="py-2">Auto-entrepreneur</td>
              <td className="py-2">Oui</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
