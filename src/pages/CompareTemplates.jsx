import { useLocation, useNavigate } from "react-router-dom";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import "../styles/compare.css";

export default function CompareTemplates() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.resume) {
    navigate("/");
    return null;
  }

  const originalResume = state.resume;

  // 🔥 Simulate ATS optimized version
  const optimizedResume = {
    ...originalResume,
    profile:
      originalResume.profile +
      " Optimized with ATS-friendly keywords and quantified achievements.",
    experience: originalResume.experience.map(exp => ({
      ...exp,
      bullets: exp.bullets.map(b =>
        b.includes("%") ? b : `${b} (impact-driven result)`
      )
    }))
  };

  return (
    <div className="compare-wrapper">

      <h2>Compare Resume Versions</h2>

      <div className="compare-grid">

        {/* ORIGINAL */}
        <div className="compare-card">
          <h3>Original Resume</h3>
          <div className="resume-preview">
            <ClassicTemplate resume={originalResume} />
          </div>
        </div>

        {/* OPTIMIZED */}
        <div className="compare-card highlight">
          <h3>ATS-Optimized Resume</h3>
          <div className="resume-preview">
            <ClassicTemplate resume={optimizedResume} />
          </div>
        </div>

      </div>

      <div className="compare-actions">
        <button onClick={() => navigate(-1)}>
          ⬅ Back to Editor
        </button>
      </div>
    </div>
  );
}
