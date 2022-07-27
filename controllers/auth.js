const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError, ConflictError } = require('../errors');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const user = new User({ ...req.body });
  const repeatUser = await User.findOne({ email: user.email });

  if (repeatUser === null) {
    await user.save();
    const token = generateToken({ user });
    return res.status(StatusCodes.CREATED).json({
      data: {
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        branch: user.branch,
        _id: user._id,
      },
      token,
    });
  } 
    throw new ConflictError('This email address is already being used');
  

  // if (user.email === repeatUser.email) {
  //   throw new ConflictError('This email address is already being used');
  // }
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
      fullName: user.fullName,
      branch: user.branch,
      _id: user._id,
    },
    token,
  });
};

module.exports = { register, login };
