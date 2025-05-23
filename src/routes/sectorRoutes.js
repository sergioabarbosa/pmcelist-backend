const express = require('express');
const router = express.Router();
const {
  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
} = require('../controllers/sectorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSectors).post(protect, admin, createSector);
router
  .route('/:id')
  .get(getSectorById)
  .put(protect, admin, updateSector)
  .delete(protect, admin, deleteSector);

module.exports = router;