import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, closeMenu }) => {
  const navLinks = [
    { path: "/", title: "Accueil" },
    { path: "/formulaire", title: "Formulaire" },
    { path: "/a-propos", title: "À propos" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <nav className={`${containerStyles}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `relative px-3 py-2 rounded-full transition-all duration-500 text-secondary dark:text-white 
             hover:text-primary xl:hover:after:w-full 
             ${
               isActive
                 ? "!text-primary xl:after:w-full font-semibold"
                 : "xl:after:w-0"
             }
             xl:after:content-[''] xl:after:absolute xl:after:left-0 xl:after:-bottom-3 xl:after:h-[4px] 
             xl:after:bg-primary xl:after:rounded-full xl:after:transition-all xl:after:duration-300`
          }
          onClick={closeMenu}
        >
          <div className="flex items-center justify-center gap-x-1">
            {link.title}
          </div>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
