import React, { useState } from "react";
import logoLight from "../../assets/logoLight.svg";
import logoDark from "../../assets/logoDark.svg";
import {
  MdSpaceDashboard,
  MdBarChart,
  MdPieChart,
  MdPeople,
  MdSettings,
  MdMenu,
  MdChevronLeft,
} from "react-icons/md";

const SidebarDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Classe de transition pour le texte
  const textTransitionClasses =
    "ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out";

  return (
    <>
      {/* Container de la sidebar */}
      <div
        className={`absolute top-10 left-0 h-[calc(94vh)] transition-all duration-300 ease-in-out z-40
          ${isOpen ? "w-70" : "w-[80px]"}`}
      >
        {/* Bouton de toggle placé à l'intérieur de la sidebar en haut à droite */}
        <button
          onClick={toggleSidebar}
          className="absolute -top-5 right-[-18px] z-50 bg-gray-200 dark:bg-gray-800 rounded-full p-2 ring-2 transition-transform duration-300 cursor-pointer"
        >
          {isOpen ? <MdChevronLeft size={24} /> : <MdMenu size={24} />}
        </button>

        <div className="flex flex-col justify-between bg-gray-200/10 dark:bg-gray-800/10 backdrop-blur-sm border-r-1 rounded-r-2xl h-full py-10 px-4 z-20">
          <div>
            <div className="mb-10 mt-2 flex justify-center">
              <div className="relative h-10 left-7 -top-15 w-full flex items-center justify-center">
                <div
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  <h2>
                    <img
                      src={logoLight}
                      alt="Logo MarketDev"
                      className="block dark:hidden h-8 xl:h-10 md:h-9"
                    />
                    {/* Logo pour le mode sombre */}
                    <img
                      src={logoDark}
                      alt="Logo MarketDev"
                      className="hidden dark:block h-8 xl:h-10 md:h-9"
                    />
                  </h2>
                </div>
              </div>
            </div>
            <nav>
              <ul className="flex flex-col gap-8">
                <li
                  onClick={() => setActiveItem("dashboard")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:bg-red-200 dark:hover:bg-gray-700 cursor-pointer ${
                    activeItem === "dashboard" ? "bg-red-300 font-semibold" : ""
                  }`}
                >
                  <MdSpaceDashboard size={24} />
                  <span
                    className={`${textTransitionClasses} ${
                      isOpen ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Dashboard
                  </span>
                </li>
                <li
                  onClick={() => setActiveItem("statistiques")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:bg-blue-200 dark:hover:bg-gray-700 cursor-pointer ${
                    activeItem === "statistiques"
                      ? "bg-blue-300 font-semibold"
                      : ""
                  }`}
                >
                  <MdBarChart size={24} />
                  <span
                    className={`${textTransitionClasses} ${
                      isOpen ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Statistiques
                  </span>
                </li>
                <li
                  onClick={() => setActiveItem("graphiques")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:bg-orange-200 dark:hover:bg-gray-700 cursor-pointer ${
                    activeItem === "graphiques"
                      ? "bg-orange-300 font-semibold"
                      : ""
                  }`}
                >
                  <MdPieChart size={24} />
                  <span
                    className={`${textTransitionClasses} ${
                      isOpen ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Graphiques & analyses
                  </span>
                </li>
                <li
                  onClick={() => setActiveItem("utilisateurs")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:bg-green-200 dark:hover:bg-gray-700 cursor-pointer ${
                    activeItem === "utilisateurs"
                      ? "bg-green-300 font-semibold"
                      : ""
                  }`}
                >
                  <MdPeople size={24} />
                  <span
                    className={`${textTransitionClasses} ${
                      isOpen ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Utilisateurs
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <nav>
              <ul>
                <li
                  onClick={() => setActiveItem("parametres")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer ${
                    activeItem === "parametres"
                      ? "bg-gray-400 font-semibold"
                      : ""
                  }`}
                >
                  <MdSettings size={24} />
                  <span
                    className={`${textTransitionClasses} ${
                      isOpen ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    Paramètres
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
