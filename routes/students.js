const express = require("express");
const Student = require("../models/Student");
const requireAuth = require("../middleware/auth");

const router = express.Router();
router.get("/", requireAuth, async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json(students);
    } catch (error) {
        console.error("Get students error:", error.message);
        return res.status(500).json({
            error: "Failed to retrieve students"
        });
    }
});
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        return res.status(200).json(student);
    } catch (error) {
        return res.status(400).json({
            error: "Invalid student ID"
        });
    }
});
router.post("/", requireAuth, async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(201).json(student);
    } catch (error) {
        console.error("Create student error:", error.message);
        return res.status(400).json({
            error: "Failed to create student"
        });
    }
});

router.put("/:id", requireAuth, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        return res.status(200).json(student);
    } catch (error) {
        return res.status(400).json({
            error: "Failed to update student"
        });
    }
});

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: "Invalid student ID"
        });
    }
});

module.exports = router;