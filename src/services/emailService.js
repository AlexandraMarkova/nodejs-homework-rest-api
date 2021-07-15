/* eslint-disable no-useless-catch */
const nodemailer = require('nodemailer')

require('dotenv').config()
const Mailgen = require('mailgen')

const createTemplateVerifyEmail = (verifyToken, userEmail) => {
  const mailGenerator = new Mailgen({
    theme: 'cerberus',
    product: {
      name: 'Contacts book',
      link: 'http://localhost:8081',
    },
  })
  const email = {
    body: {
      name: userEmail,
      intro: 'Welcome to Contacts book!',
      action: {
        instructions: 'To get started with Contacts book, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:8081/api/users/verify/${verifyToken}`,
        },
      },
    },
  }
  const emailBody = mailGenerator.generate(email)
  return emailBody
}

async function sendVerifyEmail(email, verifyToken) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sashaka2015@gmail.com',
      pass: process.env.PASSWORD,
    },
  })
  await transporter
    .sendMail({
      from: '"Fred Foo 👻" <sashaka2015@gmail.com>',
      to: email,
      subject: 'Verify email',
      html: createTemplateVerifyEmail(verifyToken, email),
    })
    .then((info) => console.log(info))
    .catch((err) => console.log(err))
}

module.exports = {
  sendVerifyEmail,
}
