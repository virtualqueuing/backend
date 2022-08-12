const { Router } = require('express');
const { getUserById, updateUserById, updatePassowrdById } = require('../controllers/user');

const userRouter = Router();

userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);
userRouter.put('/:id/password', updatePassowrdById);

module.exports = userRouter;
