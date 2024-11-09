const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; 
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
  try {
    const payload = isTokenValid({ token });
    // console.log(payload);
    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
      name: payload.user.name
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
}

module.exports = { authenticateUser };