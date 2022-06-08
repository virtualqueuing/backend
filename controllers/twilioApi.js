require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

const sendText = (req, res) => {
  client.messages
    .create({
      body: 'Welcome to Virtual Queuing - Thanks for saving me. Happy message from Ting~~',
      to: '+61433574889', // Roy's number
      from: twilioPhoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

  return res.status(200).send({ message: 'Text sent!' });
};

module.exports = { sendText };
