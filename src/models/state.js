const mongoose = require('mongoose');

const carStateSchema = new mongoose.Schema({
      carState: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("state", carStateSchema);