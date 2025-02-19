import AboutIntro from "../components/About/AboutIntro";
import AboutPresentation from "../components/About/AboutPresentation";
import AboutServices from "../components/About/AboutServices";
import AboutSurvey from "../components/About/AboutSurvey";

const About = () => {
  return (
    <>
      <section className="section max-padd-container">
        <AboutIntro />
      </section>
      <section className="section max-padd-container !my-0">
        <AboutPresentation />
      </section>
      <section className="section max-padd-container">
        <AboutServices />
      </section>
      <section className="section max-padd-container">
        <AboutSurvey />
      </section>
    </>
  );
};

export default About;
