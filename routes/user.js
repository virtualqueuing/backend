const { Router } = require('express');
const { getUserById, updateUserById } = require('../controllers/user');

const userRouter = Router();

userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserById);

module.exports = userRouter;
