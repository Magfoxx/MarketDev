import Title from "../Title";

const AboutIntro = () => {
  return (
    <section className="max-padd-container text-center py-16 space-y-10">
      <Title title1="À propos de Market" title2="Dev" titleStyles="h2" />
      <p className="text-secondary dark:text-gray-300 max-w-3xl mx-auto mt-16 leading-relaxed">
        <span className="font-bold text-secondary dark:text-white">
          Market<span className="text-primary">Dev </span>
        </span>
        est une initiative visant à comprendre les besoins des entrepreneurs et
        entreprises en matière de développement web. Mon objectif est d'offrir
        des solutions adaptées, performantes et sur mesure en se basant sur vos
        besoins.
      </p>
    </section>
  );
};

export default AboutIntro;
