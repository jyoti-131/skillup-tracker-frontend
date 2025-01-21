import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import "./SkillsList.css";
import axios from "axios";

const Celebration = ({ skillName }) => {
  return (
    <div className="celebration-overlay">
      <div className="celebration-content">
        <div className="sparkles-container">
          <Sparkles className="sparkle-icon" size={32} />
        </div>
        <h2>Congratulations! 🎉</h2>
        <p>You've mastered <span className="highlight">{skillName}</span>!</p>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>
    </div>
  );
};

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [celebrating, setCelebrating] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You need to log in to view your skills.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/skills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSkills(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to fetch skills. Please try again later.");
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (celebrating) {
      const timer = setTimeout(() => {
        setCelebrating(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [celebrating]);

  const getProgressColor = (progress) => {
    if (progress === 100) return "#00ff88";
    if (progress < 30) return "#ff4d4d";
    if (progress < 70) return "#ffd700";
    return "#00cc88";
  };

  const handleProgressUpdate = (skill) => {
    if (skill.progress === 100 && !celebrating) {
      setCelebrating(skill.name);
    }
  };

  if (loading) {
    return (
      <div className="skills-page">
        <div className="skills-container">
          <h1>Your Skills</h1>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <div className="skills-container">
        <h1>Your Skills Journey</h1>
        {error && <div className="error-message">{error}</div>}
        {celebrating && <Celebration skillName={celebrating} />}
        {skills.length > 0 ? (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div 
                key={skill._id} 
                className={`skill-card ${skill.progress === 100 ? 'skill-completed' : ''}`}
                onAnimationEnd={() => handleProgressUpdate(skill)}
              >
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <div className="circular-progress">
                    <div 
                      className="progress-ring"
                      style={{
                        background: `conic-gradient(
                          ${getProgressColor(skill.progress)} ${skill.progress * 3.6}deg,
                          #e0e0e0 ${skill.progress * 3.6}deg
                        )`
                      }}
                    >
                      <div className="progress-center">
                        <span>{skill.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar"
                    style={{ 
                      width: `${skill.progress}%`,
                      backgroundColor: getProgressColor(skill.progress)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <p>Your skill journey awaits! Add your first skill to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsList;