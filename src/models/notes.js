const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const leadNoteSchema = new mongoose.Schema(
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
    user: {
      type: ObjectId,
      ref: "lead",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("leadNote", leadNoteSchema);
