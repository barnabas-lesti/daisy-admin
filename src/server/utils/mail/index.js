const path = require('path');
const fs = require('fs-extra');
const mailgunJs = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');

const { EMAIL_MAILGUN_API_KEY, EMAIL_MAILGUN_DOMAIN, EMAIL_FROM_ADDRESS, TEMP_FOLDER_PATH } = require('../../../../env.config');
const logger = require('../logger');

const { templateNames, templates } = require('./templates');

const EMAIL_FOLDER_PATH = path.join(TEMP_FOLDER_PATH, './email');

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
    this.locale = locale;
    this.template = template;
    console.log(this.content);
  }

  send () {
    return new Promise((resolve, reject) => {
      const mail = new MailComposer({
        from: EMAIL_FROM_ADDRESS,
        to: this.to,
        subject: this.subject,
        html: this.content,
        headers: { 'Locale': this.locale },
      });
      mail.compile().build((compileError, message) => {
        if (compileError) return reject(compileError);

        // console.log(message.toString());
        const messageString = message.toString('utf-8');
        if (mailgun) {
          mailgun.messages().sendMime({ to: this.to, message: messageString }, (sendError, body) => {
            if (sendError) { return reject(sendError); }
            return resolve(body);
          });
        } else {
          console.log(messageString);
          fs.outputFile(`${EMAIL_FOLDER_PATH}/${this.to}_${this.template}_${this.locale}.html`, messageString)
            .then(() => resolve(messageString))
            .catch((error) => { throw error; });
        }
      });
    });
  }
}

Mail.Templates = templateNames;

module.exports = Mail;
