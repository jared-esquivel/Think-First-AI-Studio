import "./Footer.css";

function Footer() {
  return (
    <footer className="think-footer">
      {/* Decorative background layers */}
      <div className="think-footer__grid" aria-hidden="true" />

      <div className="think-footer__glow" aria-hidden="true" />

      <div className="think-footer__inner">
        <div className="think-footer__main">
          {/* ========================================
              Brand
          ======================================== */}

          <div className="think-footer__brand">
            <a
              href="/"
              className="think-footer__wordmark"
              aria-label="Think First home"
            >
              ThinkFirst
              <span className="think-footer__period" aria-hidden="true">
                .
              </span>
            </a>

            <p className="think-footer__brand-label">AI Studio</p>

            <p className="think-footer__brand-copy">
              Thoughtful tools, resources, and guidance for learning with AI.
            </p>
          </div>

          {/* ========================================
              Navigation
          ======================================== */}

          <nav className="think-footer__nav" aria-label="Footer navigation">
            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Explore</p>

              <a href="#mission">Mission</a>

              <a href="#ai-tools">AI Tools</a>

              <a href="#prompt-library">Prompt Library</a>
            </div>

            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Learn</p>

              <a href="#workshops">Workshops</a>

              <a href="#guides">Guides</a>

              <a href="#learning-resources">Resources</a>
            </div>

            <div className="think-footer__nav-group">
              <p className="think-footer__nav-title">Connect</p>

              <a href="#about">About</a>

              <a href="#contact">Contact</a>

              <a href="#feedback">Feedback</a>
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
