const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT } = require('../utils');

const register = async (req, res) => {
  const { email , name, password} = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const isFirstAccount = await User.countDocuments({}) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  const token = createJWT({ payload: tokenUser });
  res.status(StatusCodes.CREATED).json({user: tokenUser, token })
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

