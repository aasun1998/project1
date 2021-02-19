const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const userRoute = require("../Midlewire/userAuth");
const customer = require("../models/customer");
const nodemailer = require("nodemailer");

let objectId = mongoose.Types.ObjectId;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "policyguru2020@gmail.com", // generated ethereal user
    pass: "Policyguru@2020", // generated ethereal password
  },
});

router.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      success: false,
      message: "User details is not valid",
      data: {},
    });
  }

  let tempMail = email.toLowerCase();
  customer
    .findOne({ email: tempMail })
    .then((savedAdmin) => {
      if (!savedAdmin) {
        return res.status(422).json({
          success: false,
          message: "User details is not validdddd",
          data: {},
        });
      }

      bcrypt
        .compare(password, savedAdmin.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(422).json({
              success: false,
              message: "User details is not validffff",
              data: {},
            });
          }

          let token = jwt.sign({ _id: savedAdmin._id }, "char@1234_char$1234");

          return res.status(200).json({
            success: true,
            message: "User details fetch successfully",
            data: {
              token,
              user: {
                id: savedAdmin._id,
                email: savedAdmin.email,
              },
            },
          });
        })
        .catch((error) => {
          console.log("Error in admin find ", error);
          return res.status(500).json({
            success: false,
            message: "Error in user find",
            data: {},
          });
        });
    })
    .catch((error) => {
      console.log("Error in admin yy  find ", error);
      return res.status(500).json({
        success: false,
        message: "Error in user find",
        data: {},
      });
    });
});

router.get("/one/user/view", userRoute, (req, res, next) => {
  customer
    .findOne({ _id: req.user._id })
    .then((result) => {
      return res.status(200).json({
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/reset/password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    customer.findOne({ email: req.body.email }).then((customer) => {
      if (!customer) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }

      customer.resetToken = token;
      customer.expireToken = Date.now() + 600000;
      customer.save().then((result) => {
        transporter.sendMail({
          to: customer.email,
          from: "policyguru2020@gmail.com",
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/updatepassword/${token}">link</a> to reset password</h5>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new/password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  customer
    .findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((customer) => {
      if (!customer) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        customer.password = hashedpassword;
        customer.resetToken = undefined;
        customer.expireToken = undefined;
        customer.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
