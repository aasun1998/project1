const mongoose = require('mongoose');

const mitsubishiSchema = new mongoose.Schema({
      mitsubishiModel: {
        type: String,
        default: ''
      }
});


module.exports=mongoose.model("mitsubishi", mitsubishiSchema);