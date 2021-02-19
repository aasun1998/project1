const mongoose = require('mongoose');

const hyundaiSchema = new mongoose.Schema({
      hyundaiModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("hyundai", hyundaiSchema);