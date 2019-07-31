const templateNames = {
  PASSWORD_RESET: 'passwordReset',
  REGISTRATION: 'registration',
};

const templates = {
  'en': {
    [templateNames.REGISTRATION]: ({ link, expiresInMinutes }) => ({
      subject: 'Finish your registration to Daisy',
      content: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            Hi there,<br>
            <br>
            To finish your registration click <a href="${link}" target="_blank">here</a>.<br>
            <br>
            <i>The above link expires in ${expiresInMinutes} minutes from the sending of this mail.</i><br>
            <br>
            Best regards,<br>
            <strong>The Daisy Team</strong>
          </body>
        </html>
      `,
    }),
    [templateNames.PASSWORD_RESET]: ({ link, expiresInMinutes }) => ({
      subject: 'Reset your password for Daisy',
      content: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          Hi there,<br>
          <br>
          To reset your password, click <a href="${link}" target="_blank">here</a><br>
          <br>
          <i>The above link expires in ${expiresInMinutes} minutes from the sending of this mail.</i><br>
          <br>
          Best regards,<br>
          <strong>The Daisy Team</strong>
        </body>
      </html>
      `,
    }),
  },

  'hu': {
    [templateNames.REGISTRATION]: ({ link, expiresInMinutes }) => ({
      subject: 'Fejezze be a regisztraciojat Daisy-be',
      content: `
        <!DOCTYPE html>
        <html lang="hu">
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            Udv,<br>
            <br>
            A regisztracio befejezesehez kattintson a kovetkezo <a href="${link}" target="_blank">linkre</a>.<br>
            <br>
            <i>A fenti link ${expiresInMinutes} percig ervenyes, a level kikuldesetol szamitva.</i><br>
            <br>
            Udvozlettel,<br>
            <strong>A Daisy csapata</strong>
          </body>
        </html>
      `,
    }),
    [templateNames.PASSWORD_RESET]: ({ link, expiresInMinutes }) => ({
      subject: 'Reset your password for Daisy',
      content: `
        <!DOCTYPE html>
        <html lang="hu">
        </html>
      `,
    }),
  },
};

module.exports = {
  templateNames,
  templates,
};
