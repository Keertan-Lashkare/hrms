import express from "express";
import bcrypt from "bcrypt";
import db from "../../db/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

  
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0)
      return res.status(400).json({ message: "User already exists" });

  
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "employee"]
    );

    
    res.status(201).json({
      message: " User registered successfully",
      user: {
        id: result.insertId,
        name,
        email,
        role: role || "employee",
      },
    });
  } catch (error) {
    console.error(" Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

export default router;
