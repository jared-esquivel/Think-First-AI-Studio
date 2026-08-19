import { useMemo, useState } from "react";
import { Link } from "react-router";

import useReveal from "../../hooks/useReveal";

import "./PromptFramework.css";

const ciderFramework = [
  {
    letter: "C",
    name: "CONTEXT",
    question: "What are you working on?",
    description:
      "Give AI the subject, assignment, problem, or topic you're currently working with.",
    example: "I'm working on derivatives in Calculus I.",
  },
  {
    letter: "I",
    name: "INTENT",
    question: "What are you trying to accomplish?",
    description:
      "Tell AI what you actually want to understand, practice, fix, or create.",
    example: "I want to understand how to use the product rule.",
  },
  {
    letter: "D",
    name: "DETAILS",
    question: "What should AI know about where you're stuck?",
    description:
      "Explain what you already understand and where the confusion starts.",
    example:
      "I understand basic derivatives, but I don't know when or why to use the product rule.",
  },
  {
    letter: "E",
    name: "EXPECTATIONS",
    question: "How do you want AI to respond?",
    description:
      "Tell AI what kind of explanation or support would help you most.",
    example: "Explain it step-by-step and ask me a question after each step.",
  },
  {
    letter: "R",
    name: "ROLE",
    question: "Who do you want AI to be?",
    description: "Give AI a useful perspective or teaching role.",
    example: "Act like a patient calculus tutor.",
  },
];

const buildExample = [
  {
    letter: "C",
    label: "CONTEXT",
    text: "I'm working on derivatives in Calculus I.",
  },
  {
    letter: "I",
    label: "INTENT",
    text: "I want to understand how to use the product rule.",
  },
  {
    letter: "D",
    label: "DETAILS",
    text: "I understand basic derivatives, but I don't know when or why to use the product rule.",
  },
  {
    letter: "E",
    label: "EXPECTATIONS",
    text: "Explain it step-by-step and ask me a question after each step.",
  },
  {
    letter: "R",
    label: "ROLE",
    text: "Act like a patient calculus tutor.",
  },
];

const promptFields = [
  {
    key: "context",
    letter: "C",
    label: "What are you working on?",
    placeholder: "Example: I'm studying limits in Calculus.",
  },
  {
    key: "intent",
    letter: "I",
    label: "What are you trying to accomplish?",
    placeholder: "Example: I want to understand how limits work graphically.",
  },
  {
    key: "details",
    letter: "D",
    label: "Where are you stuck?",
    placeholder:
      "Example: I understand the notation, but I struggle to connect it to the graph.",
  },
  {
    key: "expectations",
    letter: "E",
    label: "How should AI respond?",
    placeholder:
      "Example: Explain it simply, use one example, then give me a practice question.",
  },
  {
    key: "role",
    letter: "R",
    label: "Who should AI be?",
    placeholder: "Example: Act like a patient math tutor.",
  },
];

