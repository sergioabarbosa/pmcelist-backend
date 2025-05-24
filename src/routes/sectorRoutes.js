const express = require('express');
const router = express.Router();
const {
  getSectors,
  getSectorById,
  updateSector,
  createSector,
  deleteSector 
} = require('../controllers/sectorController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all sectors and create new sector
router.route('/')
  .get(protect, getSectors)
  .post(protect, admin, createSector);

// Get, update and delete sector by ID
router.route('/:id')
  .get(protect, getSectorById)
  .put(protect, admin, updateSector)
  .delete(protect, admin, deleteSector);

module.exports = router;