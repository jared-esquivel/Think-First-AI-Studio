import { Link } from "react-router";

import useReveal from "../../hooks/useReveal";

import "./WorkshopResources.css";

/* =========================================================
   RESOURCE URLS

   Paste your real URLs here.
   Leave a URL as "" if it is not ready yet.
   ========================================================= */

const workshopResources = [
  {
    id: "slides",
    title: "Slide Deck",
    description: "Revisit the full workshop presentation.",
    url: "https://canva.link/c567uaunp1k0rp3",
    type: "slides",
  },
  {
    id: "impact-report",
    title: "Impact Report",
    description: "Explore workshop outcomes, participation, and highlights.",
    url: "https://docs.google.com/document/d/1xn45W4XudJZK8xgWwjKvemCAbDGrV31P7gOPUtgmTg8/edit?usp=sharing",
    type: "report",
  },
  {
    id: "activity-01 ",
    kicker: "ACTIVITY 01 (Workshop Exclusive)",
    title: "Prompt Challenge",
    description:
      "Revisit the activity focused on building stronger prompts with CIDER.",
    url: "",
    type: "activity-one",
  },
  {
    id: "activity-02",
    kicker: "ACTIVITY 02 (Workshop Exclusive)",
    title: "AI Review Challenge",
    description:
      "Review the activity focused on questioning, evaluating, and improving AI responses.",
    url: "",
    type: "activity-two",
  },
  {
    id: "linkedin",
    title: "LinkedIn Recap",
    description: "See the workshop recap, highlights, and reflections.",
    url: "https://www.linkedin.com/in/jared-esquivel-0a699632a/",
    type: "linkedin",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`workshop-reveal ${
        isVisible ? "workshop-reveal--visible" : ""
      } ${className}`}
      style={{
        "--workshop-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ResourceIcon({ type }) {
  if (type === "slides") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect
          x="4"
          y="5"
          width="16"
          height="11"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M9 20h6M12 16v4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M8 9h8M8 12h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "report") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M7 3.5h7l4 4V20H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M14 3.5V8h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M9 16v-3M12 16v-5M15 16v-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "activity-one") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M6 4h12v16H6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M9 8h6M9 12h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M15 15.5l2.8-2.8 1.5 1.5-2.8 2.8-2 .5.5-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "activity-two") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M6 4h12v16H6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M9 8h6M9 12h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="m9 16 1.5 1.5L14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 10v6M8 8v.1M11 16v-6M11 12.5c.6-1.5 4-2.4 4 1V16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExternalLinkText() {
  return <span className="workshop-sr-only">opens in a new tab</span>;
}

function WorkshopResource({ resource }) {
  const hasUrl = Boolean(resource.url);

  const content = (
    <>
      <span className="workshop-resource__icon" aria-hidden="true">
        <ResourceIcon type={resource.type} />
      </span>

      <span className="workshop-resource__content">
        {resource.kicker && (
          <span className="workshop-resource__kicker">{resource.kicker}</span>
        )}

        <span className="workshop-resource__title">{resource.title}</span>

        <span className="workshop-resource__description">
          {resource.description}
        </span>
      </span>

      <span className="workshop-resource__arrow" aria-hidden="true">
        ↗
      </span>
    </>
  );

  if (!hasUrl) {
    return (
      <div
        className="workshop-resource workshop-resource--disabled"
        aria-disabled="true"
      >
        {content}

        <span className="workshop-sr-only">Resource link not added yet.</span>
      </div>
    );
  }

  return (
    <a
      className="workshop-resource"
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
      <ExternalLinkText />
    </a>
  );
}

