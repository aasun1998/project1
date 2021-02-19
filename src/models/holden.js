const mongoose = require('mongoose');

const holdenSchema = new mongoose.Schema({
      holdenModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("holden", holdenSchema);