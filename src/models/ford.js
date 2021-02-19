const mongoose = require('mongoose');

const fordSchema = new mongoose.Schema({
      fordModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("ford", fordSchema);