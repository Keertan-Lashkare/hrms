import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

/* ---------------------------------------------
   ✅ Add Employee
----------------------------------------------*/
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

/* ---------------------------------------------
   ✏️ Update Employee
----------------------------------------------*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

/* ---------------------------------------------
   👥 View All Employees
----------------------------------------------*/
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

/* ---------------------------------------------
   🔍 Search Employee
----------------------------------------------*/
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const employees = await Employee.find({
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },
        { designation: { $regex: query, $options: "i" } }
      ]
    });
    res.json(employees);
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ error: "Failed to search employees" });
  }
});

export default router;

export default router;