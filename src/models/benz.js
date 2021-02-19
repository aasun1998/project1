const mongoose = require('mongoose');

const benzSchema = new mongoose.Schema({
      benzModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("benz", benzSchema);