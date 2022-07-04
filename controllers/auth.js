const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res
    .set('X-Auth-Token', token)
    .status(StatusCodes.CREATED)
    .json({
      user: { userName: user.userName, email: user.email, role: user.role, branch: user.branch },
      token,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Please provide email and password');

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('Invalid Credentials');

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { userName: user.userName, email: user.email, role: user.role, branch: user.branch },
    token,
  });
};

module.exports = { register, login };
