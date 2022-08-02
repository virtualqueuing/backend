const express = require('express');
const queueRouter = require('./queue');
const sendTextRouter = require('./twilio');
const authRouter = require('./auth');
const userRouter = require('./user');
const auth = require('../middleware/authentication');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/queues', auth, queueRouter);
v1Router.use('/sendtext', sendTextRouter);
v1Router.use('/user', auth, userRouter);

module.exports = v1Router;
