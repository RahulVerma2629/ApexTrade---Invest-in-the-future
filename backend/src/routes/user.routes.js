const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/sync", async (req, res) => {
  try {
    const { clerk_id, email, name } = req.body;

    if (!clerk_id || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let user = await User.findByClerkId(clerk_id);

    if (!user) {
      const id = await User.create({
        clerk_id,
        email,
        name,
      });

      user = await User.findById(id);

      console.log("🟢 New user created:", user.email);
    } else {
      console.log("🔵 Existing user:", user.email);
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "User sync failed",
    });
  }
});

module.exports = router;