import express from "express";
import db from "../../db/db.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM attendance WHERE employeeId = ? ORDER BY date DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching employee attendance:", error);
    res.status(500).json({ error: "Failed to fetch employee attendance" });
  }
});

export default router;
