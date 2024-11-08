const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

const isTokenValid = ({token}) => {
  return jwt.verify(token, process.env.JWT_SECRET);
} 

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // cookies should be transmitted over secure protocol HTTPS helping to prevent man in the middle attacks.
    signed: true // cookie should be signed with a secret key helping to prevent tampering with cookies contents
  });
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };