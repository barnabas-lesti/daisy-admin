const app = require('../src/server/app');

export default async () => {
  await app.start();
  return;
};
