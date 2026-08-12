function LightBulb() {
  return (
    <div className="hero__label" aria-hidden="true">
      <span className="hero__bulb">
        <span className="hero__bulb-glow" />

        <svg viewBox="0 0 64 64" focusable="false">
          <path
            className="hero__bulb-glass"
            d="M32 7C20.4 7 11 16.4 11 28c0 7.7 4.1 14.4 10.3 18.1
            2.2 1.3 3.7 3.6 4 6.1h13.4c.3-2.5 1.8-4.8 4-6.1
            C48.9 42.4 53 35.7 53 28 53 16.4 43.6 7 32 7Z"
          />

          <path className="hero__bulb-filament" d="M25 29l7 7 7-7" />
          <path className="hero__bulb-filament" d="M32 36v16" />
          <path className="hero__bulb-base" d="M24 52h16" />
          <path className="hero__bulb-base" d="M25 57h14" />

          <path className="hero__bulb-ray" d="M32 1v3" />
          <path className="hero__bulb-ray" d="M8 9l3 3" />
          <path className="hero__bulb-ray" d="M56 9l-3 3" />
          <path className="hero__bulb-ray" d="M2 29h4" />
          <path className="hero__bulb-ray" d="M58 29h4" />
        </svg>
      </span>
    </div>
  );
}

export default LightBulb;
