import express from "express";
import db from "../../db/db.js";


const router = express.Router();

// ✅ Get all attendance records with employee details
router.get("/", async (req, res) => {
  try {
    const [records] = await db.execute(`
      SELECT 
        a.id,
        a.employeeId,
        a.date,
        a.status,
        a.checkInTime,
        a.checkOutTime,
        a.remarks,
        e.fullName,
        e.department,
        e.designation
      FROM attendance a
      INNER JOIN employees e ON a.employeeId = e.id
      ORDER BY a.date DESC
    `);

    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});

export default router;
