const mongoose = require('mongoose');

const carYearSchema = new mongoose.Schema({
      carYear: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("year", carYearSchema);