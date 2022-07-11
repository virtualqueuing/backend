const { Router } = require('express');

const { sendText } = require('../controllers/twilioApi');

const sendTextRouter = Router();

sendTextRouter.post('', sendText);

module.exports = sendTextRouter;
