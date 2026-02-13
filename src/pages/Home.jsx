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

    // ✅ MUST match backend parameter names exactly
    formData.append("resume", file);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await api.post("/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // ✅ Backend returns data directly, not inside data.data
      navigate("/result", { state: res.data });

    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      alert("Resume analysis failed. Check console for details.");
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
          <label>Upload Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
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
    </div>
  );
}
