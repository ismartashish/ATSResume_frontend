import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

/* =======================
   TEXT HIGHLIGHTER (ATS)
======================= */
function highlightText(text, resumeSkills, missingSkills, repetitions) {
  let highlighted = text;

  resumeSkills.forEach(skill => {
    const regex = new RegExp(`\\b(${skill})\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="skill-found">$1</span>`
    );
  });

  missingSkills.forEach(skill => {
    const regex = new RegExp(`\\b(${skill})\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="skill-missing">$1</span>`
    );
  });

  repetitions.forEach(r => {
    const regex = new RegExp(`\\b(${r.word})\\b`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="skill-repeat">$1</span>`
    );
  });

  return highlighted;
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  /* =======================
     SAFE DATA EXTRACTION
  ======================= */
  const {
    resumeScore = 0,
    resumeSkills = [],
    missingSkills = [],
    suggestions = [],
    aiWarnings = [],
    repetitions = [],
    resumeText = "",
    structuredResume = null,
    jobDescription = "",
    premiumATS = null
  } = state;

  const strength =
    resumeScore >= 80 ? "GOOD" :
    resumeScore >= 60 ? "AVERAGE" : "POOR";

  return (
    <div className="result-wrapper">

      {/* ================= LEFT PANEL ================= */}
      <div className="resume-preview">

        <h2>{strength} RESUME</h2>
        <p className="subtitle">
          ATS scan based on your resume & job description
        </p>

        <div className="diagnostic-box info">
          <h4>Why Your Resume Scored {resumeScore}/100</h4>
          <p>
            ATS systems prioritize job-specific keywords and natural phrasing.
          </p>
        </div>

        <div className="diagnostic-box good">
          <h4>What’s Working Well ✅</h4>
          <ul>
            <li>Contact information detected</li>
            <li>Professional summary present</li>
            <li>Skills section found</li>
            <li>Work history included</li>
          </ul>
        </div>

        {missingSkills.length > 0 && (
          <div className="diagnostic-box warn">
            <h4>Critical Missing Skills</h4>
            <ul>
              {missingSkills.map((skill, i) => (
                <li key={skill}>
                  <strong>{skill}</strong>
                  {i < 2 && <span className="impact"> — High impact</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {aiWarnings.length > 0 && (
          <div className="diagnostic-box bad">
            <h4>AI / Generic Content 🤖</h4>
            <ul>
              {aiWarnings.map(w => <li key={w}>{w}</li>)}
            </ul>
          </div>
        )}

        {repetitions.length > 0 && (
          <div className="diagnostic-box warn">
            <h4>Repetitive Words 🔁</h4>
            <ul>
              {repetitions.map(r => (
                <li key={r.word}>
                  <strong>{r.word}</strong> used {r.count} times
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="diagnostic-box quick">
          <h4>Fix in 15 Minutes ⚡</h4>
          <ol>
            <li>Add missing skills in Projects</li>
            <li>Mention tools per experience</li>
            <li>Use action verbs</li>
            <li>Add measurable results</li>
          </ol>
        </div>

        {resumeText && (
          <div className="resume-text-preview">
            <h4>Resume Content (ATS View)</h4>
            <div
              className="resume-text"
              dangerouslySetInnerHTML={{
                __html: highlightText(
                  resumeText,
                  resumeSkills,
                  missingSkills,
                  repetitions
                )
              }}
            />
          </div>
        )}
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="ats-panel">

        <div className="score-card">
          <div className="circle">
            <span>{resumeScore}</span>
          </div>
          <p className="strength">{strength}</p>
          <p className="label">Resume Strength</p>
        </div>

        {premiumATS && (
          <div className="premium-box">
            <h4>Premium ATS ⭐</h4>
            <ul>
              <li>Keyword Coverage: <strong>{premiumATS.keywordCoverage}%</strong></li>
              <li>AI Risk: <strong>{premiumATS.aiRisk}</strong></li>
              <li>Repetition Penalty: <strong>−{premiumATS.repetitionPenalty}</strong></li>
              <li>Section Score: <strong>{premiumATS.sectionScore}/100</strong></li>
            </ul>
          </div>
        )}

        <h4>Suggestions</h4>
        <ul className="suggestions">
          {suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>

        {/* ✅ FIXED CTA */}
        <button
          className="template-btn"
          onClick={() =>
            navigate("/templates/editor", {
              state: {
                resumeText,                           // RAW USER RESUME
                structuredResume: structuredResume ?? null,
                missingSkills,
                resumeScore,
                jobDescription,
                template: "modern"
              }
            })
          }
        >
          Work with Templates
        </button>

      </div>
    </div>
  );
}
