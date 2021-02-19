const mongoose = require('mongoose');

const hondaSchema = new mongoose.Schema({
      hondaModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("honda", hondaSchema);