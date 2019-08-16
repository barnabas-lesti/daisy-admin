const pathLib = require('path');
const fs = require('fs-extra');

const { TEMP_DIR_PATH } = require('../../../config/env');

module.exports = (router) => {
  router.route('/test/temp-file')
    .get(async (req, res) => {
      const { path } = req.query;
      if (!path) return res.sendStatus(400);

      try {
        const file = await fs.readFile(pathLib.join(TEMP_DIR_PATH, path), 'utf-8');
        return res.send(file);
      } catch (error) {
        if (error.code === 'ENOENT') return res.sendStatus(404);
        return res.sendStatus(500);
      }
    });

  return router;
};
