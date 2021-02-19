const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    adminId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationSchema);
