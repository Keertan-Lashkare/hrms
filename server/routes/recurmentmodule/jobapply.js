import express from "express";
import pool from "../../db/db.js";

const router = express.Router();



// ✅ Apply for Job (Submit Application)
router.post("/", async (req, res) => {
  try {
    const { jobId, employeeId, name, email, resume, status } = req.body;

    const [result] = await pool.query(
      `INSERT INTO applications (jobId, employeeId, name, email, resume, status, appliedOn)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [jobId, employeeId, name, email, resume, status || "Pending"]
    );

    res.status(201).json({
      message: "✅ Application submitted successfully",
      application: { id: result.insertId, jobId, employeeId, name, email, resume, status: status || "Pending" },
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to apply for job" });
  }
});

export default router;
