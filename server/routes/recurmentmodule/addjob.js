import express from "express";
import pool from "../../db/db.js";


const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { title, department, description, location, salary, postedBy } = req.body;

    const [result] = await pool.query(
      `INSERT INTO recruitment (title, department, description, location, salary, postedBy, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [title, department, description, location, salary, postedBy]
    );

    res.status(201).json({
      message: " Job posted successfully",
      job: {
        id: result.insertId,
        title,
        department,
        description,
        location,
        salary,
        postedBy,
      },
    });
  } catch (error) {
    console.error(" Error posting job:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
});

export default router;
