const express = require("express");
const router = express.Router();

const Trade = require("../models/Trade");

router.post("/", async (req, res) => {
  try {
    const trade = await Trade.create(req.body);

    res.status(201).json({
      success: true,
      message: "Trade created successfully",
      trade,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create trade",
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const trades = await Trade.getUserTrades(
      req.params.userId
    );

    res.json(trades);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trades",
    });
  }
});

module.exports = router;