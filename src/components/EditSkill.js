import React, { useState } from "react";
import axios from "axios";

const EditSkill = ({ skill, onSkillUpdated, onCancel }) => {
  const [progress, setProgress] = useState(skill.progress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the skill progress using Axios
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.put(
        `http://localhost:5001/skills/${skill._id}`,
        { progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Skill updated successfully!");
      onSkillUpdated(response.data.skill); // Notify parent about updated skill
    } catch (error) {
      console.error("Error updating skill:", error.response?.data || error.message);
      alert("Failed to update skill.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Skill: {skill.name}</h3>
      <label>
        Progress:
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          min="0"
          max="100"
        />
      </label>
      <div>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditSkill;
