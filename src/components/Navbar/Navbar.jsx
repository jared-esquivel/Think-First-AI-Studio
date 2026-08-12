import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [comingSoonNotice, setComingSoonNotice] = useState("");

  const noticeTimerRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const showComingSoon = (pageName) => {
    if (noticeTimerRef.current) {
      window.clearTimeout(noticeTimerRef.current);
    }

    setComingSoonNotice(`${pageName} is still being built. Check back soon!`);

    closeMenu();

    noticeTimerRef.current = window.setTimeout(() => {
      setComingSoonNotice("");
    }, 3200);
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

      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
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
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
            <button
              className="site-nav__link site-nav__link--coming-soon"
              type="button"
              onClick={() => showComingSoon("Framework")}
            >
              Framework
            </button>

            <button
              className="site-nav__link site-nav__link--coming-soon"
              type="button"
              onClick={() => showComingSoon("Workshops")}
            >
              Workshops
            </button>

            <Link
              className="site-nav__link"
              to="/prompt-library"
              onClick={closeMenu}
            >
              Prompt Library
            </Link>

            <button
              className="site-nav__link site-nav__link--coming-soon"
              type="button"
              onClick={() => showComingSoon("Academic Integrity")}
            >
              Academic Integrity
            </button>
          </div>
        </nav>
      </header>

      {/* Accessible coming-soon notification */}
      <div
        className={`site-nav-notice ${comingSoonNotice ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="site-nav-notice__icon" aria-hidden="true">
          ✦
        </span>

        <span>{comingSoonNotice}</span>
      </div>
    </>
  );
}

export default Navbar;
