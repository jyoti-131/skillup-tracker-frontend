import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddSkill from "./components/AddSkill";
import SkillDashboard from "./components/SkillDashboard";
import SkillsList from "./components/SkillsList";
import Footer from "./components/Footer"; // Import Footer
import DashboardPage from "./components/DashboardPage";
import API from "./api";
import "./App.css";

function App() {
  useEffect(() => {
    API.get("/")
      .then((response) => {
        console.log("Response from backend:", response.data);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="landing-page flex flex-col items-center justify-center min-h-screen p-4">
                <div className="illustration-container w-full max-w-2xl mb-8">
                  <img 
                    src={process.env.PUBLIC_URL + '/Job-Interview.png'} 
                    alt="SkillUp Tracker Illustration"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="welcome-message text-center">
                  <h1 className="text-3xl font-bold mb-4">
                    Welcome to SkillUp!
                  </h1>
                  <p className="text-lg text-gray-600">
                    Please log in or sign up to begin your skill tracking journey.
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-skill" element={<AddSkill />} />
          <Route path="/dashboard" element={<SkillDashboard />} />
          <Route path="/skills" element={<SkillsList />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}

export default App;
