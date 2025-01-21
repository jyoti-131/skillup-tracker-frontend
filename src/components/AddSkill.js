import React, { useState } from "react";
import axios from "axios";
import "./AddSkill.css";

// Corrected illustration path
const ILLUSTRATION_PATH = "/Team work-cuate.png";

function AddSkill() {
  const [name, setName] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to log in first!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "http://localhost:5001/add-skill",
        { name, progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Skill added successfully!");
      setName("");
      setProgress("");
    } catch (error) {
      console.error("Error adding skill:", error.response?.data || error.message);
      setMessage("Failed to add skill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    console.error("Failed to load illustration");
  };

  return (
    <div className="add-skill-container">
      <div className="add-skill-wrapper">
        {!imageError && (
          <div className="illustration">
            <img
              src={ILLUSTRATION_PATH}
              alt="Skill Illustration"
              className="skill-illustration"
              onError={handleImageError}
            />
          </div>
        )}

        <form className="add-skill-form" onSubmit={handleSubmit}>
          <h2>Add a New Skill</h2>

          {message && (
            <p
              className={`message ${
                message.includes("successfully") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="form-group">
            <label htmlFor="skillName">Skill Name:</label>
            <input
              type="text"
              id="skillName"
              placeholder="Enter skill name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skillProgress">Skill Progress (%):</label>
            <input
              type="number"
              id="skillProgress"
              placeholder="Enter progress (0-100)"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              min="0"
              max="100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? "Adding Skill..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkill;
