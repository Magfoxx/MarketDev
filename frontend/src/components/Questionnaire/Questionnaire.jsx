import { useState, useEffect } from "react";
import { axiosInstance as api } from "../api/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [details, setDetails] = useState(null);
  const [usersDetails, setUsersDetails] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats", {
          withCredentials: true,
        });
        setStats(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des statistiques.");
      }
    };

    const fetchDetails = async () => {
      try {
        const response = await api.get("/admin/stats/details", {
          withCredentials: true,
        });
        setDetails(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des détails des statistiques.");
      }
    };

    const fetchUsersDetails = async () => {
      try {
        const response = await api.get("/admin/users/details", {
          withCredentials: true,
        });
        setUsersDetails(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des détails des utilisateurs.");
      }
    };

    fetchStats();
    fetchDetails();
    fetchUsersDetails();
  }, []);

  return (
    <div>
      <h1>Tableau de bord Admin</h1>
      {/* Render stats, details and usersDetails */}
    </div>
  );
};

export default AdminDashboard;
