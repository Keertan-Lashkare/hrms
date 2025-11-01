import React, { useState } from "react";
import axios from "axios";
import "../css/addjob.css";

const Applyjob = () => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    location: "",
    salary: "",
    postedBy: "",
  });

  const [message, setMessage] = useState("");

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (
      !formData.title ||
      !formData.department ||
      !formData.description ||
      !formData.location ||
      !formData.salary ||
      !formData.postedBy
    ) {
      setMessage("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/addjob", formData);

      if (response.status === 201) {
        setMessage("Job posted successfully!");
        setFormData({
          title: "",
          department: "",
          description: "",
          location: "",
          salary: "",
          postedBy: "",
        });
      }
    } catch (error) {
      console.error(" Error posting job:", error);
      setMessage(" Failed to post job. Please try again.");
    }
  };

  return (
    <div className="recruitment-container">
      <div className="recruitment-card">
        <h2>HRMS | Post New Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="form-group">
            <label>Department*</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., IT, HR, Marketing"
            />
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description..."
            />
          </div>

          <div className="form-group">
            <label>Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Mumbai"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Salary (₹)*</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 600000"
              />
            </div>

            <div className="form-group half">
              <label>Posted By*</label>
              <input
                type="text"
                name="postedBy"
                value={formData.postedBy}
                onChange={handleChange}
                placeholder="HR name"
              />
            </div>
          </div>

          <button type="submit">Post Job</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Applyjob;
