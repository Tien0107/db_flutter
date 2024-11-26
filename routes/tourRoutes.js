const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Route lấy tất cả các tour
router.get('/', tourController.getAllTours);
router.post('/', tourController.createTour);
router.put('/:id', tourController.updateTour);
router.patch('/:id', tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
