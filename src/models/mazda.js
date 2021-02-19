const mongoose = require('mongoose');

const mazdaSchema = new mongoose.Schema({
      mazdaModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("mazda", mazdaSchema);