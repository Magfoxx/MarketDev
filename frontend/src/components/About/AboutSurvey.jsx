import { Link } from "react-router-dom";

const AboutSurvey = () => {
  return (
    <section className="max-padd-container text-center pb-16">
      <div className="max-w-5xl bg-primary/20 rounded-4xl ring-2 ring-primary p-8 mx-auto space-y-6">
        <h3 className="h3">Pourquoi répondre à cette étude de marché ?</h3>
        <p className="text-secondary dark:text-gray-300 leading-relaxed">
          Votre participation m'aide à mieux comprendre vos attentes et à
          construire une offre adaptée.
          <span className="font-bold text-secondary dark:text-white">
            {" "}
            Temps estimé : 3 à 5 minutes.
          </span>{" "}
          Vos réponses sont{" "}
          <span className="text-red-500">anonymes et confidentielles</span>.
        </p>
        <Link to="/formulaire" className="btn-primary px-6 py-3">
          Commencer
        </Link>
      </div>
    </section>
  );
};

export default AboutSurvey;
