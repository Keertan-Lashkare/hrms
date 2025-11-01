import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/joblist.css";

const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch job data from backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/listjob");
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a job
  const deleteJob = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/closejob/${id}`);
      alert("✅ Job deleted successfully!");
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("❌ Failed to delete job");
    }
  };

  if (loading) return <p className="loading">Loading job posts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="job-list-container">
      <h2>📋 Job Openings</h2>

      {jobs.length === 0 ? (
        <p>No job openings found.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p><strong>Department:</strong> {job.department}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <p className="desc">{job.description}</p>
              <p className="posted">
                Posted by <b>{job.postedBy}</b> on{" "}
                {new Date(job.postedDate || job.createdAt).toLocaleDateString()}
              </p>

              {/* ✅ Delete Button */}
              <button className="delete-btn" onClick={() => deleteJob(job.id)}>
                ❌ Delete Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Joblist;
