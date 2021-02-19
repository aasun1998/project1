const express = require("express");
const router = express.Router();
const admin = require("../models/adminLogin");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const authRoute = require("../Midlewire/adminAuth");

let objectId = mongoose.Types.ObjectId;

router.get("/admin/view", (req, res, next) => {
  admin
    .find()
    .then((result) => {
      return res.status(201).json({
        adminData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/admin/user", authRoute, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    email: req.body.email,
    password: hashedPassword,
    fName: req.body.email,
    lName: req.body.email,
    address: req.body.email,
    phone: req.body.phone,
  };
  try {
    let ad = new admin({
      email: req.body.email,
      password: hashedPassword,
      fName: req.body.fName,
      lName: req.body.lName,
      address: req.body.address,
      phone: req.body.phone,
    });

    ad.save().then(() => {
      return res.status(201).json({
        success: true,
        messege: "Done",
      });
    });
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({
      success: false,
      messege: "Error",
    });
  }
});

router.post("/admin/login", (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(422).json({
      success: false,
      message: "Admin details is not valid",
      data: {},
    });
  }

  let tempMail = userName.toLowerCase();
  admin
    .findOne({ email: tempMail })
    .then((savedAdmin) => {
      if (!savedAdmin) {
        return res.status(422).json({
          success: false,
          message: "Admin details is not validdddd",
          data: {},
        });
      }

      bcrypt
        .compare(password, savedAdmin.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(422).json({
              success: false,
              message: "Admin details is not valid",
              data: {},
            });
          }

          let token = jwt.sign({ _id: savedAdmin._id }, "char@123_char$1234");

          return res.status(200).json({
            success: true,
            message: "Admin details fetch successfully",
            data: {
              token,
              admin: {
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
            message: "Error in admin find",
            data: {},
          });
        });
    })
    .catch((error) => {
      console.log("Error in admin yy  find ", error);
      return res.status(500).json({
        success: false,
        message: "Error in admin find",
        data: {},
      });
    });
});

router.put("/all/admin/update", authRoute, (req, res, next) => {
  const { email, fName, lName, address, phone, _id } = req.body;

  admin
    .findByIdAndUpdate(
      { _id },
      {
        email,
        fName,
        lName,
        address,
        phone,
      }
    )
    .then((admin) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/all/admin/delite/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let adminId = objectId(Id);

  admin
    .findByIdAndDelete({ _id: adminId })
    .then((admin) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/one/admin/view", authRoute, (req, res, next) => {
  admin
    .findOne({ _id: req.admin._id })
    .then((result) => {
      return res.status(201).json({
        admin: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

module.exports = router;
