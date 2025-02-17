import { Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header";
import Home from "./pages/Home"
import Form from "./pages/Form"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-secondary">
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
