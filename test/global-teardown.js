const app = require('../src/server/app');

export default async () => {
  await app.stop();
  return process.exit();
};
