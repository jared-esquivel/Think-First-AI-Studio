import { useEffect, useRef, useState } from "react";
import "./PromptNotebook.css";

function PromptNotebook({
  number = "01",
  category = "Understand",
  title,
  prompt,
  previewLines = 7,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = prompt;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    setIsCopied(false);

    window.requestAnimationFrame(() => {
      setIsCopied(true);
    });

    resetTimerRef.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 2600);
  }

  return (
    <article
      className="prompt-notebook-card"
      aria-labelledby={`prompt-notebook-title-${number}`}
    >
      <div className="prompt-notebook-stack" aria-hidden="true" />

      <div className="prompt-notebook-page">
        {/* Decorative binding */}
        <div className="prompt-notebook-binding" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Header */}
        <header className="prompt-notebook-header">
          <div>
            <p className="prompt-notebook-category">
              {number} / {category}
            </p>

            <h3 id={`prompt-notebook-title-${number}`}>{title}</h3>
          </div>

          <span className="prompt-notebook-number" aria-hidden="true">
            {number}
          </span>
        </header>

        {/* Prompt preview */}
        <div
          className={`prompt-notebook-preview ${
            isExpanded ? "is-expanded" : "is-collapsed"
          }`}
          style={{
            "--prompt-preview-lines": previewLines,
          }}
          id={`prompt-preview-${number}`}
        >
          <p>{prompt}</p>

          {!isExpanded && (
            <div className="prompt-notebook-preview__fade" aria-hidden="true" />
          )}
        </div>

        {/* Expand/collapse */}
        <button
          className="prompt-notebook-expand"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={`prompt-preview-${number}`}
          onClick={() => setIsExpanded((current) => !current)}
        >
          <span>{isExpanded ? "Show less" : "Show full prompt"}</span>

          <span aria-hidden="true">{isExpanded ? "↑" : "↓"}</span>
        </button>

        {/* Helper */}
        <p className="prompt-notebook-helper">
          <span aria-hidden="true">✎</span>
          Use this prompt to build your AI learning profile!
        </p>

        {/* Copy action */}
        <div className="prompt-notebook-actions">
          <button
            className={`prompt-copy-button ${isCopied ? "is-copied" : ""}`}
            type="button"
            onClick={handleCopy}
            aria-describedby={`copy-status-${number}`}
          >
            <span className="prompt-copy-button__pencil" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <path
                  d="
                    M12 46.5
                    17.2 34
                    43 8.2
                    c2.2-2.2
                    5.8-2.2
                    8 0
                    l4.8 4.8
                    c2.2 2.2
                    2.2 5.8
                    0 8
                    L30 46.8
                    17.5 52Z
                  "
                />

                <path d="m17.2 34 12.8 12.8" />

                <path d="M12 46.5 17.5 52 9 55Z" />

                <path d="m39.5 11.7 12.8 12.8" />
              </svg>
            </span>

            <span className="prompt-copy-button__label">
              {isCopied ? "Copied — make it yours" : "Copy Prompt"}
            </span>

            <span className="prompt-copy-button__stroke" aria-hidden="true" />
          </button>

          <p
            className="prompt-copy-status"
            id={`copy-status-${number}`}
            aria-live="polite"
            role="status"
          >
            {isCopied ? "Prompt copied to your clipboard." : ""}
          </p>
        </div>
      </div>
    </article>
  );
}

export default PromptNotebook;