const promptCheck = [
  "Did I explain what I'm working on?",
  "Did I say what I actually need help with?",
  "Did I tell AI how I want it to support me?",
];

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`cider-reveal ${
        isVisible ? "cider-reveal--visible" : ""
      } ${className}`}
      style={{
        "--cider-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CiderCard({ item }) {
  return (
    <article className="cider-card">
      <div className="cider-card__letter" aria-hidden="true">
        {item.letter}
      </div>

      <p className="cider-card__label">{item.name}</p>

      <h3 className="cider-card__question">{item.question}</h3>

      <p className="cider-card__description">{item.description}</p>

      <div className="cider-card__example">
        <p className="cider-card__example-label">EXAMPLE</p>

        <p>{item.example}</p>
      </div>
    </article>
  );
}

function PromptFrameworkContent() {
  const [values, setValues] = useState({
    context: "",
    intent: "",
    details: "",
    expectations: "",
    role: "",
  });

  const [copyStatus, setCopyStatus] = useState("idle");

  const generatedPrompt = useMemo(() => {
    const parts = [
      values.role.trim(),
      values.context.trim(),
      values.intent.trim(),
      values.details.trim(),
      values.expectations.trim(),
    ].filter(Boolean);

    return parts.join(" ");
  }, [values]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (copyStatus !== "idle") {
      setCopyStatus("idle");
    }
  }

  async function handleCopy() {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);

      setCopyStatus("copied");

      window.setTimeout(() => {
        setCopyStatus("idle");
      }, 1800);
    } catch {
      setCopyStatus("error");

      window.setTimeout(() => {
        setCopyStatus("idle");
      }, 2500);
    }
  }

  return (
    <main className="cider-page">
      {/* ======================================
          HERO
          ====================================== */}
      <section className="cider-hero" aria-labelledby="cider-page-title">
        <div className="cider-hero__grid" aria-hidden="true" />

        <span
          className="cider-hero__scribble cider-hero__scribble--one"
          aria-hidden="true"
        >
          prompt + context → direction
        </span>

        <span
          className="cider-hero__scribble cider-hero__scribble--two"
          aria-hidden="true"
        >
          vague ≠ useful
        </span>

        <div className="cider-shell cider-hero__content">
          <header className="cider-hero__header">
            <p className="cider-eyebrow">THINK FIRST / PROMPTING AI</p>

            <h1 id="cider-page-title" className="cider-hero__title">
              A better prompt starts with{" "}
              <span className="cider-highlight">better context.</span>
            </h1>

            <p className="cider-hero__copy">
              You don't need a "perfect" prompt. You need to give AI enough
              information to understand what you're trying to learn.
            </p>
          </header>

          <p
            className="cider-handwritten cider-hero__annotation"
            aria-hidden="true"
          >
            good prompts give AI something to work with ↓
          </p>
        </div>
      </section>

      {/* ======================================
          01 — FRAMEWORK
          ====================================== */}
      <section
        className="cider-framework"
        aria-labelledby="cider-framework-title"
      >
        <div className="cider-shell">
          <Reveal>
            <header className="cider-section-heading">
              <p className="cider-eyebrow">01 / THE FRAMEWORK</p>

              <h2 id="cider-framework-title">Meet CIDER.</h2>

              <p>
                Five pieces that help turn a vague request into a useful
                learning prompt.
              </p>
            </header>
          </Reveal>

          <div className="cider-framework__grid">
            {ciderFramework.map((item, index) => (
              <Reveal key={item.letter} delay={index * 80}>
                <CiderCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          02 — PUT IT TOGETHER
          ====================================== */}
      <section className="cider-build" aria-labelledby="cider-build-title">
        <div className="cider-build__grid" aria-hidden="true" />

        <div className="cider-shell">
          <Reveal>
            <header className="cider-section-heading cider-section-heading--dark">
              <p className="cider-eyebrow cider-eyebrow--dark">
                02 / PUT IT TOGETHER
              </p>

              <h2 id="cider-build-title">Watch CIDER build a better prompt.</h2>

              <p>
                The goal isn't to make your prompt longer. It's to make your
                request clearer.
              </p>
            </header>
          </Reveal>

          <Reveal>
            <article className="cider-before">
              <p className="cider-build__tag">BEFORE</p>

              <blockquote>“Explain the product rule.”</blockquote>

              <p
                className="cider-handwritten cider-before__note"
                aria-hidden="true"
              >
                not wrong — just missing direction
              </p>
            </article>
          </Reveal>

          <div className="cider-pieces">
            {buildExample.map((item, index) => (
              <Reveal key={item.letter} delay={index * 70}>
                <article className="cider-piece">
                  <div className="cider-piece__letter" aria-hidden="true">
                    {item.letter}
                  </div>

                  <div>
                    <p className="cider-piece__label">{item.label}</p>

                    <p className="cider-piece__text">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <article className="cider-after">
              <div className="cider-after__top">
                <p className="cider-build__tag">AFTER CIDER</p>

                <span aria-hidden="true">↳</span>
              </div>

              <blockquote>
                Act like a patient calculus tutor. I'm working on derivatives in
                Calculus I. I want to understand how to use the product rule. I
                understand basic derivatives, but I don't know when or why to
                use the product rule. Explain it step-by-step and ask me a
                question after each step.
              </blockquote>
            </article>
          </Reveal>

          <Reveal>
            <p className="cider-build__takeaway">
              More useful context
              <span aria-hidden="true">→</span>
              more useful AI support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          03 — INTERACTIVE BUILDER
          ====================================== */}
      <section className="cider-builder" aria-labelledby="cider-builder-title">
        <div className="cider-shell">
          <Reveal>
            <header className="cider-section-heading">
              <p className="cider-eyebrow">03 / YOUR TURN</p>

              <h2 id="cider-builder-title">Build your own CIDER prompt.</h2>

              <p>
                Fill in the five parts below. We'll put them together for you.
              </p>
            </header>
          </Reveal>

          <div className="cider-builder__layout">
            <form
              className="cider-form"
              onSubmit={(event) => event.preventDefault()}
            >
              {promptFields.map((field, index) => (
                <Reveal key={field.key} delay={index * 60}>
                  <div className="cider-field">
                    <div className="cider-field__letter" aria-hidden="true">
                      {field.letter}
                    </div>

                    <div className="cider-field__content">
                      <label htmlFor={`cider-${field.key}`}>
                        {field.label}
                      </label>

                      <textarea
                        id={`cider-${field.key}`}
                        name={field.key}
                        rows="3"
                        value={values[field.key]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </form>

            <Reveal delay={150}>
              <aside
                className="cider-output"
                aria-labelledby="cider-output-title"
              >
                <div className="cider-output__header">
                  <p id="cider-output-title">YOUR PROMPT</p>

                  <span
                    className="cider-output__status"
                    role="status"
                    aria-live="polite"
                  >
                    {copyStatus === "copied" && "Prompt copied"}

                    {copyStatus === "error" && "Couldn't copy automatically"}
                  </span>
                </div>

                <div className="cider-output__prompt">
                  {generatedPrompt ? (
                    <p>{generatedPrompt}</p>
                  ) : (
                    <p className="cider-output__empty">
                      Your CIDER prompt will appear here as you build it.
                    </p>
                  )}
                </div>

                <button
                  className="cider-copy"
                  type="button"
                  disabled={!generatedPrompt}
                  onClick={handleCopy}
                >
                  <span>
                    {copyStatus === "copied" ? "Copied!" : "Copy Prompt"}
                  </span>

                  <span aria-hidden="true">↗</span>
                </button>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======================================
          04 — PROMPT CHECK
          ====================================== */}
      <section className="cider-check" aria-labelledby="cider-check-title">
        <div className="cider-shell">
          <Reveal>
            <header className="cider-section-heading">
              <p className="cider-eyebrow">04 / BEFORE YOU SEND IT</p>

              <h2 id="cider-check-title">Quick prompt check.</h2>
            </header>
          </Reveal>

          <ul className="cider-check__list">
            {promptCheck.map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <li className="cider-check__item">
                  <span className="cider-check__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{item}</span>

                  <span aria-hidden="true">↗</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="cider-check__closing">
              <p className="cider-handwritten" aria-hidden="true">
                You don't need every word to be perfect.
              </p>

              <p>Clear beats complicated.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          FINAL
          ====================================== */}
      <section className="cider-closing" aria-labelledby="cider-closing-title">
        <div className="cider-closing__grid" aria-hidden="true" />

        <div className="cider-shell">
          <Reveal>
            <div className="cider-closing__content">
              <div className="cider-closing__mark" aria-hidden="true">
                ↳
              </div>

              <p className="cider-eyebrow cider-eyebrow--dark">
                THE THINK FIRST APPROACH
              </p>

              <h2 id="cider-closing-title">
                Prompt with purpose. <span>Learn with intention.</span>
              </h2>

              <p className="cider-closing__copy">
                A strong prompt doesn't replace your thinking. It gives AI
                better direction so it can support your learning.
              </p>

              <Link className="cider-closing__link" to="/prompt-library">
                <span>Explore the Prompt Library</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default PromptFrameworkContent;
