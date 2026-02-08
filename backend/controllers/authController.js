const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// HELPERS
// ===============================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const blockedDomains = [
  "gmai.com",
  "gmial.com",
  "gmail.con",
  "hotmial.com",
  "yaho.com"
];

// ===============================
// REGISTER
// ===============================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Name validation
    if (name.length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters long"
      });
    }

    // 3️⃣ Email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // 4️⃣ Block common typos
    const domain = email.split("@")[1].toLowerCase();
    if (blockedDomains.includes(domain)) {
      return res.status(400).json({
        message: "Invalid email domain"
      });
    }

    // 5️⃣ Password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // 6️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // 7️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    // 3️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 4️⃣ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 5️⃣ JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
