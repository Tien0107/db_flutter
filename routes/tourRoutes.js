const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Route lấy tất cả các tour
router.get('/tours', tourController.getAllTours);

// Route thêm tour mới
router.post('/tours', tourController.createTour);

module.exports = router;
