import React, { useState } from "react";
import axios from "axios";
import "../css/apply.css";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.employeeId || !formData.leaveType || !formData.startDate || !formData.endDate) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/applyleave", formData);
      setMessage("✅ Leave applied successfully!");
      setFormData({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (error) {
      console.error("❌ Error applying leave:", error);
      if (error.response?.data?.error) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage("❌ Failed to connect to the server.");
      }
    }
  };

  return (
    <div className="leave-container">
      <h2>🗓️ HRMS | Apply for Leave</h2>

      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <label>Employee ID*</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter Employee ID"
          />
        </div>

        <div className="form-group">
          <label>Leave Type*</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="">-- Select Type --</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date*</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Optional reason for leave"
          />
        </div>

        <button type="submit">Apply Leave</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ApplyLeave;
