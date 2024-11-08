const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email' 
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema)