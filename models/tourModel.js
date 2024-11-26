const mongoose = require('mongoose');

// Định nghĩa model Tour với Sequelize
const tourSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, 'phai co cityName'],
    trim: true
  },
  days: {
    type: String,
    required: [true, 'phai co days'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'phai co price'],
    trim: true
  },
  avatar: {
    type: String,
    default: 'default.jpg'
  }
}, {
  timestamps: false,  
  collection: 'Tour'
});

const Tour = mongoose.model('Tour', tourSchema);
tourSchema.pre('save', async function(next) {
  if(!this.id){
    const lastTour = await this.constructor.findOne({} , {}, {sort: {'id': -1}});
    this.id = lastTour ? lastTour.id + 1 : 1;
  }
  next();
});

module.exports = Tour;
