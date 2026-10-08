
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedMessage = typeof message === 'string' ? message.trim() : '';
    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if (normalizedName.length > 120 || normalizedEmail.length > 254 || normalizedMessage.length > 5000) {
      return res.status(400).json({ error: 'One or more fields are too long' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Enter a valid email address' });
    }
    const doc = await Contact.create({ name: normalizedName, email: normalizedEmail, message: normalizedMessage });
    console.log('Contact saved:', doc._id);
    res.status(201).json({ success: true, id: doc._id });
  } catch (e) {
    console.error('Contact submission failed:', e);
    res.status(500).json({ error: 'Unable to save your message right now' });
  }
});
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json(contacts);
  } catch(e){ res.json([]) }
});
module.exports = router;
