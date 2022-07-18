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

const sendText = async (req, res) => {
  const { name, queueInFront, branch } = req.body;
  const waitTimePerCustomer = 5;
  const estimatedTime = queueInFront * waitTimePerCustomer;
  if (queueInFront === 0) {
    const message = await client.messages.create({
      body: `Dear ${name}, you are next in line in our queue for dinning in our ${branch} branch. Please proceed to our reception and wait to be seated.`,
      to: '+61433574889',
      from: twilioPhoneNumber,
    });
    try {
      console.log(message.sid);
    } catch (err) {
      console.log(err);
    }
  } else {
    const message = await client.messages.create({
      body: `Dear ${name}, there are currently ${queueInFront} groups in front of you in the waiting queue for dinning in our ${branch} branch. The estimated wait time is ${estimatedTime} minutes. Thanks for choosing Virtual Queuing.`,
      to: '+61433574889',
      from: twilioPhoneNumber,
    });
    try {
      console.log(message.sid);
    } catch (err) {
      console.log(err);
    }
  }
  return res.status(200).send({ message: 'Message Sent!' });
};

module.exports = { sendText };
