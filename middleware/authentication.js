const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; 
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
  next();
}

module.exports = { authenticateUser };