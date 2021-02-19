const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const customerNoteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    created: {
      type: String,
      default: "",
    },
    customerId: {
      type: ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerNotes", customerNoteSchema);
