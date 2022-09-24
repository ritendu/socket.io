const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
const  invalid_token = "Invalid token";
const invalid_credentials='Invalid credentials';
const email_required= "Email is required"
const email_cannot_send="Email could not be sent"
const email_and_password='provide email/password'
const no_user_found='There is no user with that email'
const fields_missing ='Please entered valid the required fields';
const email_not_sent ='Message cannot be sent';
const invalid_email='Email not found';
const invalid_reset_token ='Invalid Reset Token';

module.exports={invalid_token,invalid_credentials,email_required,email_cannot_send,email_and_password,no_user_found,fields_missing,email_not_sent,invalid_email,invalid_reset_token,transporter}