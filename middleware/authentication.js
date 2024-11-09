const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; 
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
  try {
    const payload = isTokenValid({ token });
    console.log(payload);
    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.userId,
      role: payload.role,
      name: payload.name
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
       throw new CustomError.UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
}

module.exports = { authenticateUser, authorizePermissions };