module.exports = {
  en: {
    emailVerification: (email, link) => ({
      subject: 'Verify your email address for Daisy',
      content: `
        Dear ${email},<br>
        <br>
        Please click on the link below to verify your email address:<br>
        ${link}<br>
        <br>
        Best regards,<br>
        <strong>The Daisy Team</strong>
      `,
    }),
    passwordReset: (email, link) => ({
      subject: 'Reset your password for Daisy',
      content: `
        Dear ${email},<br>
        <br>
        Please click on the link below to reset your password:<br>
        ${link}<br>
        <br>
        Best regards,<br>
        <strong>The Daisy Team</strong>
      `,
    }),
  },
};
