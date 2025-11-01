import React, { useState } from "react";
import axios from "axios";
import "../css/applyjob.css";

const Jobapply = () => {
  const [formData, setFormData] = useState({
    jobId: "",
    employeeId: "",
    name: "",
    email: "",
    resume: "",
    status: "Pending",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobId || !formData.employeeId || !formData.name || !formData.email) {
      setMessage(" Please fill all required fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/jobapply", formData);
      setMessage(" Application submitted successfully!");
      console.log(res.data);

      setFormData({
        jobId: "",
        employeeId: "",
        name: "",
        email: "",
        resume: "",
        status: "Pending",
      });
    } catch (error) {
      console.error(" Error applying:", error);
      setMessage(" Failed to submit application.");
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <h2> Apply for a Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job ID*</label>
            <input
              type="text"
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
              placeholder="Enter job ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Employee ID*</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter your employee ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Resume (Link)</label>
            <input
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              placeholder="Paste resume link "
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Jobapply;
