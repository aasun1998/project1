const mongoose = require('mongoose');

const carVehicleSchema = new mongoose.Schema({
      carVehicle: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("vehicle", carVehicleSchema);