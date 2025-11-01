import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Search Attendance by Date Range
router.post("/search", async (req, res) => {
  try {
    const { startDate, endDate, employeeId } = req.body;

    let query = `
      SELECT a.*, e.fullName AS employeeName, e.department
      FROM attendance a
      JOIN employee e ON a.employeeId = e.id
      WHERE a.date BETWEEN ? AND ?
    `;
    const params = [startDate, endDate];

    if (employeeId) {
      query += " AND a.employeeId = ?";
      params.push(employeeId);
    }

    query += " ORDER BY a.date DESC";

    const [records] = await db.execute(query, params);
    res.json(records);
  } catch (error) {
    console.error("Error searching attendance:", error);
    res.status(500).json({ error: "Failed to search attendance" });
  }
});

export default router;
