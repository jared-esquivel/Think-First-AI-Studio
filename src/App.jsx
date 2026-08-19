import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import PromptLibrary from "./pages/PromptLibrary";
import AcademicIntegrity from "./pages/AcademicIntegrity";
import PromptFramework from "./pages/PromptFramework";
import WorkshopResources from "./pages/WorkshopResources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/prompt-library" element={<PromptLibrary />} />
      <Route path="/academic-integrity" element={<AcademicIntegrity />} />
      <Route path="/prompt-framework" element={<PromptFramework />} />
      <Route path="/workshop-resources" element={<WorkshopResources />} />
    </Routes>
  );
}

export default App;
