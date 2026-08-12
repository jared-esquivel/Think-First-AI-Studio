import "./PromptLibraryHero.css";

function PromptLibraryHero() {
  return (
    <section className="library-hero" aria-labelledby="library-title">
      {/* Decorative animated math graph */}
      <div className="math-graph" aria-hidden="true">
        <svg
          className="math-graph__svg"
          viewBox="0 0 1600 620"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 56 0 L 0 0 0 56" className="graph-grid-line" />
            </pattern>

            <pattern
              id="grid"
              width="280"
              height="280"
              patternUnits="userSpaceOnUse"
            >
              <rect width="280" height="280" fill="url(#smallGrid)" />

              <path d="M 280 0 L 0 0 0 280" className="graph-major-line" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Graph axes */}
          <line x1="0" y1="310" x2="1600" y2="310" className="graph-axis" />

          <line x1="800" y1="0" x2="800" y2="620" className="graph-axis" />

          {/* Cosine */}
          <g className="wave-track wave-track--cosine">
            <path
              className="wave wave--secondary"
              d="
                M -400 310
                C -300 220, -200 220, -100 310
                C 0 400, 100 400, 200 310
                C 300 220, 400 220, 500 310
                C 600 400, 700 400, 800 310
                C 900 220, 1000 220, 1100 310
                C 1200 400, 1300 400, 1400 310
                C 1500 220, 1600 220, 1700 310
                C 1800 400, 1900 400, 2000 310
              "
            />
          </g>

          {/* Sine */}
          <g className="wave-track wave-track--sine">
            <path
              className="wave wave--primary"
              d="
                M -400 310
                C -300 400, -200 400, -100 310
                C 0 220, 100 220, 200 310
                C 300 400, 400 400, 500 310
                C 600 220, 700 220, 800 310
                C 900 400, 1000 400, 1100 310
                C 1200 220, 1300 220, 1400 310
                C 1500 400, 1600 400, 1700 310
                C 1800 220, 1900 220, 2000 310
              "
            />
          </g>
        </svg>
      </div>

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Prompt Library / Think First</p>

          <h1 id="library-title">
            Find a better
            <span> way to ask.</span>
          </h1>

          <p className="hero-description">
            Copy prompts designed to help you learn, practice, and work through
            ideas with AI.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PromptLibraryHero;
