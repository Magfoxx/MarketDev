import { useState } from "react";
import Title from "../Title";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification si tous les champs sont remplis
    if (Object.values(formData).some((value) => !value.trim())) {
      return toast.error("Veuillez remplir tous les champs.");
    }

    // Regex pour valider un email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Vérifier si l'email est invalide
    if (!emailRegex.test(formData.email.trim())) {
      return toast.error("Veuillez entrer une adresse email valide.");
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        toast.success("Votre message a bien été envoyé !");
        setFormData({ nom: "", prenom: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Erreur EmailJS:", error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <div className="text-center py-16">
      <Title title1="Envoyez-moi un " title2="message" titleStyles="h2 pb-6" />
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6 mt-10"
      >
        {Object.keys(formData).map((champ) => (
          <div key={champ} className="text-left">
            <label
              className="block text-secondary dark:text-white font-medium capitalize"
              htmlFor={champ}
            >
              {champ}
            </label>
            {champ === "message" ? (
              <textarea
                name={champ}
                id={champ}
                placeholder="Votre message..."
                value={formData[champ]}
                onChange={handleChange}
                className="w-full mt-2 p-3 min-h-[50px] max-h-[350px] text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg h-32 outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700"
              />
            ) : (
              <input
                type={champ === "email" ? "email" : "text"}
                name={champ}
                id={champ}
                placeholder={`Votre ${champ}`}
                value={formData[champ]}
                onChange={handleChange}
                className="w-full mt-2 p-3 text-secondary dark:text-white ring-1 ring-gray-300 dark:ring-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn-primary w-full py-3 text-lg">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
