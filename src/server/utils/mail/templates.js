const templateNames = {
  PASSWORD_RESET: 'passwordReset',
  EMAIL_VERIFICATION: 'emailVerification',
};

const templates = {
  'en': {
    [templateNames.EMAIL_VERIFICATION]: ({ link, expiresInHours }) => ({
      subject: 'Verify your email address for Daisy',
      content: `
        Hi there,<br>
        <br>
        Please click on the link below to verify your email address:<br>
        ${link}<br>
        <br>
        <i>The above link expires in ${expiresInHours} hours from the sending of this mail.</i><br>
        <br>
        Best regards,<br>
        <strong>The Daisy Team</strong>
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
