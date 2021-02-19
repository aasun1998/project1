const mongoose = require('mongoose');

const customerHistorySchema = new mongoose.Schema({
    date: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    suburb: {
        type: String,
        default: ''
    },
    post: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
      customerId: {
          type: String,
          default: ''
      }
  
},{timestamps: true});


module.exports=mongoose.model("customerHistory", customerHistorySchema);