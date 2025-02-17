import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="section max-padd-container flex flex-col min-h-[80vh]">
      {/* Titre principal */}
      <h2 className="text-9xl font-bold text-primary">404</h2>
      <h3 className="text-2xl mt-2 text-secondary dark:text-white font-semibold uppercase tracking-wide">Page introuvable</h3>
      
      {/* Texte explicatif */}
      <p className="mt-4 text-gray-40 max-w-[500px] text-center">
        Désolé, la page que vous cherchez semble introuvable. Retournez à l'accueil pour continuer votre navigation.
      </p>

      {/* Bouton retour à l'accueil */}
      <Link
        to="/"
        className="btn-primary"
      >
        Retour à l'accueil
      </Link>
    </section>
  );
};

export default NotFound;