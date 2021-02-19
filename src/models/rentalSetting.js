const mongoose = require('mongoose');

const rentalSettingSchema = new mongoose.Schema({
      fuelLevel: {
        type: String,
        default: ''
      },
      premiumPeriod: {
        type: String,
        default: ''
      }
},{timestamps: true});


module.exports=mongoose.model("rentalsetting", rentalSettingSchema);