const admin = require('firebase-admin');

const serviceAccount = require('../../env/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  db: admin.firestore(),
};
