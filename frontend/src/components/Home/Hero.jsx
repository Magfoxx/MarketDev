import { avantages } from "../../data/heroData";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-padd-container flex flex-col items-center text-center bg-gray-100 dark:bg-secondary py-16 space-y-20">
      {/* Titre principal */}
      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-secondary dark:text-white">
          Votre métier, <span className="text-primary">votre avenir</span>.{" "}
          <br />
          <span className="text-gradient">Partagez vos besoins</span> pour
          façonner le marché du web !
        </h1>
      </div>

      {/* Texte d'explication */}
      <div className="max-w-3xl text-gray-600 dark:text-gray-300 leading-relaxed space-y-8 text-justify">
        <p>
          Bienvenue sur{" "}
          <span className="font-bold text-secondary dark:text-white">
            Market<span className="text-primary">Dev</span>
          </span>
          , la plateforme qui vous donne la parole ! Vous avez un projet digital
          en tête ou souhaitez améliorer votre présence en ligne ? Chez{" "}
          <span className="font-bold text-secondary dark:text-white">
            Market<span className="text-primary">Dev</span>
          </span>
          , nous analysons vos besoins afin de proposer des solutions web
          adaptées à vos attentes.
        </p>

        <p>
          En répondant à ce questionnaire, vous contribuez à une{" "}
          <span className="font-bold">étude de marché</span> qui me permettra de
          mieux comprendre vos besoins en matière de développement web :
          création de site, refonte, e-commerce, SEO et solutions sur mesure.
        </p>
      </div>

      {/* Liste des avantages */}
      <div className="max-w-4xl mt-16 mb-10">
        <h2 className="text-2xl font-semibold text-secondary dark:text-white mb-10">
          Pourquoi répondre à ce questionnaire ?
        </h2>
        <ul className="flex flex-col gap-8 text-gray-700 dark:text-gray-300">
          {avantages.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-500"
            >
              <span className="text-gray-700 dark:text-gray-200 font-medium text-lg">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Infos supplémentaires */}
      <div className="text-center max-w-3xl">
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          🕒 Temps estimé : <span className="font-bold">3 à 5 minutes</span> •
          Vos réponses sont{" "}
          <span className="text-red-500 dark:text-red-400">
            confidentielles et anonymes
          </span>{" "}
          (sauf si vous souhaitez être recontacté).
        </p>

        {/* Call to action */}
        <div className="flex justify-center mt-12">
          <Link to="/formulaire" className="btn-primary text-lg px-8 py-4">
            Démarrer l'étude
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
