import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Get All Leave Requests (with employee details)
router.get("/", async (req, res) => {
  try {
    // Join leaves with employees to get name, email, department
    const [leaves] = await db.execute(`
      SELECT 
        leaves.id,
        leaves.leaveType,
        leaves.startDate,
        leaves.endDate,
        leaves.reason,
        leaves.status,
        leaves.appliedOn,
        employees.id AS employeeId,
        employees.fullName AS name,
        employees.email,
        employees.department
      FROM leaves
      JOIN employees ON leaves.employeeId = employees.id
      ORDER BY leaves.appliedOn DESC
    `);

    res.json(leaves);
  } catch (error) {
    console.error("❌ Error fetching leaves:", error);
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
});

export default router;
