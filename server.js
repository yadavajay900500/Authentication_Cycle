const { required } = require("@hapi/joi/lib/base");
const express = require("express");
const multer=require('multer');
const app = express();
const  phone= require('phone-regex');
const Mongoose = require("mongoose");
const  SigninSignupRoutes = require('./Routes/signinsignup.routes');
const api_version = "api/v1";
(() => {
    db_config();
    body_parsar();
    routes_config();
    global_Error_Handler();


  })();
  function db_config() {
    Mongoose.connect(
      "mongodb+srv://ajay:900@cluster0.umyjcyd.mongodb.net/registrationForm_DB?retryWrites=true&w=majority",
      (err) => {
        if (!err) {
          console.log("DB Connected Successfully");
        } else {
          console.log("Error: ", err);
        }
      }
    );
  }
  
   function body_parsar() {
    app.use(express.json());
  }
function routes_config(){
    app.use('/', SigninSignupRoutes);
}
function global_Error_Handler() {
 app.use((err, req, res, next) => {
    const errorStatus = req.status || 500;
     const error = err.message && [err.message] || err || "Internal Server Error";
     res.status(errorStatus).send({error})
  })
 }
 module.exports = app;