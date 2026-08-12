import { useEffect, useState } from "react";

const equations = [
  "f(x) = 2x + 8",
  "y = mx + b",
  "∫ x² dx",
  "π ≈ 3.14159",
  "Σ",
  "lim x → ∞",
  "a² + b² = c²",
  "x + y = z",
  "E = mc²",
  "Δx",
  "√x",
  "f(y) = 2xy + 8x",
  "dy / dx",
  "x² − 4 = 0",
  "A = πr²",
  "sin²θ + cos²θ = 1",
  "P(A | B)",
  "∇f",
  "∞",
  "log₂(x)",
  "F = ma",
  "x̄ = Σx / n",
  "ax² + bx + c",
  "∂f / ∂x",
  "eⁱπ + 1 = 0",
  "m = Δy / Δx",
  "V = ⁴⁄₃πr³",
  "cos(θ)",
  "2³ = 8",
  "sin(θ)",
  "tan(θ)",
];

const desktopZones = [
  { x: [6, 23], y: [9, 21] },
  { x: [76, 93], y: [9, 21] },
  { x: [3, 20], y: [22, 38] },
  { x: [80, 96], y: [22, 38] },
  { x: [2, 18], y: [39, 55] },
  { x: [82, 97], y: [39, 55] },
  { x: [3, 21], y: [56, 72] },
  { x: [79, 96], y: [56, 72] },
  { x: [7, 27], y: [73, 88] },
  { x: [73, 92], y: [73, 88] },
];

const mobileZones = [
  { x: [2, 23], y: [5, 18] },
  { x: [74, 96], y: [5, 18] },
  { x: [1, 19], y: [20, 35] },
  { x: [82, 98], y: [20, 35] },
  { x: [1, 17], y: [37, 52] },
  { x: [84, 98], y: [37, 52] },
  { x: [3, 24], y: [73, 88] },
  { x: [76, 96], y: [73, 88] },
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildEquations() {
  const isMobile = window.innerWidth < 600;
  const zones = isMobile ? mobileZones : desktopZones;
  const count = isMobile ? 24 : 44;

  return Array.from({ length: count }, (_, index) => {
    const zone = zones[index % zones.length];

    return {
      id: `${index}-${Math.random()}`,
      text: equations[index % equations.length],
      left: randomBetween(zone.x[0], zone.x[1]),
      top: randomBetween(zone.y[0], zone.y[1]),
      size: randomBetween(0.72, 1.48),
      opacity: randomBetween(0.22, 0.5),
      rotation: randomBetween(-4, 4),
      duration: randomBetween(8, 15),
      delay: randomBetween(-15, 1),
      driftX: randomBetween(-12, 12),
      driftY: randomBetween(-16, -5),
    };
  });
}

function FloatingEquations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(buildEquations());

    let resizeTimer;

    function handleResize() {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        setItems(buildEquations());
      }, 220);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="equation-field" aria-hidden="true">
      {items.map((equation) => (
        <span
          className="equation"
          key={equation.id}
          style={{
            left: `${equation.left}%`,
            top: `${equation.top}%`,
            "--equation-size": `${equation.size}rem`,
            "--equation-opacity": equation.opacity,
            "--equation-rotation": `${equation.rotation}deg`,
            "--equation-duration": `${equation.duration}s`,
            "--equation-delay": `${equation.delay}s`,
            "--equation-drift-x": `${equation.driftX}px`,
            "--equation-drift-y": `${equation.driftY}px`,
          }}
        >
          {equation.text}
        </span>
      ))}
    </div>
  );
}

export default FloatingEquations;
