const pathLib = require('path');
const fs = require('fs-extra');

const { TEMP_FOLDER_PATH } = require('../../../env.config');

module.exports = (router) => {
  router.route('/test/temp-file')
    .get(async (req, res) => {
      const { path } = req.query;
      if (!path) return res.sendStatus(400);

      try {
        const file = await fs.readFile(pathLib.join(TEMP_FOLDER_PATH, path), 'utf-8');
        return res.send(file);
      } catch (error) {
        if (error.code === 'ENOENT') return res.sendStatus(404);
        return res.sendStatus(500);
      }
    });

  return router;
};
