'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('amigao')
      .service('myService')
      .sendSendGridEmail();
  },
});
