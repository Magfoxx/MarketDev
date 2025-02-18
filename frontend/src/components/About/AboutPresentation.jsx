import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiJavascript,
} from "react-icons/si";

const AboutPresentation = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-12 bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-8 ">
            {/* Compétences */}
            <div className="flex-1 text-center p-6 rounded-lg shadow-lg bg-white dark:bg-secondary">
        <h4 className="h4">Mes compétences</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-gray-700 text-5xl md:text-4xl">
          <div className="flex flex-col items-center">
            <FaHtml5 className="text-orange-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">HTML5</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCss3Alt className="text-blue-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">CSS3</span>
          </div>
          <div className="flex flex-col items-center">
            <SiJavascript className="text-yellow-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">Javascript</span>
          </div>
          <div className="flex flex-col items-center">
            <SiTailwindcss className="text-teal-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">Tailwind CSS</span>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs className="text-green-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">Node.js</span>
          </div>
          <div className="flex flex-col items-center">
            <FaReact className="text-blue-400"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">React</span>
          </div>
          <div className="flex flex-col items-center">
            <SiExpress className="text-gray-500"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">Express</span>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb className="text-green-700"/>
            <span className="text-xs xl:text-sm font-medium text-secondary dark:text-white mt-2">MnogoDB</span>
          </div>
        </div>
      </div>

      {/* Présentation */}
      <div className="flex-2 text-center">
        <h4 className="h4 text-center">Qui Suis-je ?</h4>
        <p className="text-secondary dark:text-gray-40 md:text-left">
          Je m'appelle <span className="font-bold">Martial Hamcha</span>,
          développeur web passionné et futur freelance spécialisé dans la
          création d'applications et de sites web modernes. Depuis plusieurs
          années, je m'intéresse aux technologies du web et à l'évolution du
          numérique. Mon objectif est d'accompagner les entreprises et les
          entrepreneurs dans leur transformation digitale en leur proposant des
          solutions performantes, adaptées et évolutives.
        </p>
      </div>


    </div>
  );
};

export default AboutPresentation;
