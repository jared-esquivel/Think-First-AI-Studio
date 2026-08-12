import { useEffect, useState } from "react";

import IntroAnimation from "../components/IntroAnimation/IntroAnimation";
import Hero from "../components/Hero/Hero";
import ResourceGrid from "../components/ResourceGrid/ResourceGrid";
import Mission from "../components/Mission/Mission";
import Footer from "../components/Footer/Footer";

function Home() {
  const [shouldPlayIntro] = useState(() => {
    return sessionStorage.getItem("think-first-intro-played") !== "true";
  });

  useEffect(() => {
    if (shouldPlayIntro) {
      sessionStorage.setItem("think-first-intro-played", "true");
    }
  }, [shouldPlayIntro]);

  return (
    <>
      {shouldPlayIntro && <IntroAnimation />}

      <Hero />

      <ResourceGrid />

      <Mission />

      <Footer />
    </>
  );
}

export default Home;
