const sgMail = require('@sendgrid/mail')
const { htmlToText } = require('html-to-text')
const { ErrorHandler } = require('../utils/errorHandler')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: 'jude@nielvid.com', // TODO: Change to offical domain name
      subject,
      text: htmlToText(html),
      html,
    })
  } catch (error) {
    throw new ErrorHandler(500, 'Failed to send Email')
  }
}

module.exports = sendEmail
