import { useState } from "react";
import { Link } from "react-router-dom";
import LogoDark from "../../assets/logoDark.svg";
import LogoLight from "../../assets/logoLight.svg";
import Navbar from "./Navbar";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  return (
    <header className="max-padd-header bg-gray-100 dark:bg-secondary fixed top-0 left-0 right-0 shadow-custom z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex flex-1">
          {/* Logo pour le mode clair */}
          <h1>
            <img
              src={LogoLight}
              alt="Logo MarketDev"
              className="block dark:hidden h-8 xl:h-10 md:h-9 "
            />
            {/* Logo pour le mode sombre */}
            <img
              src={LogoDark}
              alt="Logo MarketDev"
              className="hidden dark:block h-8 xl:h-10 md:h-9"
            />
          </h1>
        </Link>

        {/* Navbar Desktop  */}
        <div className="hidden xl:flex flex-1 justify-end dark:text-white text-secondary">
          <Navbar containerStyles="flex !gap-x-6 xl:gap-x-10 text-lg w-full" />
        </div>

        {/* Icone menu burger (Mobile & Tablette) */}
        <div className="flex-1 flex items-center justify-end xl:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-secondary dark:text-white"
          >
            {menuOpened ? <FaTimesCircle /> : <FaBarsStaggered />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Collapse) */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpened ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center shadow-md py-4 gap-4">
          <Navbar
            containerStyles="flex flex-col gap-y-4 text-gray90 font-semibold medium-17"
            closeMenu={() => setMenuOpened(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
