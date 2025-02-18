import { Link } from "react-router-dom";

const AboutSurvey = () => {
  return (
    <div className="max-w-5xl bg-primary/20 rounded-4xl text-center ring-2 ring-primary p-6 mb-8">
      <h3 className="h3">Pourquoi répondre à cette étude de marché ?</h3>
      <p className="text-secondary dark:text-gray-40 m-4 pb-4">
        Votre participation m'aide à mieux comprendre vos attentes et à
        construire une offre adaptée.
        <span className="font-bold text-secondary dark:text-gray-200"> Temps estimé : 3 à 5 minutes.</span> Vos
        réponses sont <span className="text-red-500">anonymes et confidentielles</span> .
      </p>
      <div className="py-2">
        <Link 
          to="/formulaire"
          className="btn-primary">
          Répondre au questionnaire
        </Link>
      </div>
    </div>
  );
};

export default AboutSurvey;
