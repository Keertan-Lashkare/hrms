import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/application.css";

const Applicationlist = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/applicationlist");
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/updateapplication/${id}`, { status });
      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update application status ❌");
    }
  };

  if (loading) return <p className="loading">Loading applications...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="app-container">
      <h2>📄 Job Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="app-grid">
          {applications.map((app) => (
            <div className="app-card" key={app.applicationId}>
              <h3>{app.jobTitle || "Unknown Job"}</h3>
              <p><strong>Department:</strong> {app.department}</p>
              <p><strong>Location:</strong> {app.location}</p>

              <hr />

              <p><strong>Applicant:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p>
                <strong>Resume:</strong>{" "}
                <a href={app.resume} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </p>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Applied On:</strong> {new Date(app.appliedOn).toLocaleDateString()}</p>

              <div className="button-group">
                <button
                  className="accept-btn"
                  onClick={() => handleStatusChange(app.applicationId, "Accepted")}
                  disabled={app.status === "Accepted"}
                >
                  Accept 
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleStatusChange(app.applicationId, "Rejected")}
                  disabled={app.status === "Rejected"}
                >
                  Reject 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicationlist;
