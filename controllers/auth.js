const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const user = new User({ ...req.body });

  await user.save();
  const token = generateToken({ user });
  return res.status(StatusCodes.CREATED).json({
    data: {
      email: user.email,
      role: user.role,
      userName: user.userName,
      branch: user.branch,
      _id: user._id,
    },
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

  const token = generateToken({ user });
  res.status(StatusCodes.OK).json({
    data: {
      email: user.email,
      role: user.role,
      userName: user.userName,
      branch: user.branch,
      _id: user._id,
    },
    token,
  });
};

module.exports = { register, login };
