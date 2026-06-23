const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, roll, email, password } = req.body;
    await User.create({ name, roll, email, password });
    res.redirect('/index.html'); // back to login
  } catch (err) {
    res.send("❌ Registration error: " + err.message);
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("❌ User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.send("❌ Invalid password");

  req.session.user = user;

  if (user.role === 'admin') {
    res.redirect('/admin/dashboard');
  } else if (user.role === 'grievance') {
    res.redirect('/grievance/dashboard');
  } else {
    res.redirect('/student-dashboard.html');
  }
});


// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/index.html');
  });
});

module.exports = router;
