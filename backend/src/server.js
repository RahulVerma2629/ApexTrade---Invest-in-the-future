const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const db = require("./config/db");

const tradeRoutes = require("./routes/trade.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/trades", tradeRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({
      message: "ApexTrade Backend Running",
      database: "Connected ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Database Error ❌",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});