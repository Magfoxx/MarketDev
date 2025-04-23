// src/components/Dashboard/SidebarDashboard.jsx
import React, { useState } from "react";
import logoLight from "../../assets/logoLight.svg";
import logoDark from "../../assets/logoDark.svg";
import {
  MdSpaceDashboard,
  MdBarChart,
  MdPieChart,
  MdPeople,
  MdMenu,
  MdChevronLeft,
} from "react-icons/md";

const SidebarDashboard = ({ onChangeActive }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Classe de transition pour le texte
  const textTransitionClasses =
    "ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out";

  // Gestion de l'événement de clic
  const handleClick = (item) => {
    setActiveItem(item);
    if (onChangeActive) {
      onChangeActive(item);
    }
  };

  return (
    <>
      {/* Container de la sidebar */}
      <div
        className={`hidden md:fixed md:top-0 md:left-0 md:h-[100vh] xl:block transition-all duration-300 ease-in-out z-40 text-secondary dark:text-white
          ${isOpen ? "w-70" : "w-[80px]"}`}
      >
        {/* Bouton de toggle placé à l'intérieur de la sidebar en haut à droite */}
        <button
          onClick={toggleSidebar}
          className="absolute top-10 right-[-18px] z-50 bg-gray-200 dark:bg-gray-800 rounded-full p-2 ring-1 dark:ring-white dark:text-white transition-transform duration-300 cursor-pointer"
        >
          {isOpen ? <MdChevronLeft size={24} /> : <MdMenu size={24} />}
        </button>

        <div className="flex flex-col justify-between bg-gray-200/10 dark:bg-gray-800/10 backdrop-blur-sm border-r-[0.5px] dark:border-r-white rounded-r-md h-full py-10 px-4 z-20">
          <div>
            <div className="mb-10 mt-2 flex justify-center">
              <div className="relative h-10 left-7 -top-2 w-full flex items-center justify-center">
                <div
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  <h2>
                    {/* Logo pour le mode clair */}
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
                  onClick={() => handleClick("dashboard")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:!bg-red-200 dark:hover:bg-gray-700 cursor-pointer ${
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
                  onClick={() => handleClick("statistiques")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:!bg-blue-200 dark:hover:bg-gray-700 cursor-pointer ${
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
                  onClick={() => handleClick("utilisateurs")}
                  className={`flex items-center p-2 rounded-md transition-colors hover:!bg-green-200 dark:hover:bg-gray-700 cursor-pointer ${
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
        </div>
      </div>
      {/* Mobile Navigation Bar */}
      <div className="flex xl:hidden fixed top-0 left-0 w-full flex-row items-center justify-between px-4 py-2 bg-gray-300 dark:bg-gray-800 text-white z-50 ring-1 ring-secondary dark:ring-white shadow-xl shadow-white dark:shadow-secondary">
        <div className="flex flex-row items-center">
          <h2>
            {/* Logo pour le mode clair */}
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
        <nav>
          <ul className="flex flex-row space-x-7">
            <li
              onClick={() => handleClick("dashboard")}
              className="cursor-pointer text-secondary dark:text-white"
            >
              <MdSpaceDashboard size={24} />
            </li>
            <li
              onClick={() => handleClick("statistiques")}
              className="cursor-pointer text-secondary dark:text-white"
            >
              <MdBarChart size={24} />
            </li>
            <li
              onClick={() => handleClick("utilisateurs")}
              className="cursor-pointer text-secondary dark:text-white"
            >
              <MdPeople size={24} />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SidebarDashboard;
