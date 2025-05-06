const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contactNo,
      aadhaarNo,
      address,
      annualIncome,
      workType,
      state,
      district,
      dob,
      role
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contactNo,
      aadhaarNo,
      address,
      annualIncome,
      workType,
      state,
      district,
      dob,
      role: role || 'user'
    });

    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate request body
    if (!email || !password || !role) {
      return res.status(400).json({
        message: 'Please provide email, password and role'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check if role matches
    if (user.role !== role) {
      return res.status(401).json({
        message: `Invalid role. Please login using the ${user.role} portal.`
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return user data without password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login. Please try again.'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  logout
}; 