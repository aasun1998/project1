const mongoose = require('mongoose');

const carModelSchema = new mongoose.Schema({
      carModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("toyota", carModelSchema);