import express from "express";
import db from "../../db/db.js";


const router = express.Router();

// ✅ Search employees by name, email, phone, department, or designation
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const searchQuery = `
      SELECT * FROM employees 
      WHERE fullName LIKE ? 
         OR email LIKE ? 
         OR phone LIKE ? 
         OR department LIKE ? 
         OR designation LIKE ?
    `;

    const searchTerm = `%${query}%`;

    const [employees] = await db.execute(searchQuery, [
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
    ]);

    res.json(employees);
  } catch (error) {
    console.error("❌ Error searching employees:", error);
    res.status(500).json({ error: "Failed to search employees" });
  }
});

export default router;
