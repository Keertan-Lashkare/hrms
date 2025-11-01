import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Add New Employee
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      department,
      designation,
      qualification,
      salary,
      location,
      joiningDate,
    } = req.body;

    const query = `
      INSERT INTO employees 
      (fullName, email, phone, department, designation, qualification, salary, location, joiningDate, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await db.execute(query, [
      fullName,
      email,
      phone,
      department,
      designation,
      qualification,
      salary,
      location,
      joiningDate,
    ]);

    res.status(201).json({
      message: "✅ Employee added successfully",
      employeeId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error adding employee:", error);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

export default router;
