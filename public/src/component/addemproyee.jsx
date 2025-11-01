import React, { useState } from "react";
import axios from "axios";
import "../css/addemproyee.css";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    qualification: "",
    salary: "",
    location: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/addemp", employee);
      alert(response.data.message || " Employee added successfully!");
      console.log("Server Response:", response.data);

      setEmployee({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        qualification: "",
        salary: "",
        location: "",
        joiningDate: "",
      });
    } catch (error) {
      console.error(" Error adding employee:", error);
      alert(" Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={employee.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            placeholder="Enter designation"
            required
          />
        </div>

        <div className="form-group">
          <label>Qualification</label>
          <input
            type="text"
            name="qualification"
            value={employee.qualification}
            onChange={handleChange}
            placeholder="Enter qualification"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={employee.location}
            onChange={handleChange}
            placeholder="Enter work location"
            required
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
