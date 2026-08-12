import "./Hero.css";
import LightBulb from "./LightBulb";
import FloatingEquations from "./FloatingEquations";
import Particles from "./Particles";
import useMediaQuery from "../../hooks/useMediaQuery";

function Hero() {
  const isMobile = useMediaQuery("(max-width: 39.99rem)");

  return (
    <main className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <Particles />
      <FloatingEquations />

      <section
        className="hero__content"
        aria-labelledby="hero-title"
        aria-describedby="hero-description"
      >
        <LightBulb />

        {!isMobile && <p className="hero__eyebrow">Ethical AI learning</p>}

        <h1 className="hero__title" id="hero-title">
          Think First
          <span className="hero__period">.</span>
        </h1>

        <div className="hero__name" aria-label="AI Studio">
          <span className="hero__name-line" aria-hidden="true" />

          <span>AI Studio</span>

          <span className="hero__name-line" aria-hidden="true" />
        </div>

        <p className="hero__description" id="hero-description">
          {isMobile
            ? "Learn AI the right way with tools, prompts, workflows, and ethical best practices."
            : "A growing collection of AI tools, prompt frameworks, workflows, guides, and best practices designed to help students use AI ethically, thoughtfully, and effectively."}
        </p>

        <a className="hero__cta" href="#learning-resources">
          <span>Start Learning</span>

          <svg
            className="hero__cta-arrow"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </a>

        {/* Scroll cue */}
        <div className="hero__scroll-cue" aria-hidden="true">
          <svg className="hero__scroll-arrow" viewBox="0 0 24 24">
            <path d="M12 4v14" />
            <path d="m6.5 13 5.5 5.5 5.5-5.5" />
          </svg>

          <span>Scroll down</span>
        </div>
      </section>

      {!isMobile && (
        <div className="hero__footer-visual" aria-hidden="true">
          <span className="hero__chalk-line" />

          <span>Ideas begin with better questions.</span>

          <span className="hero__chalk-line" />
        </div>
      )}
    </main>
  );
}

export default Hero;
