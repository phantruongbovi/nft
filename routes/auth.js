require("dotenv").config();

const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user or password!" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken!" });
    }

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    // Access token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully!",
      accessToken,
    });
  } catch (error) {}
});

router.get("/", (req, res) => res.send("USER ROUTER"));

module.exports = router;
