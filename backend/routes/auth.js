const express = require("express");
const router = express.Router();
const User = require("../models/User");

// =======================
// ✅ USER SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔍 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 💾 Save user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// ✅ USER LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Find user
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// 🛡️ ADMIN LOGIN
// =======================
router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  console.log("Admin login:", email, password); // 🔍 debug

  // 🔐 Hardcoded admin (simple method)
  if (email === "admin@gmail.com" && password === "admin123") {
    return res.status(200).json({
      message: "Admin login successful",
      role: "admin",
    });
  } else {
    return res.status(400).json({
      message: "Invalid admin credentials",
    });
  }
});

module.exports = router;