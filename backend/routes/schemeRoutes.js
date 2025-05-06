const express = require('express');
const router = express.Router();
const {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme
} = require('../controllers/schemeController');

// Public routes
router.get('/', getSchemes);
router.get('/:id', getSchemeById);

// Protected routes (admin only)
router.post('/', createScheme);
router.put('/:id', updateScheme);
router.delete('/:id', deleteScheme);

module.exports = router; 