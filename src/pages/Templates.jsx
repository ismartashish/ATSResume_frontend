import { useNavigate, useLocation } from "react-router-dom";
import "../styles/templates.css";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Best for freshers & corporate roles",
    highlights: [
      "Simple headings",
      "Recruiter friendly",
      "ATS score stable"
    ]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Great for tech & startup roles",
    highlights: [
      "Strong project focus",
      "Skill-forward layout",
      "Clean typography"
    ]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Perfect for ATS-heavy companies",
    highlights: [
      "No visual noise",
      "Maximum ATS parsing",
      "One-column only"
    ]
  }
];

export default function Templates() {
  const navigate = useNavigate();
  const { state } = useLocation(); // resume analysis data

  return (
    <div className="templates-page">

      <h1>Select a Resume Template</h1>
      <p className="subtitle">
        All templates are <strong>ATS-safe</strong> (single column, no graphics)
      </p>

      {/* TEMPLATE GRID */}
      <div className="template-grid">
        {templates.map(t => (
          <div className="template-card" key={t.id}>

            <h3>{t.name}</h3>
            <p className="desc">{t.description}</p>

            <ul>
              {t.highlights.map(h => (
                <li key={h}>✓ {h}</li>
              ))}
            </ul>

            <button
              className="start-btn"
              onClick={() =>
                navigate("/templates/editor", {
                  state: { ...state, template: t.id }
                })
              }
            >
              Start Editing →
            </button>
          </div>
        ))}
      </div>

      {/* ATS GUIDANCE */}
      <div className="ats-guide">

        <div className="do">
          <h3>✅ Do This (ATS Friendly)</h3>
          <ul>
            <li>Use standard headings (Experience, Skills)</li>
            <li>Add skills inside projects & experience</li>
            <li>Use action verbs (built, optimized, deployed)</li>
            <li>Add metrics (30%, 2x, reduced time)</li>
          </ul>
        </div>

        <div className="dont">
          <h3>❌ Avoid This</h3>
          <ul>
            <li>Icons, graphics, images</li>
            <li>Two-column layouts</li>
            <li>Fancy fonts</li>
            <li>Keyword stuffing</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
