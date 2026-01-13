import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/styles/welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // or "/templates" or "/dashboard"
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      {/* Stars */}
      <div className="stars"></div>

      {/* Content */}
      <div className="welcome-content">
        <h1 className="title">Welcome to Our Galaxy</h1>
        <p className="subtitle">
          Take your Resume to Sky ✨
        </p>

        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Rocket */}
      <div className="rocket">
        🚀
      </div>

      {/* Clouds */}
      <div className="clouds"></div>
    </div>
  );
}
