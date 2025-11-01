import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Update Employee by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

    // ✅ Convert ISO string -> YYYY-MM-DD (for MySQL DATE column)
    const formattedDate = joiningDate
      ? new Date(joiningDate).toISOString().split("T")[0]
      : null;

    const [result] = await db.execute(
      `UPDATE employees
       SET fullName=?, email=?, phone=?, department=?, designation=?, qualification=?, 
           salary=?, location=?, joiningDate=?
       WHERE id=?`,
      [
        fullName,
        email,
        phone,
        department,
        designation,
        qualification,
        salary,
        location,
        formattedDate,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

export default router;
