const mongoose = require('mongoose');

const kiaSchema = new mongoose.Schema({
      kiaModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("kia", kiaSchema);