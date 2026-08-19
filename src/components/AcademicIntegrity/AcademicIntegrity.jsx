import { useState } from "react";
import { Link } from "react-router";

import useReveal from "../../hooks/useReveal";

import "./AcademicIntegrity.css";

const learningUses = [
  "Ask for explanations",
  "Work through concepts",
  "Create practice problems",
  "Ask follow-up questions",
  "Check your understanding",
];

const replacementUses = [
  "Submit AI-generated work as your own",
  "Use AI when your instructor does not allow it",
  "Copy answers without understanding them",
  "Use AI to avoid doing the learning",
];

const integrityQuestions = [
  {
    id: "explain",
    number: "01",
    question: "Could I explain this without AI?",
    answer:
      "If someone asked you how you reached your answer, could you walk them through your reasoning in your own words?",
  },
  {
    id: "understand",
    number: "02",
    question: "Do I understand everything I'm submitting?",
    answer:
      "Don't submit something just because it sounds correct. Make sure you understand the ideas, steps, and reasoning behind it.",
  },
  {
    id: "policy",
    number: "03",
    question: "Does this follow my instructor's AI policy?",
    answer:
      "AI rules can change by course and assignment. Check the instructions, syllabus, or ask your instructor when you're unsure.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`integrity-reveal ${
        isVisible ? "integrity-reveal--visible" : ""
      } ${className}`}
      style={{
        "--integrity-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function IntegrityCard({ symbol, label, heading, items, closingText }) {
  return (
    <article className="integrity-card">
      <div className="integrity-card__symbol" aria-hidden="true">
        {symbol}
      </div>

      <p className="integrity-card__label">{label}</p>

      <h3 className="integrity-card__heading">{heading}</h3>

      <ul className="integrity-card__list">
        {items.map((item) => (
          <li key={item} className="integrity-card__list-item">
            {item}
          </li>
        ))}
      </ul>

      <p className="integrity-card__closing" aria-hidden="true">
        {closingText}
      </p>
    </article>
  );
}

function IntegrityQuestion({ item, isOpen, onToggle }) {
  const buttonId = `integrity-question-${item.id}`;
  const panelId = `integrity-answer-${item.id}`;

  return (
    <div className="integrity-question">
      <button
        id={buttonId}
        className="integrity-question__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="integrity-question__number">{item.number}</span>

        <span className="integrity-question__text">{item.question}</span>

        <span
          className={`integrity-question__icon ${
            isOpen ? "integrity-question__icon--open" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        className={`integrity-question__panel ${
          isOpen ? "integrity-question__panel--open" : ""
        }`}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

function AcademicIntegrityContent() {
  const [openQuestion, setOpenQuestion] = useState(null);

  function toggleQuestion(id) {
    setOpenQuestion((current) => (current === id ? null : id));
  }

  return (
    <main className="integrity-page">
      {/* HERO */}
      <section
        className="integrity-hero"
        aria-labelledby="integrity-page-title"
      >
        <div className="integrity-hero__grid" aria-hidden="true" />

        <span
          className="integrity-hero__math integrity-hero__math--one"
          aria-hidden="true"
        >
          f(x) → understanding
        </span>

        <span
          className="integrity-hero__math integrity-hero__math--two"
          aria-hidden="true"
        >
          AI ≠ thinking
        </span>

        <div className="integrity-shell integrity-hero__content">
          <header className="integrity-hero__header">
            <p className="integrity-eyebrow">
              THINK FIRST / ACADEMIC INTEGRITY
            </p>

            <h1 id="integrity-page-title" className="integrity-hero__title">
              AI should{" "}
              <span className="integrity-accent integrity-hero__accent">
                support your learning
              </span>
              , not replace it.
            </h1>

            <p className="integrity-hero__copy">
              Using AI responsibly isn't about avoiding it. It's about knowing
              when AI is helping you learn — and when it's doing the learning
              for you.
            </p>
          </header>

          <p
            className="integrity-handwritten integrity-hero__annotation"
            aria-hidden="true"
          >
            so where's the line? ↓
          </p>
        </div>
      </section>

      {/* KNOW THE DIFFERENCE */}
      <section
        className="integrity-comparison"
        aria-labelledby="integrity-comparison-title"
      >
        <div className="integrity-shell">
          <Reveal>
            <header className="integrity-section-heading">
              <p className="integrity-eyebrow">01 / KNOW THE DIFFERENCE</p>

              <h2
                id="integrity-comparison-title"
                className="integrity-section-heading__title"
              >
                Is AI helping you learn —
                <span> or doing the work for you?</span>
              </h2>
            </header>
          </Reveal>

          <div className="integrity-comparison__grid">
            <Reveal delay={100}>
              <IntegrityCard
                symbol="✓"
                label="USE AI TO LEARN"
                heading="Let AI support the process."
                items={learningUses}
                closingText="AI supports your thinking →"
              />
            </Reveal>

            <Reveal delay={200}>
              <IntegrityCard
                symbol="×"
                label="DON'T USE AI TO REPLACE YOUR WORK"
                heading="Your learning still has to be yours."
                items={replacementUses}
                closingText="← AI replaces your thinking"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROFESSOR POLICY */}
      <section
        className="integrity-policy"
        aria-labelledby="integrity-policy-title"
      >
        <div className="integrity-policy__grid" aria-hidden="true" />

        <div className="integrity-shell integrity-policy__content">
          <Reveal>
            <p className="integrity-eyebrow integrity-eyebrow--light">
              YOUR CLASS. YOUR RULES.
            </p>
          </Reveal>

          <div className="integrity-policy__layout">
            <Reveal delay={100}>
              <h2
                id="integrity-policy-title"
                className="integrity-policy__title"
              >
                Your professor's <span>guidelines come first.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="integrity-policy__copy">
                <p>
                  Every course, instructor, and assignment may have different
                  expectations for AI.
                </p>

                <p>
                  Always follow your professor's guidelines and academic
                  integrity policies when using it.
                </p>

                <p
                  className="integrity-handwritten integrity-policy__annotation"
                  aria-hidden="true"
                >
                  Not sure? Ask. →
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BEFORE YOU SUBMIT */}
      <section
        className="integrity-check"
        aria-labelledby="integrity-check-title"
      >
        <div className="integrity-shell">
          <Reveal>
            <header className="integrity-check__heading">
              <p className="integrity-eyebrow">02 / BEFORE YOU SUBMIT</p>

              <h2 id="integrity-check-title" className="integrity-check__title">
                Did AI help me{" "}
                <span className="integrity-accent">understand this?</span>
              </h2>

              <div className="integrity-check__divider" aria-hidden="true">
                <span>OR</span>
              </div>

              <p className="integrity-check__contrast">
                Did AI do it{" "}
                <span className="integrity-check__outline">for me?</span>
              </p>
            </header>
          </Reveal>

          <div
            className="integrity-questions"
            aria-label="Academic integrity self-check"
          >
            {integrityQuestions.map((item, index) => (
              <Reveal key={item.id} delay={index * 100}>
                <IntegrityQuestion
                  item={item}
                  isOpen={openQuestion === item.id}
                  onToggle={() => toggleQuestion(item.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section
        className="integrity-closing"
        aria-labelledby="integrity-closing-title"
      >
        <div className="integrity-shell integrity-closing__content">
          <Reveal>
            <div className="integrity-closing__mark" aria-hidden="true">
              ↳
            </div>

            <p className="integrity-eyebrow integrity-eyebrow--light">
              THE THINK FIRST RULE
            </p>

            <h2
              id="integrity-closing-title"
              className="integrity-closing__title"
            >
              If AI is doing the <span>thinking for you,</span>
              <br />
              Think First.
            </h2>

            <p className="integrity-closing__copy">
              AI should strengthen your learning — not take the learning away.
            </p>

            <Link to="/prompt-library" className="integrity-closing__link">
              <span>Explore More Resources</span>

              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default AcademicIntegrityContent;
