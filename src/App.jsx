import { Routes, Route } from "react-router-dom";

import Welcome from "./Welcome";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";
import CompareTemplates from "./pages/CompareTemplates";

import "./styles/main.css";
import "./styles/print.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/templates/editor" element={<TemplateEditor />} />
      <Route path="/templates/compare" element={<CompareTemplates />} />
    </Routes>
  );
}
