const express = require("express");
const router = express.Router();
const policy = require("../models/policy");
const stripe = require("stripe")(
  "Ssk_test_51HjhVjJnnDzpnV7gEUD6PQT2mDXjZJVpIf8cZvMdi74XJ0jz7laToDXmFq2pSsQwmRq9lNlzI9yGv17sl6ozYBLg00o8RHNTB7"
);
const uuid = require("uuid");
const customer = require("../models/customer");
const vehicleDetails = require("../models/vehicleDetails");
const insuranceDetails = require("../models/insuraneDetails");
const claim = require("../models/claim");
const blog = require("../models/blog");
const lead = require("../models/lead");
const mongoose = require("mongoose");
const leadNote = require("../models/notes");
const { ObjectID, Db } = require("mongodb");
const leadHistory = require("../models/leadHistory");
const customerNotes = require("../models/customerNotes");
const customerHistory = require("../models/customerHistory");
const driver = require("../models/driver");
const rental = require("../models/rentaladd");
const rentalHistory = require("../models/rentalHistory");
const checkin = require("../models/checkin");
const insuraceHistory = require("../models/insuranceHistory");
const insuranceHistory = require("../models/insuranceHistory");
const claimHistory = require("../models/claimHistory");
const axios = require("axios");
const { v4 } = require("uuid");
const permanentIHistory = require("../models/permanentIHistory");
const authRoute = require("../Midlewire/adminAuth");
const vehicle = require("../models/vehicle");
const package = require("../models/package");
const rentalsetting = require("../models/rentalSetting");
const claimsetting = require("../models/claimSetting");
const mail = require("../models/mail");
const contact = require("../models/contact");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/policy");
const notification = require("../models/notification");
const multer = require("multer");
const path = require("path");
const insuraneDetails = require("../models/insuraneDetails");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

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

let transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "policyguru2020@gmail.com", // generated ethereal user
    pass: "Policyguru@2020", // generated ethereal password
  },
});

