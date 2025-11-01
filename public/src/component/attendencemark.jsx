import React, { useState } from "react";
import axios from "axios";
import "../css/mark.css";

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "",
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.date || !formData.status) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/mark", formData);

      setMessage("✅ Attendance marked successfully!");
      setFormData({
        employeeId: "",
        date: "",
        status: "",
        checkInTime: "",
        checkOutTime: "",
        remarks: "",
      });
    } catch (error) {
      console.error("Error marking attendance:", error);
      if (error.response) {
        setMessage(`❌ ${error.response.data.error || "Server error"}`);
        console.log(error)
      } else {
        setMessage("❌ Failed to connect to server.");
      }
    }
  };

  return (
    <div className="attendance-wrapper">
      <div className="attendance-card">
        <h2>HRMS | Mark Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee ID*</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
            />
          </div>

          <div className="form-group">
            <label>Date*</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">-- Select Status --</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Check-In Time</label>
              <input
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Check-Out Time</label>
              <input
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Optional remarks..."
            />
          </div>

          <button type="submit">Submit Attendance</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AttendanceForm;
