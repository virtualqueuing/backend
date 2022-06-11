require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

/**
 * @swagger
 * /v1/handleText:
 *  get:
 *    summary: Get testing text message from Twilio
 *    tags: [Twilio]
 *    responses:
 *      200:
 *        description: receving a text message 'Welcome to Virtual Queuing' from twilio number by clicking Execute button. Please make sure the recipient's phnoe number is verified.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                message: 'Text sent!'
 */

const sendText = (req, res) => {
  client.messages
    .create({
      body: 'Welcome to Virtual Queuing',
      to: '+61416561624', // Ting's number
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

  return res.status(200).send({ message: 'Text sent!' });
};

module.exports = { sendText };
