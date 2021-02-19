const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
      toMail: {
        type: Array,
        default: []
      },
      subject: {
        type: String, 
        path: ''
      },
      text: {
        type: String, 
        path: ''
      }
},{timestamps: true});


module.exports=mongoose.model("mail", mailSchema);