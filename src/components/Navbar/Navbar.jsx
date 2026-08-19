import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Primary navigation">
        {/* Brand */}
        <Link className="site-nav__brand" to="/" onClick={closeMenu}>
          ThinkFirst<span>.</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className={`site-nav__toggle ${isOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-nav-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="site-nav__toggle-line" />
          <span className="site-nav__toggle-line" />
          <span className="site-nav__toggle-line" />
        </button>

        {/* Navigation */}
        <div
          className={`site-nav__menu ${isOpen ? "is-open" : ""}`}
          id="primary-nav-menu"
        >
          <Link
            className="site-nav__link"
            to="/prompt-framework"
            onClick={closeMenu}
          >
            Framework
          </Link>

          <Link
            className="site-nav__link"
            to="/workshop-resources"
            onClick={closeMenu}
          >
            Workshops
          </Link>

          <Link
            className="site-nav__link"
            to="/prompt-library"
            onClick={closeMenu}
          >
            Prompt Library
          </Link>

          <Link
            className="site-nav__link"
            to="/academic-integrity"
            onClick={closeMenu}
          >
            Academic Integrity
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
