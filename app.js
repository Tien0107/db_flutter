const tourRoutes = require('./routes/tourRoutes');
const express = require('express');
const mongoose = require('mongoose');
const path  = require('path');  
const cors = require('cors');
const config = require('./config/config');

const PORT = 5000;
const app = express();

//cau hinh
app.use(express.json());
app.use(cors());


app.use('/resource/images', express.static(path.join(__dirname,"resource", 'images')));
// Sử dụng các route
app.use('/tours', tourRoutes);

// Đồng bộ với cơ sở dữ liệu và khởi động server
const mongoURI = config.database.url;

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('ket noi mongo duoc roi do !');

    // Kiểm tra connection
    const collections = await mongoose.connection.db.collections();
    console.log('Danh sách collections(doi tuong):', collections.map(c => c.collectionName));

    app.listen(PORT, () => {
      console.log(`Server đang chạy trên cổng ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Server loi roi ba:', err);
  });

// Xu ly loi khong xu ly duoc
process.on('unhandledRejection', (err) => {
  console.error('khong xu ly duoc:', err);
  process.exit(1);
});
