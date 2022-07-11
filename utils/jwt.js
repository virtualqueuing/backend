const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function validateToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error.message);
        return false;
      }
      return decoded;
    }); // return payload
  } catch (e) {
    return null;
  }
}

module.exports = { generateToken, validateToken };
