const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const claimSchema = new mongoose.Schema({
      name: {
        type: String,
        default: ''
      },
      vehicle: {
        type: String,
        default: ''
      },
      mobile: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
      },
      post: {
        type: String,
        default: ''
      },
      suburb: {
        type: String,
        default: ''
      },
      birthdate: {
        type: String,
        default: ''
      },
      licenceno: {
        type: String,
        default: ''
      },
      licenceexpiry: {
        type: String,
        default: ''
      },
      customerId: {
        type: ObjectId,
        ref: "insurancedetails",
        required: true
    }
},{timestamps: true});


module.exports=mongoose.model("driver", claimSchema);