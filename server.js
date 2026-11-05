require("dotenv").config();

console.log("ENV file loaded:", Boolean(process.env.MONGODB_URI));
console.log("Current directory:", process.cwd());

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Student Directory API is running!");
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();

