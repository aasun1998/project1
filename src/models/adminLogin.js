const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
     fName: {
        type: String,
        default: '',
        required: true
      },
     lName: {
       type: String,
       default: '',
       required: true
      },
      email: {
        type: String,
        default: '',
        required: true
      },
      password: {
        type: String,
        default: '',
        requird: true
      },
      address: {
        type: String,
        default: '',
        requird: true
      }, 
      phone: {
        type: String,
        default: '',
        requird: true
      }  
},{timestamps: true});


module.exports=mongoose.model("admin", adminSchema);