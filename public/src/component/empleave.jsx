import React, { useState } from "react";
import axios from "axios";
import "../css/empleave.css"; // External CSS

const EmpLeaveRecord = () => {
  const [empId, setEmpId] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLeaves = async () => {
    if (!empId) {
      setMessage("⚠️ Please enter Employee ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/empleave/${empId}`);
      if (response.data.length === 0) {
        setMessage("ℹ️ No leave records found.");
        setLeaves([]);
      } else {
        setLeaves(response.data);
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      setMessage("❌ Failed to fetch leave records.");
    }
  };

  return (
    <div className="leave-wrapper">
      <div className="leave-card">
        <h2>HRMS | Employee Leave Records</h2>

        <div className="input-group">
          <input
            type="number"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
          <button onClick={fetchLeaves}>Search</button>
        </div>

        {message && <p className="message">{message}</p>}

        {leaves.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Leave ID</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.id}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.reason}</td>
                    <td className={`status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </td>
                    <td>{new Date(leave.appliedOn).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpLeaveRecord;
