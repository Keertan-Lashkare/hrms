import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Get all employees (sorted by createdAt DESC)
router.get("/", async (req, res) => {
  try {
    const [employees] = await db.execute(
      "SELECT * FROM employees ORDER BY createdAt DESC"
    );
    res.json(employees);
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

export default router;
