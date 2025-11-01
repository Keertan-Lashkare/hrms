import express from "express";
import pool from "../../db/db.js";

const router = express.Router();


// ✅ Update Job Details
router.put("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      department,
      jobType,
      description,
      requirements,
      location,
      status,
    } = req.body;

    // Update job details
    const [result] = await pool.query(
      `UPDATE recruitments 
       SET jobTitle = ?, department = ?, jobType = ?, description = ?, requirements = ?, location = ?, status = ?
       WHERE id = ?`,
      [jobTitle, department, jobType, description, requirements, location, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Fetch updated job
    const [updatedJob] = await pool.query(
      "SELECT * FROM recruitments WHERE id = ?",
      [id]
    );

    res.json({ message: "📝 Job updated successfully", job: updatedJob[0] });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

export default router;
