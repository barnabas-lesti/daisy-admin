const pathLib = require('path');
const fs = require('fs-extra');

const { TEMP_DIR_PATH } = require('../../../config/env');
const { database, logger } = require('../utils');

module.exports = (router) => {
  router.route('/test/clean/db')
    .post(async (req, res) => {
      try {
        const { yesImSure } = req.body;
        if (!yesImSure) return res.sendStatus(400);

        await database.dropDb(yesImSure);
        res.sendStatus(200);
      } catch (error) {
        logger.error(error);
        return res.sendStatus(500);
      }
    });

  router.route('/test/temp-file')
    .get(async (req, res) => {
      const { path } = req.query;
      if (!path) return res.sendStatus(400);

      try {
        const file = await fs.readFile(pathLib.join(TEMP_DIR_PATH, path), 'utf-8');
        return res.send(file);
      } catch (error) {
        if (error.code === 'ENOENT') return res.sendStatus(404);

        logger.error(error);
        return res.sendStatus(500);
      }
    });

  return router;
};
