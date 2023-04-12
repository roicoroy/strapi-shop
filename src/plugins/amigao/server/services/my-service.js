"use strict";

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  async sendSendGridEmail() {
    // const emailSender = await strapi.plugins['email'].services.email.send({
    //   to: 'sendgridtesting@gmail.com',
    //   from: 'roicoroy@yahoo.com.br', //e.g. single sender verification in SendGrid
    //   subject: '<<SG-11710215fdV>>',
    // });
    // const emailSender =  await strapi.plugins["email"].services.email.sendTemplatedEmail({
    //     to: 'sendgridtesting@gmail.com',
    //   },
    //   {
    //     subject: "<<SG-11710215fdV>>"
    //   },
    //   {
    //     user: _.pick(user, ["username", "email", "firstname", "lastname"]),
    //   }
    // );

    // console.log(emailSender);
  },
});
