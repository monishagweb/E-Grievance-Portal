const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Create complaint
router.post('/create', async (req, res) => {
  try {
    const { title, description, category, priority, anonymous } = req.body;
    await Complaint.create({
      title, description, category, priority,
      anonymous: !!anonymous,
      student: req.session.user._id
    });
    res.redirect('/history.html');
  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});

// View history
router.get('/history', async (req, res) => {
  const complaints = await Complaint.find({ student: req.session.user._id });
  res.json(complaints); // for now return JSON
});

module.exports = router;