router.post("/api/policy/detail", (req, res, next) => {
  const {
    policyName,
    policyType,
    policyMonth,
    packageName,
    excess,
    pPrice,
    policyDetail,
  } = req.body;

  // email = email.toLowerCase();

  //verify

  //save
  let newPolicy = new policy();

  newPolicy.policyName = policyName;
  newPolicy.policyMonth = policyMonth;
  newPolicy.policyType = policyType;
  newPolicy.packageName = packageName;
  newPolicy.excess = excess;
  newPolicy.pPrice = pPrice;
  newPolicy.policyDetail = policyDetail;
  newPolicy
    .save()
    .then((policy) => {
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

router.get("/api/policy/data/:policy", (req, res, next) => {
  let policyName = req.params.policy;
  //let objectId = mongoose.Types.objectId
  //let userId = objectId(id);

  policy
    .find({ policyName })
    .then((result) => {
      return res.status(201).json({
        policyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/api/allpolicy/view", (req, res, next) => {
  policy
    .find()
    .then((result) => {
      return res.status(201).json({
        policyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/api/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        //   customer: customer.id,
        receipt_email: token.email,
        //   description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

router.get("/api/customer/data", authRoute, (req, res, next) => {
  customer
    .find()
    .then((result) => {
      return res.status(201).json({
        customerData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/vehicle/data", authRoute, (req, res, next) => {
  vehicleDetails
    .find()
    .then((result) => {
      return res.status(201).json({
        vehicleDetailsData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/insurance/data", authRoute, (req, res, next) => {
  insuranceDetails
    .find()
    .then((result) => {
      return res.status(201).json({
        insuranceData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/claim/detail", authRoute, (req, res, next) => {
  const {
    ownerName,
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
  } = req.body;

  console.log("here");

  // email = email.toLowerCase();

  //verify
  claim.find(
    {
      ownerName,
    },
    (err, previousClaim) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousClaim.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
      //save
      let newClaim = new claim();

      newClaim.ownerName = ownerName;
      newClaim.date = date;
      newClaim.fault = fault;
      newClaim.insurance = insurance;
      newClaim.driverName = driverName;
      newClaim.handwrittenForm = handwrittenForm;

      newClaim
        .save()
        .then((claim) => {
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
    }
  );
});

router.get("/claim/data", authRoute, (req, res, next) => {
  claim
    .find()
    .then((result) => {
      return res.status(201).json({
        claimData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/add/blog/post", (req, res, next) => {
  const { name, description, photo } = req.body;
  // email = email.toLowerCase();

  //verify
  blog.find(
    {
      description,
    },
    (err, previousBlog) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousBlog.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
      //save
      let newBlog = new blog();

      newBlog.name = name;
      newBlog.description = description;
      newBlog.photo = photo;

      newBlog
        .save()
        .then((blog) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
            result: blog._id,
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blank.",
          });
        });
    }
  );
});

router.get("/blog/post/view", (req, res, next) => {
  blog
    .find()
    .then((result) => {
      return res.status(201).json({
        blog: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/blog/update", authRoute, (req, res, next) => {
  const { name, description, photo, _id } = req.body;

  blog
    .findByIdAndUpdate(
      { _id },
      {
        name,
        description,
        photo,
      }
    )
    .then((blog) => {
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

router.post("/blog/delite/:id", (req, res, next) => {
  let Id = req.params.id;

  let rentalHisttoryId = objectId(Id);

  blog
    .findByIdAndDelete({ _id: rentalHisttoryId })
    .then((blog) => {
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

router.post("/driver/delite/:id", (req, res, next) => {
  let Id = req.params.id;

  let rentalHisttoryId = objectId(Id);

  driver
    .findByIdAndDelete({ _id: rentalHisttoryId })
    .then((driver) => {
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

router.put("/lead/update", authRoute, (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    make,
    model,
    body,
    year,
    color,
    state,
    address,
    suburb,
    post,
    policyType,
    insurance,
    packagePrice,
    package,
    _id,
  } = req.body;

  lead
    .findByIdAndUpdate(
      { _id },
      {
        firstName,
        lastName,
        email,
        phone,
        date,
        make,
        model,
        body,
        year,
        color,
        state,
        address,
        suburb,
        post,
        policyType,
        insurance,
        packagePrice,
        package,
      }
    )
    .then((lead) => {
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

router.post("/lead/send/:id", authRoute, (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    make,
    model,
    body,
    year,
    color,
    state,
    address,
    suburb,
    post,
    insurance,
    package,
    policyType,
    packagePrice,
    discount,
    reason,
  } = req.body;

  let Id = req.params.id;

  let userId = objectId(Id);

  let newLeadHistory = new leadHistory({
    firstName,
    lastName,
    email,
    phone,
    date,
    make,
    model,
    body,
    year,
    color,
    state,
    address,
    suburb,
    post,
    insurance,
    package,
    policyType,
    packagePrice,
    discount,
    reason,
    _id: userId,
  });

  newLeadHistory
    .save()
    .then(() => {
      lead
        .findByIdAndDelete({ _id: userId })
        .then((lead) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/lead/note/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const { note, date, description, asign } = req.body;

  leadNote.find(
    {
      description,
    },
    (err, previousNote) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousNote.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
      //save
      let newLeadNote = new leadNote();

      newLeadNote.note = note;
      newLeadNote.date = date;
      newLeadNote.description = description;
      newLeadNote.asign = asign;
      newLeadNote.user = noteId;
      newLeadNote
        .save()
        .then((leadNote) => {
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
    }
  );
});

router.get("/lead/note/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  lead
    .aggregate([
      {
        $lookup: {
          from: "leadnotes",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$user", "$$userId"] }] } } },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "leadDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$_id", userId] }],
          },
        },
      },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.get("/leadhistory/view", authRoute, (req, res, next) => {
  leadHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        historyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/leadhistory/view/:policyName", authRoute, (req, res, next) => {
  policy
    .find({ policyName: req.params.policyName })
    .then((result) => {
      return res.status(201).json({
        policyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/leadHistory/send/:id", authRoute, (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    make,
    model,
    body,
    year,
    color,
    state,
    address,
    suburb,
    post,
    insurance,
    package,
    policyType,
    packagePrice,
    discount,
    reason,
  } = req.body;

  let Id = req.params.id;

  let userId = objectId(Id);

  let newLead = new lead({
    firstName,
    lastName,
    email,
    phone,
    date,
    make,
    model,
    body,
    year,
    color,
    state,
    address,
    suburb,
    post,
    insurance,
    package,
    policyType,
    packagePrice,
    discount,
    reason,
    _id: userId,
  });

  newLead
    .save()
    .then(() => {
      leadHistory
        .findByIdAndDelete({ _id: userId })
        .then((leadHistory) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.put("/lead/price/update", authRoute, (req, res, next) => {
  const { packagePrice, discount, reason, _id } = req.body;

  lead
    .findByIdAndUpdate(
      { _id },
      {
        packagePrice,
        discount,
        reason,
      }
    )
    .then((lead) => {
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

router.put("/status/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let user = ObjectID(Id);
  lead
    .findByIdAndUpdate(
      { _id: user },
      {
        status: false,
      }
    )
    .then((lead) => {
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

router.post("/customer/send/details", authRoute, (req, res, next) => {
  const {
    date,
    name,
    type,
    address,
    suburb,
    post,
    email,
    phone,
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    package,
    cardNo,
    validity,
    regoNo,
    vehicleType,
    make,
    model,
    year,
    color,
    state,
    engineNo,
    vin,
  } = req.body;

  const password1 = nanoid(10);
  console.log("password", password1);

  bcrypt
    .hash(password1, 10)
    .then((hashedPassword) => {
      let newCustomer = new customer({
        date,
        name,
        type,
        address,
        suburb,
        post,
        email,
        password: hashedPassword,
        phone,
      });
      newCustomer.save().then((result1) => {
        const customerId = result1._id;

        insuranceDetails.find(
          {
            policyNo,
          },
          (err, previousLeads) => {
            if (err) {
              return res.status(400).json({
                success: false,
                messege: "Error: Server error.",
              });
            } else if (previousLeads.length > 0) {
              return res.status(400).json({
                success: false,
                messege: "Error: Account already exist.",
              });
            }
          }
        );

        let newInsuranceDetails = new insuranceDetails({
          policyNo,
          policyType,
          overdue,
          insuranceType,
          premium,
          excess,
          period,
          startDate,
          endDate,
          nextPaymentDue,
          package,
          cardNo,
          validity,
          customerId: customerId,
        });
        newInsuranceDetails.save().then((result) => {
          let _id = result._id;

          vehicleDetails.find(
            {
              regoNo,
            },
            (err, previousLeads) => {
              if (err) {
                return res.status(400).json({
                  success: false,
                  messege: "Error: Server error.",
                });
              } else if (previousLeads.length > 0) {
                return res.status(400).json({
                  success: false,
                  messege: "Error: Account already exist.",
                });
              }
            }
          );

          let newVehicleDetails = new vehicleDetails({
            regoNo,
            vehicleType,
            make,
            model,
            state,
            engineNo,
            year,
            color,
            vin,
            customerId: _id,
          });

          Promise.all([newVehicleDetails.save()])
            .then(() => {
              transporter1.sendMail({
                to: result1.email,
                from: "policyguru2020@gmail.com",
                subject: "Username and Password",
                html: `
                        <p>Now you are a customer of cams CLUB</p>
                        <h3>Your username is ${result1.email} and password is ${password1}</h3>
                        <h4>Change Your password for better use</h4>
                        <h4>Thank You</h4>
                        <h4>CAMS CLUB</h4>
                        `,
              });
              return res.status(201).json({
                success: true,
                messege: "Done",
                _id: _id,
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
      });
    })
    .catch((err) => {
      console.log("Error in Password Hash", err);
      return res.status(500).json({
        success: false,
        messege: "Error in Password Hash",
      });
    });
});

router.get("/customer/details/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  customer
    .aggregate([
      {
        $lookup: {
          from: "insurancedetails",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "insuranceDetails",
        },
      },
      {
        $lookup: {
          from: "vehicledetails",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "vehicleDetails",
        },
      },
      {
        $lookup: {
          from: "claims",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "claimDetails",
        },
      },
      {
        $lookup: {
          from: "drivers",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "driversDetails",
        },
      },
      {
        $lookup: {
          from: "customernotes",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "customerNotes",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$_id", userId] }],
          },
        },
      },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.post("/customer/note/:id", (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const { note, date, created } = req.body;

  customerNotes.find(
    {
      note,
    },
    (err, previousNote) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousNote.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
      //save
      let newCustomerNote = new customerNotes();

      newCustomerNote.note = note;
      newCustomerNote.date = date;
      newCustomerNote.created = created;
      newCustomerNote.customerId = noteId;
      newCustomerNote
        .save()
        .then((customerNotes) => {
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
    }
  );
});

router.put("/customer/update", authRoute, (req, res, next) => {
  const {
    date,
    name,
    type,
    address,
    suburb,
    post,
    email,
    phone,
    _id,
  } = req.body;

  customer
    .findByIdAndUpdate(
      { _id },
      {
        date,
        name,
        type,
        address,
        suburb,
        post,
        email,
        phone,
      }
    )
    .then((customer) => {
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

router.put("/insurance/update", authRoute, (req, res, next) => {
  const {
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    _id,
  } = req.body;

  insuranceDetails
    .findByIdAndUpdate(
      { _id },
      {
        policyNo,
        policyType,
        overdue,
        insuranceType,
        premium,
        excess,
        period,
        startDate,
        endDate,
        nextPaymentDue,
      }
    )
    .then((insuranceDetails) => {
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

router.put("/vehicle/update", authRoute, (req, res, next) => {
  const { regoNo, vehicleType, make, model, year, color, vin, _id } = req.body;

  vehicleDetails
    .findByIdAndUpdate(
      { _id },
      {
        regoNo,
        vehicleType,
        make,
        model,
        year,
        color,
        vin,
      }
    )
    .then((vehicleDetails) => {
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

router.post("/customer/send/:id", authRoute, (req, res, next) => {
  const { date, name, type, address, suburb, post, email, phone } = req.body;

  let Id = req.params.id;

  let customerId = objectId(Id);

  let newCustomerHistory = new customerHistory({
    date,
    name,
    type,
    address,
    suburb,
    post,
    email,
    phone,
    _id: customerId,
  });

  newCustomerHistory
    .save()
    .then(() => {
      customer
        .findByIdAndDelete({ _id: customerId })
        .then((customer) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/customerHistory/view", authRoute, (req, res, next) => {
  customerHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        customerHistoryData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/customerHistory/send/:id", authRoute, (req, res, next) => {
  const { date, name, type, address, suburb, post, email, phone } = req.body;

  let Id = req.params.id;

  let customerId = objectId(Id);

  let newCustomer = new customer({
    date,
    name,
    type,
    address,
    suburb,
    post,
    email,
    phone,
    _id: customerId,
  });

  newCustomer
    .save()
    .then(() => {
      customerHistory
        .findByIdAndDelete({ _id: customerId })
        .then((customerHistory) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/add/customer/insurance/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const {
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
  } = req.body;

  //save
  let newInsurance = new insuranceDetails({
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId: noteId,
  });

  newInsurance
    .save()
    .then((insuranceDetails) => {
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

router.post("/add/customer/vehicle/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const { regoNo, vehicleType, make, model, year, color, vin } = req.body;

  //save
  let newVehicle = new vehicleDetails({
    regoNo,
    vehicleType,
    make,
    model,
    year,
    color,
    vin,
    customerId: noteId,
  });

  newVehicle
    .save()
    .then((vehicleDetails) => {
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

router.post("/add/customer/claim/:id", (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const {
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    pdf,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
  } = req.body;

  //save

  claim.find(
    {
      claimNo,
    },
    (err, previousLeads) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousLeads.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
    }
  );

  let newClaim = new claim({
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm: "",
    make,
    year,
    pdf,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    img6: "",
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    customerId: noteId,
  });

  newClaim
    .save()
    .then((claim) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
        _id: claim._id,
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

router.post("/add/customer/driver/:id", (req, res, next) => {
  let Id = req.params.id;

  let noteId = objectId(Id);

  const {
    name,
    vehicle,
    mobile,
    address,
    post,
    suburb,
    birthdate,
    licenceno,
    licenceexpiry,
  } = req.body;

  //save
  let newDriver = new driver({
    name,
    vehicle,
    mobile,
    address,
    post,
    suburb,
    birthdate,
    licenceno,
    licenceexpiry,
    customerId: noteId,
  });

  newDriver
    .save()
    .then((driver) => {
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

router.put("/claim/update", authRoute, (req, res, next) => {
  const {
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    _id,
  } = req.body;

  claim
    .findByIdAndUpdate(
      { _id },
      {
        date,
        fault,
        insurance,
        driverName,
        handwrittenForm,
        make,
        year,
        company,
        model,
        rego,
        policyNo,
        claimNo,
        insured,
        oName,
        oState,
        oSuburb,
        oAddress,
        oPost,
        oMobile,
        dName,
        dState,
        dSuburb,
        dPost,
        dAddress,
        dMobile,
        dBirth,
        dLicenceNo,
        place,
        location,
        street,
        aDate,
        damageLocation,
        aPolicyNo,
        time,
        preVehicleDamage,
        roadSurface,
        carsInvolved,
        whoFault,
        insuredVehiclePlace,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        whatHappen,
        damageCarPicture1,
        damageCarPicture2,
        policeReport,
        policefName,
        policelName,
        ps,
        vehicleTowed,
        towedPlace,
        towedBy,
        repairable,
        witnessoName,
        witnesstName,
        witnessoNo,
        witnesstNo,
        customerSign,
        authoritySign,
      }
    )
    .then((claim) => {
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

router.put("/driver/update", authRoute, (req, res, next) => {
  const {
    name,
    vehicle,
    mobile,
    address,
    post,
    suburb,
    birthdate,
    licenceno,
    licenceexpiry,
    _id,
  } = req.body;

  driver
    .findByIdAndUpdate(
      { _id },
      {
        name,
        vehicle,
        mobile,
        address,
        post,
        suburb,
        birthdate,
        licenceno,
        licenceexpiry,
      }
    )
    .then((driver) => {
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

router.put("/customer/status/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let _id = objectId(Id);

  customer
    .findById({ _id })
    .then((savedData) => {
      if (!savedData) {
        return res.status(400).json({
          success: false,
          message: "no sub admin found!!",
          data: {},
        });
      }

      savedData.status = !savedData.status;

      savedData
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "sub admin blocked successfully",
            data: {},
          });
        })
        .catch((error) => {
          console.log("Error in updating sub admin ", error);
          return res.status(500).json({
            success: false,
            message: "Error in updating  sub admin",
            data: {},
          });
        });
    })
    .catch((err) => {
      console.log("Error in updating sub admin ", err);
      return res.status(500).json({
        success: false,
        message: "Error in updating sub admin",
        data: {},
      });
    });
});
//add
router.post("/rental/send", authRoute, (req, res, next) => {
  const {
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
  } = req.body;

  let newRental = new rental({
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
  });

  newRental
    .save()
    .then((rental) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

// rental view
router.get("/rental/view", authRoute, (req, res, next) => {
  rental
    .find()
    .then((result) => {
      return res.status(201).json({
        rentalData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/rental/send/:id", authRoute, (req, res, next) => {
  const {
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
  } = req.body;

  let Id = req.params.id;

  let rentalId = objectId(Id);

  let newRentalHistory = new rentalHistory({
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
    id: rentalId,
  });

  newRentalHistory
    .save()
    .then(() => {
      rental
        .findByIdAndDelete({ _id: rentalId })
        .then((rental) => {
          return res.status(201).json({
            success: true,
            messege: "Done",
          });
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            success: false,
            messege: "Error: It can not be blankkkk.",
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/rentalHistory/send/:id", authRoute, (req, res, next) => {
  const {
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
  } = req.body;

  let Id = req.params.id;

  let rentalHisttoryId = objectId(Id);

  let newRental = new rental({
    name,
    car,
    startDate,
    endDate,
    rentalPrice,
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
    _id: rentalHisttoryId,
  });

  newRental
    .save()
    .then(() => {
      rentalHistory
        .findByIdAndDelete({ _id: rentalHisttoryId })
        .then((rentalHistory) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/rentalhistory/view", authRoute, (req, res, next) => {
  rentalHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        historyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/rental/document/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let rentalId = objectId(Id);
  rental
    .find({ _id: rentalId })
    .then((result) => {
      return res.status(201).json({
        policyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/customer/discount/update", authRoute, (req, res, next) => {
  const { car, discount, reason, _id } = req.body;

  customer
    .findByIdAndUpdate(
      { _id },
      {
        car,
        discount,
        reason,
      }
    )
    .then((customer) => {
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

router.post("/rental/checkin/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let rentalId = objectId(Id);
  const {
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
  } = req.body;

  let newCheckin = new checkin({
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    damageImg1,
    damageImg2,
    damageDescription,
    fuel,
    km,
    sign1,
    sign2,
    id: rentalId,
  });

  newCheckin
    .save()
    .then((checkin) => {
      return res.status(201).json({
        success: true,
        messege: "Done",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/rental/checkin/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let rentalId = objectId(Id);
  checkin
    .find({ id: rentalId })
    .then((result) => {
      return res.status(201).json({
        checkData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/customer/insurance/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let insuranceId = objectId(Id);
  insuranceDetails
    .find({ _id: insuranceId })
    .then((result) => {
      return res.status(201).json({
        insuranceDetails: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/customer/vehicle/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let vehicleId = objectId(Id);
  vehicleDetails
    .find({ _id: vehicleId })
    .then((result) => {
      return res.status(201).json({
        vehicleDetails: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/customer/claim/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let claimId = objectId(Id);
  claim
    .find({ _id: claimId })
    .then((result) => {
      return res.status(201).json({
        claimDetails: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/customer/driver/view/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let driverId = objectId(Id);
  driver
    .find({ _id: driverId })
    .then((result) => {
      return res.status(201).json({
        driverDetails: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/customer/vd/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  insuranceDetails
    .aggregate([
      {
        $lookup: {
          from: "vehicledetails",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "vehicleDetails",
        },
      },
      {
        $lookup: {
          from: "drivers",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "driversDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$_id", userId] }],
          },
        },
      },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.post("/customer/send/iv/:id", (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  const {
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    regoNo,
    vehicleType,
    make,
    model,
    year,
    state,
    engineNo,
    color,
    vin,
  } = req.body;

  insuranceDetails.find(
    {
      policyNo,
    },
    (err, previousLeads) => {
      if (err) {
        return res.status(400).json({
          success: false,
          messege: "Error: Server error.",
        });
      } else if (previousLeads.length > 0) {
        return res.status(400).json({
          success: false,
          messege: "Error: Account already exist.",
        });
      }
    }
  );

  let newInsuranceDetails = new insuranceDetails({
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId: userId,
  });

  newInsuranceDetails.save().then((result) => {
    let _id = result._id;
    vehicleDetails.find(
      {
        regoNo,
      },
      (err, previousLeads) => {
        if (err) {
          return res.status(400).json({
            success: false,
            messege: "Error: Server error.",
          });
        } else if (previousLeads.length > 0) {
          return res.status(400).json({
            success: false,
            messege: "Error: Account already exist.",
          });
        }
      }
    );

    let newVehicleDetails = new vehicleDetails({
      regoNo,
      vehicleType,
      make,
      state,
      engineNo,
      model,
      year,
      color,
      vin,
      customerId: _id,
    });

    Promise.all([newVehicleDetails.save()])
      .then(() => {
        return res.status(201).json({
          success: true,
          messege: "Done",
          _id: _id,
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
});

router.post("/insurance/history/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let historyId = objectId(Id);

  const {
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId,
  } = req.body;

  let newInsuranceHistory = new insuranceHistory({
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId,
    _id: historyId,
  });

  newInsuranceHistory
    .save()
    .then((insuranceHistory) => {
      let newPermanentIHistory = new permanentIHistory({
        policyNo,
        policyType,
        overdue,
        insuranceType,
        premium,
        excess,
        period,
        startDate,
        endDate,
        nextPaymentDue,
        customerId,
        _id: historyId,
      });

      newPermanentIHistory.save().then((permanentIHistory) => {
        insuranceDetails
          .findByIdAndDelete({ _id: historyId })
          .then((insuranceDetails) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/insurance/history/view", authRoute, (req, res, next) => {
  insuraceHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        insuranceHistoryData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/history/insurance/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let historyId = objectId(Id);

  const {
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId,
  } = req.body;

  let newInsurance = new insuranceDetails({
    policyNo,
    policyType,
    overdue,
    insuranceType,
    premium,
    excess,
    period,
    startDate,
    endDate,
    nextPaymentDue,
    customerId,
    _id: historyId,
  });

  newInsurance
    .save()
    .then(() => {
      insuranceHistory
        .findByIdAndDelete({ _id: historyId })
        .then((insuraceHistory) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/claim/history/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let historyId = objectId(Id);

  const {
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    customerId,
  } = req.body;

  let newClaimHistory = new claimHistory({
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    customerId,
    _id: historyId,
  });

  newClaimHistory
    .save()
    .then(() => {
      claim
        .findByIdAndDelete({ _id: historyId })
        .then((claim) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.get("/claim/history/view", authRoute, (req, res, next) => {
  claimHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        claimHistoryData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/history/claim/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let historyId = objectId(Id);

  const {
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    customerId,
  } = req.body;

  let newClaim = new claim({
    date,
    fault,
    insurance,
    driverName,
    handwrittenForm,
    make,
    year,
    company,
    model,
    rego,
    policyNo,
    claimNo,
    insured,
    oName,
    oState,
    oSuburb,
    oAddress,
    oPost,
    oMobile,
    dName,
    dState,
    dSuburb,
    dPost,
    dAddress,
    dMobile,
    dBirth,
    dLicenceNo,
    place,
    location,
    street,
    aDate,
    damageLocation,
    aPolicyNo,
    time,
    preVehicleDamage,
    roadSurface,
    carsInvolved,
    whoFault,
    insuredVehiclePlace,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    whatHappen,
    damageCarPicture1,
    damageCarPicture2,
    policeReport,
    policefName,
    policelName,
    ps,
    vehicleTowed,
    towedPlace,
    towedBy,
    repairable,
    witnessoName,
    witnesstName,
    witnessoNo,
    witnesstNo,
    customerSign,
    authoritySign,
    customerId,
    _id: historyId,
  });

  newClaim
    .save()
    .then(() => {
      claimHistory
        .findByIdAndDelete({ _id: historyId })
        .then((claimHistory) => {
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
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messege: "Error: It can not be blank.",
      });
    });
});

router.post("/payment/create", (req, res) => {
  const { nonce, buyerVerificationToken } = req.body;

  // let  payload = {
  //     source_id: nonce,
  //     verification_token: buyerVerificationToken,
  //     autocomplete: true,
  //     location_id: "LWRZPAFZ2N5KN",
  //     amount_money: {  amount_money : '$1.00',
  //       amount: 100,
  //       currency: "USD"
  //     },
  //     idempotency_key: v4()
  //   }
  // Generate a random UUID as an idempotency key for the payment request
  // length of idempotency_key should be less than 45

  // let  payload = {
  //     "source_id": nonce,
  //     "verification_token": buyerVerificationToken,
  //     "autocomplete": true,
  //     "location_id": "LWRZPAFZ2N5KN",
  //     "amount_money": {
  //       "amount": 100,
  //       "currency": "USD"
  //     },
  //     "idempotency_key": v4()
  //   }

  // axios.post("https://connect.squareupsandbox.com/v2/payments" ,payload , {
  //     headers : {

  //     //   'crossDomain': true,
  //     // "Content-Type", "application/json;"
  //   'Content-Type': 'application/json;charset=utf8',
  // // 'Content-Type': 'text/plain;charset=utf-8',
  //       'Authorization' : `Bearer EAAAEEHn7wxs8GCgyzkDbDkc735P3wJDC61Jfu8J-K4uFCPgl_4jxKhkluh2yBw-`}

  // } ).then(result => {
  //    return res.status(201).json({
  //        success : true,
  //        message : "Payment succesfull",
  //        result
  //    })
  // }).catch(error => {
  //     console.log("Error" , error);
  //     return res.status(500).json({
  //         success : false,
  //         message : "Payment rejected",
  //         result : error.message
  //     })
  // })
});

router.post("/process-payment", async (req, res) => {
  accessToken =
    "EAAAEEHn7wxs8GCgyzkDbDkc735P3wJDC61Jfu8J-K4uFCPgl_4jxKhkluh2yBw-";
  const requestParams = req.body;

  // Charge the customer's card
  const paymentsApi = client.paymentsApi;
  const requestBody = {
    sourceId: requestParams.nonce,
    amountMoney: {
      amount: 100, // $1.00 charge
      currency: "USD",
    },
    locationId: requestParams.location_id,
    idempotencyKey: requestParams.idempotency_key,
  };

  try {
    const response = await paymentsApi.createPayment(requestBody);
    res.status(200).json({
      title: "Payment Successful",
      result: response.result,
    });
  } catch (error) {
    let errorResult = null;
    if (error instanceof ApiError) {
      errorResult = error.errors;
    } else {
      errorResult = error;
    }
    res.status(500).json({
      title: "Payment Failure",
      result: errorResult,
    });
  }
});

router.put("/customer/price/update", authRoute, (req, res, next) => {
  const { premium, discount, reason, _id } = req.body;

  insuranceDetails
    .findByIdAndUpdate(
      { _id },
      {
        premium,
        discount,
        reason,
      }
    )
    .then((insuranceDetails) => {
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

router.get("/permanent/insurance/history/view", authRoute, (req, res, next) => {
  permanentIHistory
    .find()
    .then((result) => {
      return res.status(201).json({
        insuranceHistoryData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/insurance/status/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let _id = objectId(Id);

  insuranceDetails
    .findById({ _id })
    .then((savedData) => {
      if (!savedData) {
        return res.status(400).json({
          success: false,
          message: "no sub admin found!!",
          data: {},
        });
      }

      savedData.status = !savedData.status;

      savedData
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "sub admin blocked successfully",
            data: {},
          });
        })
        .catch((error) => {
          console.log("Error in updating sub admin ", error);
          return res.status(500).json({
            success: false,
            message: "Error in updating  sub admin",
            data: {},
          });
        });
    })
    .catch((err) => {
      console.log("Error in updating sub admin ", err);
      return res.status(500).json({
        success: false,
        message: "Error in updating sub admin",
        data: {},
      });
    });
});

router.get("/insurance/view/:policyName", authRoute, (req, res, next) => {
  policy
    .find({ policyName: req.params.policyName })
    .then((result) => {
      return res.status(201).json({
        policyData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/setting/vehicle/update", authRoute, (req, res, next) => {
  const { carVehicle, _id } = req.body;

  vehicle
    .findByIdAndUpdate(
      { _id },
      {
        carVehicle,
      }
    )
    .then((vehicle) => {
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

router.put("/setting/insurance/update", authRoute, (req, res, next) => {
  const {
    policyName,
    policyMonth,
    policyType,
    policyDetail,
    packageName,
    excess,
    pPrice,
    _id,
  } = req.body;

  policy
    .findByIdAndUpdate(
      { _id },
      {
        policyName,
        policyMonth,
        policyType,
        policyDetail,
        excess,
        packageName,
        pPrice,
      }
    )
    .then((policy) => {
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

router.put("/setting/package/update", authRoute, (req, res, next) => {
  const { packageName, pPrice, _id } = req.body;

  package
    .findByIdAndUpdate(
      { _id },
      {
        packageName,
        pPrice,
      }
    )
    .then((package) => {
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

router.post("/setting/vehicle/delite/:id", (req, res, next) => {
  let Id = req.params.id;

  let vehicleId = objectId(Id);

  vehicle
    .findByIdAndDelete({ _id: vehicleId })
    .then((vehicle) => {
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

router.post("/setting/insurance/delite/:id", (req, res, next) => {
  let Id = req.params.id;

  let policyId = objectId(Id);

  policy
    .findByIdAndDelete({ _id: policyId })
    .then((policy) => {
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

router.post("/setting/package/delite/:id", (req, res, next) => {
  let Id = req.params.id;

  let packageId = objectId(Id);

  package
    .findByIdAndDelete({ _id: packageId })
    .then((package) => {
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

router.post("/add/package/detail", authRoute, (req, res, next) => {
  const { packageName, pPrice } = req.body;

  //save
  let newPackage = new package({
    packageName,
    pPrice,
  });

  newPackage
    .save()
    .then((package) => {
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

router.get("/package/view", authRoute, (req, res, next) => {
  package
    .find()
    .then((result) => {
      return res.status(201).json({
        packageData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/add/claim/setting", authRoute, (req, res, next) => {
  const { claimStatus, claimFault } = req.body;

  //save
  let newClaimSetting = new claimsetting({
    claimStatus,
    claimFault,
  });

  newClaimSetting
    .save()
    .then((claimsetting) => {
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

router.get("/claim/setting/view", authRoute, (req, res, next) => {
  claimsetting
    .find()
    .then((result) => {
      return res.status(201).json({
        claimSettingData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/setting/claim/update", authRoute, (req, res, next) => {
  const { claimStatus, claimFault, _id } = req.body;

  claimsetting
    .findByIdAndUpdate(
      { _id },
      {
        claimStatus,
        claimFault,
      }
    )
    .then((claimsetting) => {
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

router.post("/setting/claim/delite/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let claimSettingId = objectId(Id);

  claimsetting
    .findByIdAndDelete({ _id: claimSettingId })
    .then((claimsetting) => {
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

router.post("/add/rental/setting", authRoute, (req, res, next) => {
  const { fuelLevel, premiumPeriod } = req.body;

  //save
  let newRentalSetting = new rentalsetting({
    fuelLevel,
    premiumPeriod,
  });

  newRentalSetting
    .save()
    .then((rentalsetting) => {
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

router.get("/rental/setting/view", authRoute, (req, res, next) => {
  rentalsetting
    .find()
    .then((result) => {
      return res.status(201).json({
        rentalSettingData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/setting/rental/update", authRoute, (req, res, next) => {
  const { fuelLevel, premiumPeriod, _id } = req.body;

  rentalsetting
    .findByIdAndUpdate(
      { _id },
      {
        fuelLevel,
        premiumPeriod,
      }
    )
    .then((rentalsetting) => {
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

router.post("/setting/rental/delite/:id", authRoute, (req, res, next) => {
  let Id = req.params.id;

  let rentalSettingId = objectId(Id);

  rentalsetting
    .findByIdAndDelete({ _id: rentalSettingId })
    .then((rentalsetting) => {
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

router.get("/all/customer/view", authRoute, (req, res, next) => {
  customer
    .find()
    .then((result) => {
      return res.status(201).json({
        customerData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/add/mail", authRoute, (req, res, next) => {
  const { toMail, subject, text } = req.body;

  console.log("mail", toMail);
  console.log("subject", subject);
  console.log("text", text);

  let mailOption = {
    from: "policyguru2020@gmail.com", // sender address
    to: toMail, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("Email sent error: ", error);
      return res.status(500).json({
        success: false,
        message: "Email sent error",
        data: {},
      });
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  //save
  let newMail = new mail({
    toMail,
    subject,
    text,
  });

  newMail
    .save()
    .then((mail) => {
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

router.get("/all/mail/view", authRoute, (req, res, next) => {
  mail
    .find()
    .then((result) => {
      return res.status(201).json({
        mailData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/four/lead/view", (req, res, next) => {
  lead
    .find()
    .sort({ updatedAt: -1 })
    .limit(4)
    .then((result) => {
      return res.status(201).json({
        lData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.post("/add/notification", (req, res, next) => {
  const { userId, category, adminId } = req.body;

  let newNotification = new notification({
    userId,
    category,
    adminId,
  });

  newNotification
    .save()
    .then((notification) => {
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

router.get("/four/notification/view", (req, res, next) => {
  notification
    .find()
    .sort({ updatedAt: -1 })
    .limit(4)
    .then((result) => {
      return res.status(201).json({
        nData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/all/notification/view", (req, res, next) => {
  notification
    .find()
    .then((result) => {
      return res.status(201).json({
        notificationData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/lead/view", (req, res, next) => {
  lead
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        lData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/customer/view", (req, res, next) => {
  customer
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        cData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/insurance/view", (req, res, next) => {
  insuranceDetails
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        iData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/onfault/view", (req, res, next) => {
  claim
    .find({ fault: "On Fault" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onfaultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/onright/view", (req, res, next) => {
  claim
    .find({ fault: "On Right" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onrightData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/disputed/view", (req, res, next) => {
  claim
    .find({ fault: "Disputed" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        disputedData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/cu/details/view/", (req, res, next) => {
  claim
    .aggregate([
      {
        $lookup: {
          from: "customers",
          let: { userId: "$customerId" }, // local field
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$_id", "$$userId"] }] }, // forigen field
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "insuranceDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$fault", "On Fault"] }],
          },
        },
      },
      { $unwind: "$insuranceDetails" },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.get("/onright/details/view/", (req, res, next) => {
  claim
    .aggregate([
      {
        $lookup: {
          from: "customers",
          let: { userId: "$customerId" }, // local field
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$_id", "$$userId"] }] }, // forigen field
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "onRightDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$fault", "On Right"] }],
          },
        },
      },
      { $unwind: "$onRightDetails" },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.get("/disputed/details/view/", (req, res, next) => {
  claim
    .aggregate([
      {
        $lookup: {
          from: "customers",
          let: { userId: "$customerId" }, // local field
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$_id", "$$userId"] }] }, // forigen field
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "disputedDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$fault", "Disputed"] }],
          },
        },
      },
      { $unwind: "$disputedDetails" },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.get("/ci/details/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  customer
    .aggregate([
      {
        $lookup: {
          from: "insurancedetails",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "insuranceDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$_id", userId] }],
          },
        },
      },
      { $unwind: "$insuranceDetails" },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.get("/ivd/details/view/:id", (req, res, next) => {
  let Id = req.params.id;

  let userId = ObjectID(Id);

  insuranceDetails
    .aggregate([
      {
        $lookup: {
          from: "vehicledetails",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "vehicledetails",
        },
      },
      {
        $lookup: {
          from: "drivers",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$customerId", "$$userId"] }] },
              },
            },
            // { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "driversDetails",
        },
      },
      {
        $match: {
          $expr: {
            $and: [{ $eq: ["$_id", userId] }],
          },
        },
      },
    ])
    .then((result) => {
      return res.status(200).json({
        success: true,
        messege: "Done",
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error in get new lead", err);
      return res.status(500).json({
        success: false,
        messege: "Error",
      });
    });
});

router.put("/policy/pdf/send", (req, res, next) => {
  let adminProfilePictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/policy");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let upload = multer({ storage: adminProfilePictureStorage }).single(
    "policyPdf"
  );

  upload(req, res, async (errorFile) => {
    const { policyPdf, customerId } = req.body;

    console.log("Pdf file ", req.file);

    if (errorFile) {
      console.log("Error in Image Upload ", errorFile);
      return res.status(500).json({
        success: false,
        message: "Error in image upload",
        data: {},
      });
    } else {
      if (!customerId) {
        return res.status(422).json({
          success: false,
          message: "Please provide customer id",
          data: {},
        });
      }

      insuranceDetails
        .findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(customerId) },
          {
            pdf:
              req.file != undefined && req.file != null
                ? req.file.filename
                : policyPdf,
          }
        )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Result update succesfully",
            data: {},
          });
        })
        .catch((err) => {
          console.log("Error in upload pdf", err);
          return res.status(500).json({
            success: false,
            message: "Error in upload pdf",
            data: {},
          });
        });
    }
  });
});

router.get("/count/vic", (req, res, next) => {
  vehicleDetails
    .find({ state: "VIC" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        vicData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/act", (req, res, next) => {
  vehicleDetails
    .find({ state: "ACT" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        actData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/qld", (req, res, next) => {
  vehicleDetails
    .find({ state: "QLD" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        qldData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/sa", (req, res, next) => {
  vehicleDetails
    .find({ state: "SA" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        saData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/wa", (req, res, next) => {
  vehicleDetails
    .find({ state: "WA" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        waData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/tas", (req, res, next) => {
  vehicleDetails
    .find({ state: "TAS" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        tasData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/nsw", (req, res, next) => {
  vehicleDetails
    .find({ state: "NSW" })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        nswData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.put("/claim/pdf/image/send", (req, res, next) => {
  let adminProfilePictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/claim");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  let upload = multer({ storage: adminProfilePictureStorage }).fields([
    { name: "claimPdf", maxCount: 1 },
    { name: "claimImage1", maxCount: 1 },
    { name: "claimImage2", maxCount: 1 },
    { name: "claimImage3", maxCount: 1 },
    { name: "claimImage4", maxCount: 1 },
    { name: "claimImage5", maxCount: 1 },
    { name: "claimImage6", maxCount: 1 },
    { name: "claimImage7", maxCount: 1 },
    { name: "claimImage8", maxCount: 1 },
    { name: "claimImage9", maxCount: 1 },
    { name: "claimImage10", maxCount: 1 },
    { name: "claimImage11", maxCount: 1 },
    { name: "claimImage12", maxCount: 1 },
    { name: "claimImage13", maxCount: 1 },
  ]);

  upload(req, res, async (errorFile) => {
    const {
      claimPdf,
      claimImage1,
      claimImage2,
      claimImage3,
      claimImage4,
      claimImage5,
      claimImage6,
      claimImage7,
      claimImage8,
      claimImage9,
      claimImage10,
      claimImage11,
      claimImage12,
      claimImage13,
      customerId,
    } = req.body;

    console.log("Pdf file ", req.files);

    if (errorFile) {
      console.log("Error in Image Upload ", errorFile);
      return res.status(500).json({
        success: false,
        message: "Error in image upload",
        data: {},
      });
    } else {
      if (!customerId) {
        return res.status(422).json({
          success: false,
          message: "Please provide customer id",
          data: {},
        });
      }

      const pdFile = req.files.claimPdf[0];
      const imageFile1 = req.files.claimImage1[0];
      const imageFile2 = req.files.claimImage2[0];
      const imageFile3 = req.files.claimImage3[0];
      const imageFile4 = req.files.claimImage4[0];
      const imageFile5 = req.files.claimImage5[0];
      const imageFile6 = req.files.claimImage6[0];
      const imageFile7 = req.files.claimImage7[0];
      const imageFile8 = req.files.claimImage8[0];
      const imageFile9 = req.files.claimImage9[0];
      const imageFile10 = req.files.claimImage10[0];
      const imageFile11 = req.files.claimImage11[0];
      const imageFile12 = req.files.claimImage12[0];
      const imageFile13 = req.files.claimImage13[0];

      claim
        .findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(customerId) },
          {
            pdf:
              req.files != undefined && req.files != null
                ? pdFile.filename
                : claimPdf,
            handwrittenForm:
              req.files != undefined && req.files != null
                ? imageFile1.filename
                : claimImage1,
            img1:
              req.files != undefined && req.files != null
                ? imageFile2.filename
                : claimImage2,
            img2:
              req.files != undefined && req.files != null
                ? imageFile3.filename
                : claimImage3,
            img3:
              req.files != undefined && req.files != null
                ? imageFile4.filename
                : claimImage4,
            img4:
              req.files != undefined && req.files != null
                ? imageFile5.filename
                : claimImage5,
            img5:
              req.files != undefined && req.files != null
                ? imageFile6.filename
                : claimImage6,
            img6:
              req.files != undefined && req.files != null
                ? imageFile7.filename
                : claimImage7,
            img7:
              req.files != undefined && req.files != null
                ? imageFile8.filename
                : claimImage8,
            img8:
              req.files != undefined && req.files != null
                ? imageFile9.filename
                : claimImage9,
            img9:
              req.files != undefined && req.files != null
                ? imageFile10.filename
                : claimImage10,
            img10:
              req.files != undefined && req.files != null
                ? imageFile11.filename
                : claimImage11,
            img11:
              req.files != undefined && req.files != null
                ? imageFile12.filename
                : claimImage12,
            img12:
              req.files != undefined && req.files != null
                ? imageFile13.filename
                : claimImage13,
          }
        )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Result update succesfully",
            data: {},
          });
        })
        .catch((err) => {
          console.log("Error in upload pdf", err);
          return res.status(500).json({
            success: false,
            message: "Error in upload pdf",
            data: {},
          });
        });
    }
  });
});

router.put("/blog/image/send", (req, res, next) => {
  let adminProfilePictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/blog");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  let upload = multer({ storage: adminProfilePictureStorage }).fields([
    { name: "blogImage", maxCount: 1 },
  ]);

  upload(req, res, async (errorFile) => {
    const { blogImage, customerId } = req.body;

    console.log("blogImage", req.files);

    if (errorFile) {
      console.log("Error in Image Upload ", errorFile);
      return res.status(500).json({
        success: false,
        message: "Error in image upload",
        data: {},
      });
    } else {
      if (!customerId) {
        return res.status(422).json({
          success: false,
          message: "Please provide customer id",
          data: {},
        });
      }

      const imageFile1 = req.files.blogImage[0];

      blog
        .findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(customerId) },
          {
            photo:
              req.files != undefined && req.files != null
                ? imageFile1.filename
                : blogImage,
          }
        )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Result update succesfully",
            data: {},
          });
        })
        .catch((err) => {
          console.log("Error in upload pdf", err);
          return res.status(500).json({
            success: false,
            message: "Error in upload pdf",
            data: {},
          });
        });
    }
  });
});

router.post("/add/contact/from", (req, res, next) => {
  const { firstName, lastName, email, phone, messege } = req.body;

  //save
  let newContact = new contact({
    firstName,
    lastName,
    email,
    phone,
    messege,
  });

  newContact
    .save()
    .then((contact) => {
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

router.get("/all/contact/view", (req, res, next) => {
  contact
    .find()
    .then((result) => {
      return res.status(201).json({
        contactData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/user/insurance/:id", (req, res, next) => {
  let Id = req.params.id;

  let insuranceId = objectId(Id);

  insuranceDetails
    .find({ customerId: insuranceId })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onfaultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/user/claim/:id", (req, res, next) => {
  let Id = req.params.id;

  let claimId = objectId(Id);

  claim
    .find({ customerId: claimId })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onfaultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/user/vehicle/:id", (req, res, next) => {
  let Id = req.params.id;

  let vehicleId = objectId(Id);

  vehicleDetails
    .find({ customerId: vehicleId })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onfaultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    });
});

router.get("/count/user/driver/:id", (req, res, next) => {
  let Id = req.params.id;

  let driverId = objectId(Id);

  driver
    .find({ customerId: driverId })
    .countDocuments()
    .then((result) => {
      return res.status(201).json({
        onfaultData: result,
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
