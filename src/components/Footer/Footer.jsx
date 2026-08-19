import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="think-footer">
      {/* ========================================
          Decorative background layers
      ======================================== */}

      <div className="think-footer__grid" aria-hidden="true" />

      <div className="think-footer__glow" aria-hidden="true" />

      <div className="think-footer__inner">
        <div className="think-footer__main">
          {/* ========================================
              Brand
          ======================================== */}

          <div className="think-footer__brand">
            <Link
              to="/"
              className="think-footer__wordmark"
              aria-label="Think First home"
            >
              ThinkFirst
              <span className="think-footer__period" aria-hidden="true">
                .
              </span>
            </Link>

            <p className="think-footer__brand-label">AI Studio</p>

            <p className="think-footer__brand-copy">
              Thoughtful tools, resources, and guidance for learning with AI.
            </p>
          </div>

          {/* ========================================
              Navigation
          ======================================== */}

          <nav className="think-footer__nav" aria-label="Footer navigation">
            {/* Explore */}
            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Explore</p>

              <Link to="/#mission">Mission</Link>

              <Link to="/prompt-library">Prompt Library</Link>

              <Link to="/workshop-resources">Workshop Resources</Link>
            </div>

            {/* Learn */}
            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Learn</p>

              <Link to="/prompt-framework">Prompting Framework</Link>

              <Link to="/academic-integrity">Academic Integrity</Link>

              <Link to="/prompt-library">Explore Prompts</Link>
            </div>

            {/* Resources */}
            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Resources</p>

              <Link to="/workshop-resources">Workshops</Link>

              <Link to="/prompt-library">Prompt Library</Link>

              <Link to="/">Think First Home</Link>
            </div>
          </nav>
        </div>

        {/* ========================================
            Bottom bar
        ======================================== */}

        <div className="think-footer__bottom">
          <p>Built for thoughtful learning.</p>

          <p>© 2026 Think First</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
