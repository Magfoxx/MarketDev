import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Form from "./pages/Form";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import ScrollTotop from "./components/ScrollTotop";

function App() {
  const location = useLocation();
  // Liste des routes connues pour l'affichage du Header
  const knownRoutes = ["/", "/a-propos", "/formulaire", "/contact"];
  const isNotFoundPage = !knownRoutes.includes(location.pathname);

  return (
    <>
      <ScrollTotop />
      {/* Afficher le Header seulement pour les routes publiques */}
      {!isNotFoundPage && !location.pathname.startsWith("/admin") && <Header />}
      <main className="pt-[var(--header-height)] bg-gray-100 dark:bg-secondary">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/formulaire" element={<Form />} />
          <Route path="/contact" element={<Contact />} />
          {/* Routes pour l'administration */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Afficher le Footer seulement pour les routes publiques */}
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
