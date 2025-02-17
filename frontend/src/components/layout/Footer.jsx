import { Link } from "react-router-dom";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import LogoDark from "../../assets/logoDark.svg";
import LogoLight from "../../assets/logoLight.svg";

const Footer = () => {
  return (
    <footer className="max-padd-footer bg-white dark:bg-secondary shadow-footer">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Colonne 1 - Logo + description */}
        <div className="flex flex-col justify-start  items-start p-6">
          {/* Logo placé en haut */}
          <div className="mb-4">
            <img
              src={LogoLight}
              alt="Logo MarketDev"
              className="block dark:hidden h-8 xl:h-10 md:h-9"
            />
            <img
              src={LogoDark}
              alt="Logo MarketDev"
              className="hidden dark:block h-8 xl:h-10 md:h-9"
            />
          </div>
          {/* Paragraphe centré avec largeur limitée */}
          <p className="text-gray-40 text-sm leading-relaxed max-w-[300px] mb-3">
            Votre partenaire pour une présence en ligne performante et
            impactante.
          </p>
        </div>

        {/* Colonne 2 - Liens utiles */}
        <div className="p-6">
          <h3 className="h3"> Liens utiles</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="footer-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/formulaire" className="footer-link">
                Formulaire
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="footer-link">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 - Contact & Réseaux sociaux */}
        <div className="p-6">
          <h3 className="h3">Contact</h3>
          <p className="flex items-center gap-2 mt-3 text-gray-40">
            <FaEnvelope className="text-primary" />
            <span>contact-market-dev@gmail.com</span>
          </p>
          {/* Liens vers les réseaux sociaux */}
          <div className="mt-6">
            <h3 className="h3">Suivez-moi</h3>
            <div className="flex gap-4 mt-3">
              <Link
                to="https://www.linkedin.com/in/martial-hamcha"
                target="_blank"
                className="footer-social-link"
              >
                <FaLinkedin />
              </Link>
              <Link
                to="https://github.com/Magfoxx"
                target="_blank"
                className="footer-social-link"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section Copyright */}
      <div className="footer-copyright">
        <p className="text-gray-50 text-sm text-center">
          © {new Date().getFullYear()} MarketDev. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
