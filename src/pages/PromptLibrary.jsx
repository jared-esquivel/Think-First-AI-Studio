import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import PromptLibraryHero from "../components/PromptLibraryHero/PromptLibraryHero";
import PromptNotebookSection from "../components/PromptNotebookSection/PromptNotebookSection";

function PromptLibrary() {
  return (
    <>
      <Navbar />

      <main>
        <PromptLibraryHero />
        <PromptNotebookSection />
      </main>

      <Footer />
    </>
  );
}

export default PromptLibrary;
