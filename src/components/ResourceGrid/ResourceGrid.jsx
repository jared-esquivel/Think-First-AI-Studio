import { useEffect, useMemo, useRef, useState } from "react";

import { Link } from "react-router";
import "./ResourceGrid.css";

import {
  PromptIcon,
  EvaluateIcon,
  LearnIcon,
  BuildIcon,
} from "./ResourceIcons";

const resources = [
  {
    id: "prompting",
    title: "Prompting Framework",
    description: "Learn how to ask clearer and more intentional questions.",
    to: "/prompt-framework",
    Icon: PromptIcon,
  },
  {
    id: "evaluate",
    title: "Academic Integrity",
    description:
      "Learn how to use AI responsibly while keeping your work your own.",
    to: "/academic-integrity",
    Icon: EvaluateIcon,
  },
  {
    id: "learn",
    title: "Prompt Library",
    description:
      "Find, copy, and customize prompts designed to support your learning.",
    to: "/prompt-library",
    Icon: LearnIcon,
  },
  {
    id: "build",
    title: "Workshop Materials",
    description:
      "Revisit activities, examples, and resources from Think First workshops.",
    to: "/workshop-resources",
    Icon: BuildIcon,
  },
];

function ResourceGrid() {
  const sectionRef = useRef(null);

  const [gridDimensions, setGridDimensions] = useState({
    columns: 1,
    rows: 1,
    cellSize: 46,
  });

  const [gridActivated, setGridActivated] = useState(false);

  /* =========================================================
     MATCH ACTIVATION CELLS TO EXISTING GRID
     ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const updateGridDimensions = () => {
      const cellSize = window.innerWidth < 700 ? 46 : 64;

      const width = section.offsetWidth;
      const height = section.offsetHeight;

      setGridDimensions({
        columns: Math.ceil(width / cellSize),
        rows: Math.ceil(height / cellSize),
        cellSize,
      });
    };

    updateGridDimensions();

    const resizeObserver = new ResizeObserver(updateGridDimensions);

    resizeObserver.observe(section);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /* =========================================================
     CREATE SERPENTINE CELL ORDER
     ========================================================= */

  const activationCells = useMemo(() => {
    const cells = [];

    const { columns, rows } = gridDimensions;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const positionInRow = row % 2 === 0 ? column : columns - 1 - column;

        const activationIndex = row * columns + positionInRow;

        cells.push({
          row,
          column,
          activationIndex,
        });
      }
    }

    return cells;
  }, [gridDimensions]);

  /* =========================================================
     LOOP GRID SWEEP WHILE SECTION IS IN VIEW
     ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    let loopTimer = null;
    let isInView = false;

    const cellDelay = 35;
    const cellGlowDuration = 520;
    const pauseAfterSweep = 2500;

    const totalCells = gridDimensions.columns * gridDimensions.rows;

    const sweepTravelTime = Math.max(0, totalCells - 1) * cellDelay;

    const fullLoopDuration =
      sweepTravelTime + cellGlowDuration + pauseAfterSweep;

    const playSweep = () => {
      if (!isInView) {
        return;
      }

      setGridActivated(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isInView) {
            setGridActivated(true);
          }
        });
      });

      loopTimer = window.setTimeout(playSweep, fullLoopDuration);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isInView) {
            isInView = true;
            playSweep();
          }
        } else {
          isInView = false;

          setGridActivated(false);

          if (loopTimer) {
            window.clearTimeout(loopTimer);
            loopTimer = null;
          }
        }
      },
      {
        threshold: 0.14,
      },
    );

    observer.observe(section);

    return () => {
      isInView = false;

      observer.disconnect();

      if (loopTimer) {
        window.clearTimeout(loopTimer);
      }
    };
  }, [gridDimensions.columns, gridDimensions.rows]);

  return (
    <section
      ref={sectionRef}
      className="think-resource-section"
      id="learning-resources"
      aria-label="Think First learning resources"
    >
      {/* =====================================================
          Decorative background environment
      ===================================================== */}

      <div className="think-resource-background" aria-hidden="true">
        <div className="think-resource-background__glow" />

        <div className="think-resource-background__grid" />

        {/* ===============================================
            Looping glowing grid activation
        =============================================== */}

        <div
          className={`think-resource-grid-activation${
            gridActivated ? " is-active" : ""
          }`}
          style={{
            "--activation-columns": gridDimensions.columns,

            "--activation-rows": gridDimensions.rows,

            "--activation-cell-size": `${gridDimensions.cellSize}px`,
          }}
        >
          {activationCells.map(({ row, column, activationIndex }) => (
            <span
              key={`${row}-${column}`}
              className="think-resource-grid-activation__cell"
              style={{
                "--activation-delay": `${activationIndex * 35}ms`,
              }}
            />
          ))}
        </div>

        <div className="think-resource-background__grain" />
      </div>

      {/* =====================================================
          RESOURCE CARDS
      ===================================================== */}

      <div className="think-resource-grid">
        {resources.map((resource) => {
          const Icon = resource.Icon;

          return (
            <Link
              key={resource.id}
              to={resource.to}
              className={`think-resource-card think-resource-card--${resource.id}`}
            >
              <div
                className="think-resource-card__illustration"
                aria-hidden="true"
              >
                <div className="think-resource-card__illustration-bg" />

                <Icon />
              </div>

              <div className="think-resource-card__content">
                <h2 className="think-resource-card__title">{resource.title}</h2>

                <p className="think-resource-card__description">
                  {resource.description}
                </p>

                <span
                  className="think-resource-card__explore"
                  aria-hidden="true"
                >
                  <span>Explore</span>

                  <span className="think-resource-card__arrow">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ResourceGrid;
