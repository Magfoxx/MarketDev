import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";

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
    <div className="section">
      <div className="max-padd-container">
        <Title title1="Admin " title2="Dashboard" titleStyles="h2 pb-6" />
        {/* Le contenu du Dashboard sera ici ! */}
      </div>
    </div>
  );
};

export default AdminDashboard;
