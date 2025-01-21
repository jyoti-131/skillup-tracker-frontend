import React, { useEffect, useState } from "react";
import axios from "axios";
import EditSkill from "./EditSkill";
import "./SkillDashboard.css";

function SkillDashboard() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const updateSkill = (updatedSkill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill._id === updatedSkill._id ? updatedSkill : skill
      )
    );
    setEditingSkill(null);
  };

  const deleteSkill = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first!");
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(skills.filter((skill) => skill._id !== id));
      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error.response?.data || error.message);
      alert("Failed to delete skill.");
    }
  };

  if (loading) {
    return (
      <div className="skill-dashboard-container">
        <div className="skill-dashboard">
          <p className="loading">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-dashboard-container">
      <div className="skill-dashboard">
        <h2>Your Skills</h2>
        {skills.length === 0 ? (
          <p className="no-skills">No skills added yet.</p>
        ) : editingSkill ? (
          <EditSkill
            skill={editingSkill}
            onSkillUpdated={updateSkill}
            onCancel={() => setEditingSkill(null)}
          />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Progress (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill._id}>
                    <td>{skill.name}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                        <span className="progress-text">{skill.progress}%</span>
                      </div>
                    </td>
                    <td className="action-buttons">
                      <button 
                        className="edit-button"
                        onClick={() => setEditingSkill(skill)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => deleteSkill(skill._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillDashboard;