import React, { useState } from "react";
import axios from "axios";
import "../css/empsearch.css";

function SearchEmployee() {
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/searchemp`, {
        params: { query },
      });
      setEmployees(response.data);
      setError("");
    } catch (err) {
      console.error("Error searching employees:", err);
      setError("Failed to fetch employee data");
    }
  };

  return (
    <div className="search-container">
      <h2>🔍 Search Employees</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, email, phone, department, or designation"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="result-table">
        {employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          query && !error && <p>No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchEmployee;
