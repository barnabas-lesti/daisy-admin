const mailgunJs = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');

const { EMAIL_MAILGUN_API_KEY, EMAIL_MAILGUN_DOMAIN, EMAIL_FROM_ADDRESS } = require('../../../../env.config');
const logger = require('../logger');

const { templateNames, templates } = require('./templates');

let mailgun;
if (EMAIL_MAILGUN_API_KEY && EMAIL_MAILGUN_DOMAIN) {
  mailgun = mailgunJs({
    apiKey: EMAIL_MAILGUN_API_KEY,
    domain: EMAIL_MAILGUN_DOMAIN,
  });
} else {
  logger.info('EMAIL settings missing, skipping mailgun setup');
}

class Mail {
  constructor (to, locale, template, templateArgs) {
    const { subject, content } = templates[locale][template](templateArgs);
    this.to = to;
    this.subject = subject;
    this.content = content;
  }

  send () {
    return new Promise((resolve, reject) => {
      const mail = new MailComposer({
        from: EMAIL_FROM_ADDRESS,
        to: this.to,
        subject: this.subject,
        html: this.content,
      });
      mail.compile().build((compileError, message) => {
        if (compileError) return reject(compileError);

        const messageString = message.toString('ascii');
        if (mailgun) {
          mailgun.messages().sendMime({ to: this.to, message: messageString }, (sendError, body) => {
            if (sendError) { return reject(sendError); }
            return resolve(body);
          });
        } else {
          logger.log(`
            === <EMAIL> ===
            ${messageString}
            === </EMAIL> ===
          `);
          return resolve(messageString);
        }
      });
    });
  }
}

Mail.Templates = templateNames;

module.exports = Mail;
