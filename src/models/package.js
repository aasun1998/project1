const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
      packageName: {
        type: String,
        default: ''
      },
      pPrice: {
        type: String,
        default: ''
      }
},{timestamps: true});


module.exports=mongoose.model("package", packageSchema);