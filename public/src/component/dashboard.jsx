import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

function Dashboard() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          
        </ul>
      </nav>

      {/* Center Content */}
      <div className="content">
        <h1>Welcome to HRMS</h1>
      </div>
    </div>
  );
}

export default Dashboard;
