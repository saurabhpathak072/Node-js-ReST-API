const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const generateToken = require("../../config/generateToken");

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
                token : generateToken({id:result._id})
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

module.exports = {
  deleteUser,
  loginController,
};
