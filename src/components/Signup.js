import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/signup", {
        username,
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      alert("Failed to register.");
    }
  };

  return (
    <div className="signup-container">
      <div className="illustration-container">
        <img
          src={process.env.PUBLIC_URL + "/Designer girl-cuate.png"}
          alt="Signup Illustration"
          className="signup-illustration"
        />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
