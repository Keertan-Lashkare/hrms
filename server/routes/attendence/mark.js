import express from "express";
import db from "../../db/db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status, checkInTime, checkOutTime, remarks } = req.body;

    const [existingRecord] = await db.execute(
      "SELECT * FROM attendance WHERE employeeId = ? AND date = ?",
      [employeeId, date]
    );

    if (existingRecord.length > 0) {
      return res.status(400).json({ error: "Attendance already marked for this date" });
    }

    const [result] = await db.execute(
      `INSERT INTO attendance (employeeId, date, status, checkInTime, checkOutTime, remarks)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [employeeId, date, status, checkInTime, checkOutTime, remarks]
    );

    const newAttendance = {
      id: result.insertId,
      employeeId,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
    };

    res.status(201).json({ message: "✅ Attendance marked successfully", attendance: newAttendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
});

export default router;