function WorkshopResourcesContent() {
  return (
    <main className="workshop-page">
      {/* ======================================
          HERO
          ====================================== */}
      <section className="workshop-hero" aria-labelledby="workshop-page-title">
        <div className="workshop-hero__grid" aria-hidden="true" />

        <span
          className="workshop-hero__scribble workshop-hero__scribble--one"
          aria-hidden="true"
        >
          notes → revisit → learn
        </span>

        <span
          className="workshop-hero__scribble workshop-hero__scribble--two"
          aria-hidden="true"
        >
          archive ≠ forgotten
        </span>

        <div className="workshop-shell workshop-hero__content">
          <header className="workshop-hero__header">
            <p className="workshop-eyebrow">THINK FIRST / WORKSHOP RESOURCES</p>

            <h1 id="workshop-page-title" className="workshop-hero__title">
              Keep learning{" "}
              <span className="workshop-hero__highlight">
                after the workshop.
              </span>
            </h1>

            <p className="workshop-hero__copy">
              Revisit the materials, activities, and highlights from Think First
              workshops.
            </p>

            <p className="workshop-hero__secondary">
              Everything you need, all in one place.
            </p>
          </header>

          <p
            className="workshop-handwritten workshop-hero__annotation"
            aria-hidden="true"
          >
            save it. revisit it. keep learning. ↓
          </p>
        </div>
      </section>

      {/* ======================================
          ARCHIVE
          ====================================== */}
      <section
        className="workshop-archive"
        aria-labelledby="workshop-archive-title"
      >
        <div className="workshop-shell">
          <Reveal>
            <header className="workshop-section-heading">
              <p className="workshop-eyebrow">01 / WORKSHOP ARCHIVE</p>

              <h2 id="workshop-archive-title">
                Your workshop resources, organized.
              </h2>

              <p>
                Use this page to revisit presentations, activities, reports, and
                workshop highlights whenever you need them.
              </p>
            </header>
          </Reveal>

          <Reveal>
            <article
              className="workshop-card"
              aria-labelledby="math-plus-workshop-title"
            >
              <div className="workshop-card__paper" aria-hidden="true" />

              <div className="workshop-card__folder-tab" aria-hidden="true">
                WORKSHOP FILE
              </div>

              <header className="workshop-card__header">
                <div className="workshop-card__badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M4 6.5h6l1.5 2H20v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M4 9h16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </div>

                <div>
                  <p className="workshop-card__institution">CABRILLO COLLEGE</p>

                  <h3
                    id="math-plus-workshop-title"
                    className="workshop-card__title"
                  >
                    MATH Plus AI Workshop
                  </h3>

                  <p className="workshop-card__supporting">
                    Think First × AI × Math
                  </p>
                </div>
              </header>

              <p className="workshop-card__description">
                Workshop materials, activities, outcomes, and recap from the
                Think First AI × Math workshop.
              </p>

              <ul className="workshop-card__meta" aria-label="Workshop topics">
                <li>AI Literacy</li>
                <li>Math</li>
                <li>Student Learning</li>
              </ul>

              <p
                className="workshop-handwritten workshop-card__annotation"
                aria-hidden="true"
              >
                everything from the workshop →
              </p>

              <ul className="workshop-resource-list">
                {workshopResources.map((resource, index) => (
                  <li
                    key={resource.id}
                    className="workshop-resource-list__item"
                  >
                    <Reveal delay={index * 70}>
                      <WorkshopResource resource={resource} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          FUTURE WORKSHOPS
          ====================================== */}
      <section
        className="workshop-future"
        aria-labelledby="workshop-future-title"
      >
        <div className="workshop-shell">
          <Reveal>
            <header className="workshop-section-heading">
              <p className="workshop-eyebrow">MORE TO COME</p>

              <h2 id="workshop-future-title">
                This archive grows with every workshop.
              </h2>

              <p>
                Future Think First workshops and resources can live here too.
              </p>
            </header>
          </Reveal>

          <Reveal delay={100}>
            <div className="workshop-future__placeholder">
              <span className="workshop-future__plus" aria-hidden="true">
                +
              </span>

              <div>
                <p className="workshop-future__title">
                  Future workshop resources
                </p>

                <p className="workshop-future__copy">
                  New workshop materials can be added here as the archive grows.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          CLOSING
          ====================================== */}
      <section
        className="workshop-closing"
        aria-labelledby="workshop-closing-title"
      >
        <div className="workshop-closing__grid" aria-hidden="true" />

        <div className="workshop-shell">
          <Reveal>
            <div className="workshop-closing__content">
              <div className="workshop-closing__mark" aria-hidden="true">
                ↳
              </div>

              <p className="workshop-eyebrow workshop-eyebrow--dark">
                KEEP LEARNING
              </p>

              <h2 id="workshop-closing-title">
                The workshop ends. <span>The learning doesn't.</span>
              </h2>

              <p className="workshop-closing__copy">
                Come back anytime to review what you learned, revisit an
                activity, or pick up where you left off.
              </p>

              <Link className="workshop-closing__link" to="/prompt-library">
                <span>Explore More Think First Resources</span>

                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default WorkshopResourcesContent;
