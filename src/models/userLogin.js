const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userloginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
      required: true,
    },

    customerId: {
      type: ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userlogin", userloginSchema);
