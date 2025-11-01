import express from "express";
import pool from "../../db/db.js";

const router = express.Router();



// ✅ Get all job posts
router.get("/", async (req, res) => {
  try {
    const [jobs] = await pool.query("SELECT * FROM recruitment ORDER BY postedBy DESC");
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch job posts" });
  }
});

export default router;
