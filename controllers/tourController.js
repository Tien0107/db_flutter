const Tour = require('../models/tourModel');

// Lấy tất cả các tour
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();  // Lấy tất cả dữ liệu từ bảng Tour
    res.json(tours);
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
};

// Thêm tour mới
exports.createTour = async (req, res) => {
  const { cityName, days, price, avatar } = req.body;

  try {
    const newTour = await Tour.create({
      cityName,
      days,
      price,
      avatar
    });
    res.status(201).json(newTour);  // Trả về dữ liệu tour vừa tạo
  } catch (err) {
    console.error('Lỗi khi thêm dữ liệu:', err);
    res.status(500).json({ error: 'Lỗi khi thêm dữ liệu' });
  }
};


