const mailgunJs = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');

const envConfig = require('../../../../env.config');
const emailTemplates = require('./templates');

const mailgun = mailgunJs({
  apiKey: envConfig.EMAIL_MAILGUN_API_KEY,
  domain: envConfig.EMAIL_MAILGUN_DOMAIN,
});

const sendEmailWithHtml = ({ to, subject, content }) => {
  return new Promise((resolve, reject) => {
    const mail = new MailComposer({
      from: envConfig.EMAIL_FROM_ADDRESS,
      to,
      subject,
      html: content,
    });
    mail.compile().build((compileError, message) => {
      if (compileError) { return reject(compileError); }
      mailgun.messages().sendMime({ to, message: message.toString('ascii') }, (sendError, body) => {
        if (sendError) { return reject(sendError); }
        return resolve(body);
      });
    });
  });
};

module.exports = {
  emailTemplates,
  sendEmailWithHtml,
};
