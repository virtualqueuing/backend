const express = require('express');
const queueRouter = require('./queue');
// const productRouter = require('./product');
// const authRouter = require('./auth');

const v1Router = express.Router();

// v1Router.use('/auth', authRouter);
// v1Router.use('/products', productRouter);
v1Router.use('/queues', queueRouter);

module.exports = v1Router;
