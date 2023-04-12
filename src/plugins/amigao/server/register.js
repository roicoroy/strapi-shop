'use strict';

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const staticFileMiddleware = require('./middlewares/staticFiles');

module.exports = async ({ strapi }) => {
  await staticFileMiddleware({ strapi });
  await generateJson();
};

async function generateJson() {
  const jsonData = fs.readFileSync(path.resolve(__dirname, 'public', 'assetlinks.json'), 'utf8');
  const filledJsData = _.template(jsonData)({
    backendUrl: strapi.config.server.url,
  });
  const extensionsPath = strapi.dirs.extensions || strapi.dirs.dist.extensions;
  const bbbJsPath = path.resolve(extensionsPath, 'strapi-well-known', 'public', 'assetlinks.json');
  await fs.ensureFile(bbbJsPath);
  await fs.writeFile(bbbJsPath, filledJsData);
}