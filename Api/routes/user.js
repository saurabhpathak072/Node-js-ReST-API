const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { deleteUser } = require("../Controller/user");

const router = express.Router();

router.route("/signup").post((req, res, next) => {
  const { email, password } = req.body;

  User.find({ email: email })
    .select("-password")
    .exec()
    .then((user) => {
      if (user.length > 0) {
        res.status(409).json({
          message: "User main already exists",
        });
      } else {
        bcrypt.hash(password, 10, (erro, hash) => {
          if (erro) {
            res.status(500).json({
              error: erro,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  message: "User Created",
                  result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.route('/:userId').delete(deleteUser);

module.exports = router;
