const mongoose = require('mongoose');

const volkswagenSchema = new mongoose.Schema({
      volkswagenModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("volkswagen", volkswagenSchema);