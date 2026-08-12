import { useEffect, useMemo, useRef } from "react";
import "./IntroAnimation.css";

function getGridConfig() {
  if (typeof window !== "undefined" && window.innerWidth <= 700) {
    return {
      columns: 7,
      rows: 11,
    };
  }

  return {
    columns: 12,
    rows: 8,
  };
}

function IntroAnimation({ onShowNavbar, onComplete }) {
  const panelRef = useRef(null);
  const swirlWrapRef = useRef(null);
  const pathRef = useRef(null);

  /*
    Keep the grid dimensions stable for the lifetime
    of this intro sequence.

    Mobile: 7 × 11
    Desktop: 12 × 8
  */
  const gridConfig = useMemo(() => getGridConfig(), []);

  const gridCells = useMemo(() => {
    const cells = [];

    for (let row = 0; row < gridConfig.rows; row += 1) {
      for (let column = 0; column < gridConfig.columns; column += 1) {
        cells.push({
          row,
          column,
          index: row * gridConfig.columns + column,
        });
      }
    }

    return cells;
  }, [gridConfig]);

  useEffect(() => {
    const panel = panelRef.current;
    const swirlWrap = swirlWrapRef.current;
    const path = pathRef.current;

    if (!panel || !swirlWrap || !path) {
      return;
    }

    const timers = [];
    let cancelled = false;

    /* =========================================
       HELPERS
    ========================================= */

    const wait = (milliseconds) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(resolve, milliseconds);

        timers.push(timer);
      });

    const schedule = (callback, milliseconds) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, milliseconds);

      timers.push(timer);

      return timer;
    };

    const waitForFrames = () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

    const getRenderedGridCells = () =>
      Array.from(panel.querySelectorAll(".intro-grid-cell"));

    /* =========================================
       SERPENTINE ORDER

       Row 0: left → right
       Row 1: right → left
       Row 2: left → right
       etc.
    ========================================= */

    const getSerpentineCells = () => {
      const cells = getRenderedGridCells();
      const orderedCells = [];

      for (let row = 0; row < gridConfig.rows; row += 1) {
        const rowCells = cells.filter(
          (cell) => Number(cell.dataset.row) === row,
        );

        rowCells.sort((firstCell, secondCell) => {
          const firstColumn = Number(firstCell.dataset.column);
          const secondColumn = Number(secondCell.dataset.column);

          if (row % 2 === 0) {
            return firstColumn - secondColumn;
          }

          return secondColumn - firstColumn;
        });

        orderedCells.push(...rowCells);
      }

      return orderedCells;
    };

    /* =========================================
       GRID RESET
    ========================================= */

    const resetGrid = () => {
      getRenderedGridCells().forEach((cell) => {
        cell.classList.remove("active", "settle");
      });
    };

    /* =========================================
       FAST GRID ACTIVATION

       Step delay: 18ms
       Active linger: 180ms
    ========================================= */

    const activateGrid = async () => {
      const orderedCells = getSerpentineCells();

      const stepDelay = 34;
      const activeLinger = 180;

      for (const cell of orderedCells) {
        if (cancelled) {
          return;
        }

        cell.classList.add("active");

        schedule(() => {
          cell.classList.remove("active");
          cell.classList.add("settle");
        }, activeLinger);

        await wait(stepDelay);
      }
    };

    /* =========================================
       REDUCED MOTION
    ========================================= */

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const runReducedMotionIntro = async () => {
      document.body.classList.add("intro-running");

      panel.style.display = "flex";
      panel.style.animation = "none";
      panel.style.transition = "none";
      panel.style.transform = "translateY(0)";
      panel.style.opacity = "1";

      swirlWrap.style.opacity = "0";

      resetGrid();

      /*
        Keep the integration callbacks intact,
        but avoid making the user sit through
        the decorative sequence.
      */
      await wait(80);

      if (cancelled) {
        return;
      }

      onShowNavbar?.();

      await wait(100);

      if (cancelled) {
        return;
      }

      panel.style.display = "none";

      document.body.classList.remove("intro-running");

      onComplete?.();
    };

    /* =========================================
       MAIN INTRO SEQUENCE
    ========================================= */

    const runIntro = async () => {
      document.body.classList.add("intro-running");

      resetGrid();

      /* -----------------------------------------
         RESET PANEL
      ----------------------------------------- */

      panel.style.display = "flex";

      panel.style.animation = "";
      panel.style.transition = "";

      panel.style.opacity = "1";

      panel.style.transform = "translateY(-100%) scale(1)";

      panel.classList.remove("drop");

      /* -----------------------------------------
         RESET SWIRL
      ----------------------------------------- */

      swirlWrap.classList.remove("visible", "echo");

      swirlWrap.style.opacity = "";
      swirlWrap.style.transition = "";

      path.style.transition = "";

      /* -----------------------------------------
         PREPARE SVG STROKE
      ----------------------------------------- */

      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength}`;

      path.style.strokeDashoffset = `${pathLength}`;

      /*
        Force the browser to register the
        hidden starting states.
      */
      void panel.offsetHeight;
      void path.getBoundingClientRect();

      /* =========================================
         1. CURTAIN DROPS
      ========================================= */

      panel.classList.add("drop");

      await wait(750);

      if (cancelled) {
        return;
      }

      /* =========================================
         2. SWIRL APPEARS + DRAWS
      ========================================= */

      swirlWrap.classList.add("visible");

      path.style.transition =
        "stroke-dashoffset 1100ms cubic-bezier(0.4, 0, 0.2, 1)";

      await waitForFrames();

      if (cancelled) {
        return;
      }

      path.style.strokeDashoffset = "0";

      await wait(1100);

      if (cancelled) {
        return;
      }

      /* =========================================
         3. SWIRL ECHO
      ========================================= */

      swirlWrap.classList.add("echo");

      await wait(420);

      if (cancelled) {
        return;
      }

      /* =========================================
         4. SWIRL FADES
      ========================================= */

      swirlWrap.style.transition = "opacity 450ms ease";

      swirlWrap.style.opacity = "0";

      await wait(350);

      if (cancelled) {
        return;
      }

      /* =========================================
         5. GRID BOOTS UP
      ========================================= */

      await activateGrid();

      if (cancelled) {
        return;
      }

      /*
        Short pause after the final selected cell.
      */
      await wait(160);

      if (cancelled) {
        return;
      }

      /* =========================================
         6. NAVBAR STARTS REVEALING
      ========================================= */

      onShowNavbar?.();

      /*
        Preserve the old integration behavior:
        allow the navbar time to establish itself
        before the curtain exposes the real page.
      */
      await wait(650);

      if (cancelled) {
        return;
      }

      /* =========================================
         7. SOFT CURTAIN LIFT
      ========================================= */

      panel.classList.remove("drop");

      panel.style.animation = "none";

      panel.style.transform = "translateY(0) scale(1)";

      panel.style.opacity = "1";

      /*
        Register the curtain's starting state
        before triggering its exit.
      */
      void panel.offsetHeight;

      panel.style.transition = [
        "transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
        "opacity 1450ms ease",
      ].join(", ");

      requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }

        panel.style.transform = "translateY(-102%) scale(1.01)";

        panel.style.opacity = "0.96";
      });

      await wait(1800);

      if (cancelled) {
        return;
      }

      /* =========================================
         8. CLEANUP + HERO START
      ========================================= */

      panel.style.display = "none";

      document.body.classList.remove("intro-running");

      onComplete?.();
    };

    /* =========================================
       START
    ========================================= */

    const startTimer = window.setTimeout(() => {
      if (prefersReducedMotion) {
        runReducedMotionIntro();
      } else {
        runIntro();
      }
    }, 100);

    timers.push(startTimer);

    /* =========================================
       CLEANUP
    ========================================= */

    return () => {
      cancelled = true;

      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      document.body.classList.remove("intro-running");
    };
  }, [gridConfig, onShowNavbar, onComplete]);

  return (
    <div className="intro-panel" ref={panelRef} aria-hidden="true">
      {/* Programmatically rendered academic grid */}
      <div
        className="intro-activation-grid"
        style={{
          "--grid-columns": gridConfig.columns,
          "--grid-rows": gridConfig.rows,
        }}
      >
        {gridCells.map((cell) => (
          <div
            key={`${cell.row}-${cell.column}`}
            className="intro-grid-cell"
            data-row={cell.row}
            data-column={cell.column}
          />
        ))}
      </div>

      {/* Existing Think First swirl */}
      <div className="intro-swirl-wrap" ref={swirlWrapRef}>
        <svg
          className="intro-swirl-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            className="intro-swirl-path"
            d="
              M 50 20
              C 72 20, 84 32, 84 50
              C 84 68, 68 80, 50 80
              C 32 80, 22 68, 22 54
              C 22 40, 34 32, 46 32
              C 58 32, 66 40, 66 50
              C 66 58, 58 64, 50 64
              C 44 64, 40 60, 40 54
            "
          />
        </svg>
      </div>
    </div>
  );
}

export default IntroAnimation;
