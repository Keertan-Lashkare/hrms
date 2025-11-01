import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Get Leaves by Employee ID
router.get("/:empId", async (req, res) => {
  try {
    const { empId } = req.params;

    // Fetch all leave records for the given employee ID
    const [leaves] = await db.execute(
      "SELECT * FROM leaves WHERE employeeid = ? ORDER BY startDate DESC",
      [empId]
    );

    res.json(leaves);
  } catch (error) {
    console.error("❌ Error fetching employee leaves:", error);
    res.status(500).json({ error: "Failed to fetch employee leaves" });
  }
});

export default router;
