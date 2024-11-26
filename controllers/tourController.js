const Tour = require('../models/tourModel');

// Lấy tất cả các tour
exports.getAllTours = async (req, res) => {
  try {
    console.log('Dang tim tour..');
    const tours = await Tour.find();
    console.log('Ket qua: ', tours); 
    if(!tours || tours.length === 0) {
      console.log('Khong tim thay tour nao !');
    } 

    res.json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Lỗi khi lấy dữ liệu:' + err.message
    });
  }
};

// Thêm tour mới
exports.createTour = async (req, res) => {

  try {
    console.log('Da nhan du lieu: ', req.body);

    const newTour = await Tour.create(req.body);
    console.log('Da them tour: ', newTour);
    //check
    const savedTour = await Tour.findById(newTour._id);
    console.log('Da luu tour trong db: ', savedTour);
    
    res.status(201).json({
      status: 'success',
      data: { newTour }
    }); 
  } catch (err) {
    console.error('Lỗi khi thêm dữ liệu:', err);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Lấy tour theo id
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Hong co thay tour !'
      });
    }
    res.json({
      status: 'success',
      data: tour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Cập nhật tour 
exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Hong co thay tour !'
      });
    }
    res.json({
      status: 'success',
      data: tour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Xóa tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Hong co thay tour !'
      });
    }
    res.status(204).json({
      status: 'xoa duoc roi do !',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'meo xoa duoc !',
      message: err.message
    });
  }
};

