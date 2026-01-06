const axios = require('axios');

const sendEmail = async ({ to, subject, html, text }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_USER;

  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: "Support Team", email: senderEmail },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
      textContent: text
    }, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Brevo API Error:", error.response ? error.response.data : error.message);
  }
};

module.exports = sendEmail;