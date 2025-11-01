import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/record.css";

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:5000/record");
        setAttendanceData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("❌ Failed to load attendance data.");
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p className="loading">⏳ Loading attendance records...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="attendance-container">
      <h2>📅 HRMS | Attendance Records</h2>

      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No attendance records found
                </td>
              </tr>
            ) : (
              attendanceData.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.fullName}</td>
                  <td>{record.department}</td>
                  <td>{record.designation}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
