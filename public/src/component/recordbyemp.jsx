import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/recordbyid.css";

const EmpRecord = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // 🧩 Function to fetch employee attendance
  const emprecord = async () => {
    if (!employeeId) {
      setError("⚠️ Please enter Employee ID");
      return;
    }

    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.get(`http://localhost:5000/byemp/${employeeId}`);
      setAttendanceData(response.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError("❌ Failed to fetch attendance data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-attendance-container">
      <h2>👤 HRMS | Employee Attendance</h2>

      <div className="search-bar">
        <input
          type="number"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={emprecord}>Search</button>
      </div>

      {loading && <p className="loading">⏳ Loading attendance records...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && searched && attendanceData.length === 0 && !error && (
        <p className="no-data">No attendance records found for this employee.</p>
      )}

      {!loading && attendanceData.length > 0 && (
        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td
                    className={
                      record.status === "Present"
                        ? "status-present"
                        : record.status === "Leave"
                        ? "status-leave"
                        : "status-absent"
                    }
                  >
                    {record.status}
                  </td>
                  <td>{record.checkInTime || "-"}</td>
                  <td>{record.checkOutTime || "-"}</td>
                  <td>{record.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmpRecord;
