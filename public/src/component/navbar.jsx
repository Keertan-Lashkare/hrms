import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {/* Employee Management */}
        <li onClick={() => toggleDropdown("employee")}>
          Employee Management
          {activeDropdown === "employee" && (
            <ul className="dropdown">
              <li onClick={() => navigate("/addemproyee")}>Add Employee</li>
              <li onClick={() => navigate("/emproyeelist")}>Employee List</li>
              <li onClick={() => navigate("/searchemproyee")}>Search Employee</li>
              <li onClick={() => navigate("/updateemproyee")}>Update Employee</li>
            </ul>
          )}
        </li>

        {/* Attendance Management */}
        <li onClick={() => toggleDropdown("attendance")}>
          Attendance Management
          {activeDropdown === "attendance" && (
            <ul className="dropdown">
              <li onClick={() => navigate("/mark")}>Mark Attendance</li>
              <li onClick={() => navigate("/byemp")}>Attendance by Employee</li>
              <li onClick={() => navigate("/record")}>Attendance Records</li>
              
            </ul>
          )}
        </li>

        {/* Leave Management */}
        <li onClick={() => toggleDropdown("leave")}>
          Leave Management
          {activeDropdown === "leave" && (
            <ul className="dropdown">
              <li onClick={() => navigate("/applyleave")}>Apply for Leave</li>
              <li onClick={() => navigate("/leavelist")}>Leave List</li>
              <li onClick={() => navigate("/empleave")}>Employee Leaves</li>
              
            </ul>
          )}
        </li>

        {/* Recruitment Management */}
        <li onClick={() => toggleDropdown("recruitment")}>
          Recruitment Management
          {activeDropdown === "recruitment" && (
            <ul className="dropdown">
              <li onClick={() => navigate("/addjob")}>Add Job</li>
              <li onClick={() => navigate("/listjob")}>Job Listings</li>
              <li onClick={() => navigate("/applicationlist")}>Applications</li>
              <li onClick={() => navigate("/jobapply")}>Apply for Job</li>
              
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
