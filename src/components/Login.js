import React, { useState, useEffect } from "react";
import axios from "axios";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check for remembered email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      
      localStorage.setItem("token", response.data.token);
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      alert("Login successful!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Top Illustration */}
      <div className="illustration-section">
        <img 
          src="/Team spirit-cuate.png" 
          alt="Welcome illustration" 
        />
      </div>

      {/* Form Section */}
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Welcome Back</h1>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "error" : ""}
              disabled={isLoading}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "error" : ""}
              disabled={isLoading}
              required
              minLength="6"
            />
          </div>

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="form-footer">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          </div>
        </form>
      </div>

      {/* Bottom Illustration */}
      <div className="illustration-section">
        <img 
          src="/Creative team-pana.png" 
          alt="Decorative illustration" 
        />
      </div>
    </div>
  );
}

export default Login;