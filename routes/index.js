const express = require('express');
const queueRouter = require('./queue');
const sendTextRouter = require('./twilio');
// const productRouter = require('./product');
const authRouter = require('./auth');
const auth = require('../middleware/authentication');

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
// v1Router.use('/products', productRouter);
v1Router.use('/queues', auth, queueRouter);
v1Router.use('/handleText', sendTextRouter);

module.exports = v1Router;
