const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description can not be more than 1000 characters']
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: {
      values: ['office', 'kitchen', 'bedroom'],
      message: 'Please select correct category'
    }
  },
  company: {
    type: String,
    required: [true, 'Please add a company'],
    enum: {
      values: ['ikea', 'liddy', 'marcos'],
      message: '{VALUE} is not supported'
    }
  },
  colors: {
    type: [String],
    required: true,
    default: ['#222']
  },
  featured: {
    type: Boolean,
    default: false
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  inventory: {
    type: Number,
    required: true,
    default: 15
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  } 
}, { timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);