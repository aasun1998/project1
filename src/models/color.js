const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
      modelColor: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("color", colorSchema);