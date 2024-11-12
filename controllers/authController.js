const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  const { email , name, password} = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const isFirstAccount = await User.countDocuments({}) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({user: tokenUser })
}

const login = async (req, res) => {
  const { email , password} = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid password credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({user: tokenUser })
}

const logout = async (req, res) => {
  res.cookie('token', 'RANDOMSTRING', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({msg: 'User logged out'})
} 

module.exports = {
  register,
  login,
  logout
}

/**
 * When we work with a cookie, we dont need to do anything in front end so long as we are on the same domain. 
 * We send a response, we get back a cookie, browser does the rest 
 * When it comes to httpOnly cookies, unlike localStorage, they are not accessible in the front end with client side js
 * Downside being, there is a maxSize limit. 
 * 
 * When we use react, then its in localhost:3000 and when we use node, its in localhost:5000
 * If front end app is not on the same domain, then they do not have access to any of the resources. 
 * 
 * We can send a cookie back only to where it came from. 
 * 
 * In the front end app package.json, set "proxy": "http://localhost:5000"
 * Now, every reuqest in front end will go to the the forward slash and so the url needs to be tweaked. 
 * ${rooUrl}/api/v1/auth/logout ==> /api/v1/auth/logout
 * 
 * When it comes to production, it depends on where we host it. 
 */