const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    user = new User(req.body);
    console.log('New user object created:', user);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
      await user.save();
      console.log('User saved successfully:', user._id);
    } catch (saveErr) {
      console.error('Error saving user:', saveErr);
      if (saveErr.name === 'ValidationError') {
        return res.status(400).json({ error: saveErr.message });
      }
      throw saveErr;
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    const response = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
    console.log('Sending successful response:', response);
    res.status(201).json(response);
  } catch (err) {
    console.error('Registration error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate field value entered' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 