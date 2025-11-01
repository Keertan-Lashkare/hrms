import express from "express";
import db from "../../db/db.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM employees WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
});

export default router;
