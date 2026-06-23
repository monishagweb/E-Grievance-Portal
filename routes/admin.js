const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Admin view all complaints
router.get('/dashboard', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('student').sort({ createdAt: -1 });
    res.render('admin-dashboard', { complaints });
  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});

// Admin respond
router.post('/respond', async (req, res) => {
  const { id } = req.body;
  await Complaint.findByIdAndUpdate(id, { status: 'Resolved' });
  res.redirect('/admin/dashboard');
});

// Admin escalate
router.post('/escalate', async (req, res) => {
  const { id } = req.body;
  await Complaint.findByIdAndUpdate(id, { status: 'In Process' });
  res.redirect('/admin/dashboard');
});

// Admin Analytics
router.get('/analytics', async (req, res) => {
  try {
    // Count by status
    const statusCounts = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Count by category
    const categoryCounts = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.render('admin-analytics', {
      statusCounts,
      categoryCounts
    });
  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});


module.exports = router;

