const mongoose = require('mongoose');

const nissanSchema = new mongoose.Schema({
      nissanModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("nissan", nissanSchema);