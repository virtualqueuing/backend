const { UnauthenticatedError } = require('../errors');
const { validateToken } = require('../utils/jwt');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authorization invalid');
  }
  const token = authHeader.split(' ')[1];

  const payload = validateToken(token);
  if (payload) {
    req.user = payload;
    next();
  } else {
    throw new UnauthenticatedError('Authorization invalid');
  }
};

module.exports = auth;
