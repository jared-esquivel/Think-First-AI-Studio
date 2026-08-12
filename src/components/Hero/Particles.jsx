import { useEffect, useState } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildParticles() {
  const count = window.innerWidth < 600 ? 20 : 36;

  return Array.from({ length: count }, (_, index) => ({
    id: `${index}-${Math.random()}`,
    left: randomBetween(2, 98),
    top: randomBetween(4, 96),
    size: randomBetween(1.2, 3.8),
    duration: randomBetween(10, 22),
    delay: randomBetween(-22, 2),
    opacity: randomBetween(0.08, 0.3),
    x: randomBetween(-18, 18),
    y: randomBetween(-35, -12),
  }));
}

function Particles() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(buildParticles());

    let resizeTimer;

    function handleResize() {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        setItems(buildParticles());
      }, 220);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="particles" aria-hidden="true">
      {items.map((particle) => (
        <span
          className="particle"
          key={particle.id}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            "--particle-size": `${particle.size}px`,
            "--particle-duration": `${particle.duration}s`,
            "--particle-delay": `${particle.delay}s`,
            "--particle-opacity": particle.opacity,
            "--particle-x": `${particle.x}px`,
            "--particle-y": `${particle.y}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
