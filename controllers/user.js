const { StatusCodes } = require('http-status-codes');
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

// TODO: Follow up the below function
// const updateUserById = async (req, res) => {
//   const { id } = req.params;
//   if (req.body.id === id) {
//     if (req.body.password) {
//       if (comparePassword(req.body.password)) {
//         try {
//           const updatedUser = await User.findByIdAndUpdate(
//             id,
//             {
//               $set: req.body,
//             },
//             { new: true }
//           );
//           return res.status(StatusCodes.OK).json(updatedUser);
//         } catch (err) {
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
//         }
//       } else {
//         return res.status(StatusCodes.UNAUTHORIZED).json('You can only update your own account!');
//       }
//     }
//   }
// };

module.exports = {
  getUserById,
  // updateUserById,
};
