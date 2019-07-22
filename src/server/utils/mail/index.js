const mailgunJs = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');

const envConfig = require('../../../../env.config');
const { templateNames, templates } = require('./templates');

const mailgun = mailgunJs({
  apiKey: envConfig.EMAIL_MAILGUN_API_KEY,
  domain: envConfig.EMAIL_MAILGUN_DOMAIN,
});

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
        from: envConfig.EMAIL_FROM_ADDRESS,
        to: this.to,
        subject: this.subject,
        html: this.content,
      });
      mail.compile().build((compileError, message) => {
        if (compileError) { return reject(compileError); }
        mailgun.messages().sendMime({ to: this.to, message: message.toString('ascii') }, (sendError, body) => {
          if (sendError) { return reject(sendError); }
          return resolve(body);
        });
      });
    });
  }
}

Mail.Templates = templateNames;

module.exports = Mail;
