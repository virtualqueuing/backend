const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;

    return res.status(StatusCodes.OK).json(others);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const updateUserById = async (req, res) => {
  const authHeader = req.headers.authorization;
  const returnToken = authHeader.split(' ')[1];

  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      data: {
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        branch: user.branch,
        _id: user._id,
      },
      token: returnToken,
    });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const updatePassowrdById = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  const user = await User.findById(id);
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(StatusCodes.UNAUTHORIZED).json('password is not correct');
  } 
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(
      id,
      {
        $set: { password: hashNewPassword },
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json('password is correct');
  
};

module.exports = {
  getUserById,
  updateUserById,
  updatePassowrdById,
};
