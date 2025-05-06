const Scheme = require('../models/schemeModel');

// @desc    Get all schemes
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({ status: 'Active' });
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    res.status(200).json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a scheme
// @route   POST /api/schemes
// @access  Private/Admin
const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a scheme
// @route   PUT /api/schemes/:id
// @access  Private/Admin
const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    const updatedScheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a scheme
// @route   DELETE /api/schemes/:id
// @access  Private/Admin
const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    await scheme.deleteOne();
    res.status(200).json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme
}; 