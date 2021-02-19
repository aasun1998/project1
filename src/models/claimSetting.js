const mongoose = require('mongoose');

const claimSettingSchema = new mongoose.Schema({
      claimStatus: {
        type: String,
        default: ''
      },
      claimFault: {
        type: String,
        default: ''
      }
},{timestamps: true});


module.exports=mongoose.model("claimsetting", claimSettingSchema);