import express from "express";
import pool from "../../db/db.js";

const router = express.Router();

// ✅ GET /applications — Fetch all applications with job details
router.get("/", async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT 
        a.id AS applicationId,
        a.jobId,
        a.employeeId,
        a.name,
        a.email,
        a.resume,
        a.status,
        a.appliedOn,
        j.title AS jobTitle,
        j.department,
        j.location
      FROM applications a
      LEFT JOIN recruitment j ON a.jobId = j.id
      ORDER BY a.appliedOn DESC
    `);

    res.json({
      message: "✅ Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

export default router;
