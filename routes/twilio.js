const { Router } = require('express');

const { sendText } = require('../controllers/twilioApi');

const sendTextRouter = Router();

sendTextRouter.get('', sendText);

module.exports = sendTextRouter;
