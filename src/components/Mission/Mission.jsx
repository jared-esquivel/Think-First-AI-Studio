import "./Mission.css";
import thinkFirstSpiral from "../../assets/ThinkFirstSpiral.svg";

function Mission() {
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="mission__ambient" aria-hidden="true" />

      <div className="mission__inner">
        {/* Editorial metadata */}
        <div className="mission__meta" aria-hidden="true">
          <span>Our Mission</span>
          <span>Think First</span>
        </div>

        <div className="mission__rule" aria-hidden="true" />

        {/* Main editorial statement */}
        <div className="mission__statement">
          <h2
            className="mission__line mission__line--primary"
            id="mission-title"
          >
            Think for yourself
            <span>.</span>
          </h2>

          {/* Actual Think First spiral */}
          <div className="mission__logo-wrap" aria-hidden="true">
            <div className="mission__logo-glow" />

            <img
              className="mission__logo"
              src={thinkFirstSpiral}
              alt=""
              draggable="false"
            />
          </div>

          <p
            className="mission__line mission__line--secondary"
            aria-hidden="true"
          >
            Shape the future
            <br />
            of AI
            <span>.</span>
          </p>

          {/* Screen-reader continuation of the heading */}
          <span className="mission__sr-only">Shape the future of AI.</span>
        </div>

        {/* Mission copy */}
        <div className="mission__copy-wrap">
          <div className="mission__copy-rule" aria-hidden="true" />

          <p className="mission__copy">
            <strong>Our Mission: </strong>Technology will keep moving forward.
            So should the way we think about it. Think First exists to help
            students question what AI gives them, understand how to use it, and
            develop the confidence to make their own decisions.
          </p>
        </div>

        {/* Bottom metadata */}
        <div className="mission__footer" aria-hidden="true">
          <span>Think First</span>
          <span>AI Studio</span>
        </div>
      </div>
    </section>
  );
}

export default Mission;
