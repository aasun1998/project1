const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
      carName: {
        type: String,
        default: ''
      },
      carImage: {
        type: String, 
        path: ''
      }
});


module.exports=mongoose.model("car", carSchema);