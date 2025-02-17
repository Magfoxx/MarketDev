import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Form from "./pages/Form";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  // Liste des routes connues
  const knownRoutes = ["/", "/a-propos", "/formulaire", "/contact"];
  // Vérifier si la route actuelle est inconnue (donc page 404)
  const isNotFoundPage = !knownRoutes.includes(location.pathname);

  return (
    <>
      {/* Afficher le Header seulement si ce n'est pas la page 404 */}
      {!isNotFoundPage && <Header />}
      <main className="pt-[var(--header-height)] bg-white dark:bg-secondary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/formulaire" element={<Form />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
