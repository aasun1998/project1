const mongoose = require('mongoose');

const bmwSchema = new mongoose.Schema({
      bmwModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("bmw", bmwSchema);