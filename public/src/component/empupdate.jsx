import React, { useState } from "react";
import axios from "axios";
import "../css/empupdate.css";

function UpdateEmployee() {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!id.trim()) {
      setError("Please enter an Employee ID");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/byid/${id}`);
      setEmployee(res.data);
      setError("");
      setMessage("");
    } catch (err) {
      console.error("Error fetching employee:", err);
      setError("Employee not found");
      setEmployee(null);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/updateemp/${id}`, employee);
      setMessage(res.data.message);
      setError("");
      console.log("update controlll hit")
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("Failed to update employee");
    }
  };

  return (
    <div className="update-container">
      <h2>✏️ Update Employee</h2>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {/* Update Form */}
      {employee && (
        <div className="form-container">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={employee.fullName || ""}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={employee.phone || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={employee.department || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={employee.designation || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={employee.qualification || ""}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={employee.location || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="joiningDate"
            placeholder="Joining Date"
            value={employee.joiningDate?.split("T")[0] || ""}
            onChange={handleChange}
          />

          <button className="update-btn" onClick={handleUpdate}>
            Update Employee
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateEmployee;
