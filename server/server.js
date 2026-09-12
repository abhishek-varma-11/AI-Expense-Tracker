require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

/*
 * Connect to MongoDB
 */

connectDB();

/*
 * Middleware
 */

app.use(cors());
app.use(express.json());

/*
 * Routes
 */

app.use("/api/auth", authRoutes);

/*
 * Health Check
 */

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Expense Tracker API is running"
    });
});

/*
 * Start Server
 */

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});