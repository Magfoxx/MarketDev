import { servicesData } from "../../data/servicesData";
import { FaCheckCircle } from "react-icons/fa";

const AboutServices = () => {
  return (
    <div className="text-center">
      <h3 className="h3">Mes futurs services</h3>
      <p className="text-secondary dark:text-gray-300 py-4">
        Voici quelques services que je proposerai en tant que freelance :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {servicesData.map((services) => (
          <div
            key={services.id}
            className="grid grid-cols-[20%_80%] ring-1 ring-secondary dark:ring-gray-40 rounded-lg bg-white dark:bg-gray-700 shadow-md text-secondary dark:text-gray-300 hover:bg-primary/20 p-3 items-center text-left transition-all duration-300"
          >
            <div className="flex justify-center">
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
            <div>
              <h5 className="h5">{services.title}</h5>
              <p>{services.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutServices;