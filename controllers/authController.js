const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const register = async (req, res) => {
  const { email } = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
  console.log("login user")
  res.send("login user")
}

const logout = async (req, res) => {
  console.log("logout user")
  res.send("logout user")
} 

module.exports = {
  register,
  login,
  logout
}

