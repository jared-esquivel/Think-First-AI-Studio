import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import PromptLibrary from "./pages/PromptLibrary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/prompt-library" element={<PromptLibrary />} />
    </Routes>
  );
}

export default App;
