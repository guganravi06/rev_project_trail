const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); 

// Replace with your Twilio credentials
const accountSid = 'ACea985c54e346bc24e68483e1a7f80cb4';
const authToken = '055a8aecab7d3f17858056cc9353050d';

const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const message = 'Someone said yes on your website!';
  const toNumber = '+919524003387';
  const fromNumber = '+15075851357';

  client.messages
    .create({
      body: message,
      from: fromNumber,
      to: toNumber
    })
    .then((message) => {
      console.log(`Message sent. SID: ${message.sid}`);
      res.send('SMS sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).send('Failed to send SMS');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
