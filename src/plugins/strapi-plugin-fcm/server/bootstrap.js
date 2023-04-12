'use strict';

const fcmUtil = require('../util/fcm');
// const firebase = require("firebase/app");

// const config = {
//   firebase: {
//     apiKey: "AIzaSyAKPqlzZDnZszbdySKHlM3-Fgw76MMvF-o",
//     authDomain: "ion-amigao.firebaseapp.com",
//     projectId: "ion-amigao",
//     storageBucket: "ion-amigao.appspot.com",
//     messagingSenderId: "247045122799",
//     appId: "1:247045122799:web:f348b0fa0c34720247891a",
//     measurementId: "G-CHDXVMWZFR"
//   },
// };


module.exports = ({ strapi }) => {
  // bootstrap phase
  // firebase.initializeApp(config);
  fcmUtil.initialize(strapi);
};
