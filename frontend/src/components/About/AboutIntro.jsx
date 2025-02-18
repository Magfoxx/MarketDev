import React from "react";

const AboutIntro = () => {
  return (
    <div className="max-padd-container text-center">
      <h2 className="h2">
        À propos de Market<span className="text-primary">Dev</span>
      </h2>
      <p className="text-secondary dark:text-gray-300 mt-6 py-6">
        <span className="font-bold text-secondary dark:text-white">
          Market<span className="text-primary">Dev</span>
        </span>{" "}
        est une initiative visant à comprendre les besoins des entrepreneurs et
        entreprises en matière de développement web. Mon objectif est d'offrir
        des solutions adaptées, performantes et sur mesure en se basent sur vos
        besoins.
      </p>
    </div>
  );
};

export default AboutIntro;
