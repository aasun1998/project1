const mongoose = require('mongoose');

const leadHistorySchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
      },
      lastName: {
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
      date: {
        type: String,
        default: ''
      },
      make: {
        type: String,
        default: ''
      },
      model: {
        type: String,
        default: ''
      },
      body: {
        type: String,
        default: ''
      },
      year: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
      state: {
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
      insurance: {
        type: String,
        default: ''
      },
      package: {
        type: String,
        default: ''
      },
      packagePrice: {
        type: String,
        default: ''
      },
      discount:{
        type: String,
        default: ''
      },
      reason:{
        type: String,
        default: ''
      },
      userId: {
          type: String,
          default: ''
      }
  
});


module.exports=mongoose.model("leadHistory", leadHistorySchema);