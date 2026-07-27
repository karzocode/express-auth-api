import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("API is Running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});