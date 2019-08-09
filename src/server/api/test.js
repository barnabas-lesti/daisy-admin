const path = require('path');
const fs = require('fs-extra');

const { TEMP_FOLDER_PATH } = require('../../../env.config');

module.exports = (router) => {
  router.route('/test')
    .get(async (req, res) => {
      return res.sendStatus(200);
    });

  return router;
};
