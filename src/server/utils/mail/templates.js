const templateNames = {
  PASSWORD_RESET: 'passwordReset',
  REGISTRATION: 'registration',
};

const templates = {
  'en': {
    [templateNames.REGISTRATION]: ({ link, expiresInHours }) => ({
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
            <i>The above link expires in ${expiresInHours} hours from the sending of this mail.</i><br>
            <br>
            Best regards,<br>
            <strong>The Daisy Team</strong>
          </body>
        </html>
      `,
    }),
    [templateNames.PASSWORD_RESET]: ({ link, expiresInHours }) => ({
      subject: 'Reset your password for Daisy',
      content: `
        Hi there,<br>
        <br>
        Please click on the link below to reset your password:<br>
        ${link}<br>
        <br>
        <i>The above link expires in ${expiresInHours} hours from the sending of this mail.</i><br>
        <br>
        Best regards,<br>
        <strong>The Daisy Team</strong>
      `,
    }),
  },

  'hu': {},
};

module.exports = {
  templateNames,
  templates,
};
