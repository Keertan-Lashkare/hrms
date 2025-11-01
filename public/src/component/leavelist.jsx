import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/leavelist.css";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/leavelist");
      setLeaves(response.data);
    } catch (error) {
      console.error("❌ Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ✅ Update leave status (Accept / Reject)
  const updateLeaveStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/updateleave/${id}/status`, {
        status: newStatus,
      });

      // Update UI instantly
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave.id === id ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert("Failed to update leave status");
    }
  };

  if (loading) return <p className="loading">⏳ Loading leaves...</p>;

  return (
    <div className="leave-list-container">
      <h2>HRMS | Leave Management</h2>

      {leaves.length === 0 ? (
        <p className="no-data">No leave requests found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.name}</td>
                  <td>{leave.department}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td className={`status ${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </td>
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => updateLeaveStatus(leave.id, "Approved")}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateLeaveStatus(leave.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="done">
                        ✅ {leave.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
