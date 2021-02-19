const mongoose = require('mongoose');

const carFuelSchema = new mongoose.Schema({
      carFuel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("fuel", carFuelSchema);