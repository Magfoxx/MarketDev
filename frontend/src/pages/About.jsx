import AboutIntro from "../components/About/AboutIntro";
import AboutPresentation from "../components/About/AboutPresentation";
import AboutServices from "../components/About/AboutServices";
import AboutSurvey from "../components/About/AboutSurvey";

const About = () => {
  return (
    <>
      <section className="section max-padd-container !mb-0">
        <AboutIntro />
      </section>
      <section className="section max-padd-container !max-w-6xl !mb-4">
        <AboutPresentation />
      </section>
      <section className="section max-padd-container !max-w-4xl">
        <AboutServices />
      </section>
      <section className="section max-padd-container">
        <AboutSurvey />
      </section>
    </>
  );
};

export default About;
