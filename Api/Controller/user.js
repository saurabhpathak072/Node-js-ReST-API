const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const axios = require("axios")
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const generateToken = require("../../config/generateToken");
const { request } = require("express");
const { getAccessToken } = require("../../utils/config");


const deleteUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  try {
    const result = await User.remove({ _id: userId });
    if (result) {
      res.status(200).json({
        message: "User deleted",
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const consumerKey= "cWlBM25BOVRjMXFGTzdpaHU5dEo6MTpjaQ";
  const consumerSecret = "AfkvTx8OuKqsL16QqQxyqLEUV_Uu816lclvCXeoawoaIJrWuF7";
  const rfcKey = encodeURI(consumerKey);
  const rfcSecret=encodeURI(consumerSecret);
  const bearerToken = `${rfcKey}:${rfcSecret}`;
  const base64token = Buffer.from(bearerToken).toString('base64');
  console.log('Base64 : ',base64token);
  const options={
    headers:{
      accept:'gzip',
      Authorization:'Basic '+base64token,
      'content-type':'application/x-www-form-urlencoded'
    },
    method:'POST',
    body:'grant_type=client_credentials',
  }
  try {
    
    const tokenaxis = await axios('https://api.twitter.com/oauth2/token',options);
    const bearerToken123 = await tokenaxis.json();
    console.log('bearerToken123 : ',bearerToken123);
  } catch (error) {
    console.log('bearerToken123 :>>>>. ');
    console.log(error);
  }
  try {
    User.findOne({ email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(401).json({
                message: "Auth Failed",
              });
            }
            if (result) {

              return res.status(200).json({
                message: "Auth Successfully!!",
                token : generateToken({id:user._id,email:user.email})
              });
            }
             res.status(401).json({
                message: "Auth Failed",
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Auth Failed",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Auth Failed",
    });
  }
});

const twitterLogInController=expressAsyncHandler(async (req,res)=>{
const requestTokenUrl="https://api.twitter.com/oauth/request_token";
const consumer_key = "CckNIvmxpaidXWd2omDf3AM4n";
const consumer_key_secret = "qFqLLjsBxwLy3Zzt2lob4peSIezjtkUjOStDOQo8ZBZ3H4z2mZ";
const oauth ={
  callback:"http://localhost:3000/signing-with-twitter",
  consumer_key,
  consumer_secret:consumer_key_secret
};
getAccessToken();
// const body = await axios.request({
//   url: requestTokenUrl,
//   method: "post",
//   baseURL: "http://localhost:3000/",
//   auth: {
//     username: consumer_key, // This is the client_id
//     password: consumer_key_secret // This is the client_secret
//   },
//   data: {
//     "grant_type": "client_credentials",
//     "scope": "public"    
//   }
// }).then(respose => {
//   console.log(respose);  
// }).catch(err=>{
//   console.log(err.message);
// }); 
console.log(body);

})
module.exports = {
  deleteUser,
  loginController,
  twitterLogInController
};
