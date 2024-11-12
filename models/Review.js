const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide rating'],
  }, 
  title: {
    type: String,
    trim: true,
    required: [true, 'Please provide review title'],
    maxlength: 100,
  },
  comment: {
    type: String,
    required: [true, 'Please provide review text'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  }
}, { timestamps: true });

// a user can only write one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {  
  console.log("calculateAverageRating", productId);
};

ReviewSchema.post('save', async function () {
  // Once we save a review, this hook is triggered
  // console.log("post save");
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
  // console.log("post remove");
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);