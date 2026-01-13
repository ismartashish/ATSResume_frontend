import { useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please upload your resume and paste the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    try {
      setLoading(true);
      const res = await api.post("/resume/analyze", formData);
      navigate("/result", { state: res.data.data });
    } catch (err) {
      alert("Resume analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      {loading && <Loader />}

      {/* HERO */}
      <section className="hero">
        <h1>Smart Resume Analyzer</h1>
        <p>
          Check how well your resume matches a job description using
          <strong> real ATS logic</strong>.
        </p>
        <span className="sub">
          Used for placements, internships & job applications
        </span>
      </section>

      {/* MAIN CARD */}
      <section className="analyze-card">
        <h2>Analyze Your Resume</h2>

        {/* FILE UPLOAD */}
        <div className="input-group">
          <label>Upload Resume (PDF / TXT)</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <span className="file-name">{file.name}</span>}
        </div>

        {/* JOB DESCRIPTION */}
        <div className="input-group">
          <label>Paste Job Description</label>
          <textarea
            placeholder="Paste the job description here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        {/* CTA */}
        <button className="analyze-btn" onClick={handleSubmit}>
          Analyze Resume
        </button>

        <p className="privacy">
          🔒 Your resume is never stored or shared.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Upload your resume</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Paste job description</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Get ATS score & fixes</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>What You’ll Get</h2>
        <ul>
          <li>✅ ATS resume score</li>
          <li>✅ Missing skills detection</li>
          <li>✅ AI & repetitive content warnings</li>
          <li>✅ Resume improvement suggestions</li>
          <li>✅ Resume templates with fixes</li>
        </ul>
      </section>
    </div>
  );
}
