import express from "express";
import db from "../../db/db.js";

const router = express.Router();

// ✅ Update Leave Status by ID
router.put("/:id/:status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update leave status
    const [result] = await db.execute(
      "UPDATE leaves SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave not found" });
    }

    // Fetch updated leave
    const [updatedLeave] = await db.execute(
      "SELECT * FROM leaves WHERE id = ?",
      [id]
    );

    res.json({
      message: `Leave ${status.toLowerCase()} successfully`,
      leave: updatedLeave[0],
    });
  } catch (error) {
    console.error("❌ Error updating leave status:", error);
    res.status(500).json({ error: "Failed to update leave status" });
  }
});

export default router;
