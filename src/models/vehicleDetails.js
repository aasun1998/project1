const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const vehicleDetailsSchema = new mongoose.Schema(
  {
    regoNo: {
      type: String,
      default: "",
    },
    vehicleType: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    engineNo: {
      type: String,
      default: "",
    },
    make: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    vin: {
      type: String,
      default: "",
    },
    customerId: {
      type: ObjectId,
      ref: "insurancedetails",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicleDetails", vehicleDetailsSchema);
