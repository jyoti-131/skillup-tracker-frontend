import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/skills/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading...</p>;

  const barChartData = {
    labels: analytics.progressDistribution.map((item) => item.name),
    datasets: [
      {
        label: "Skill Progress",
        data: analytics.progressDistribution.map((item) => item.progress),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Total Skills: {analytics.totalSkills}</p>
      <p>Average Progress: {analytics.avgProgress.toFixed(2)}%</p>
      <Bar data={barChartData} />
    </div>
  );
};

export default Dashboard;
