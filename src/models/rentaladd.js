const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
      name: {
        type: String,
        default: ''
      },
      car: {
        type: String,
        default: ''
      },
      startDate: {
        type: String,
        default: ''
      },
      endDate: {
        type: String,
        default: ''
      },
      rentalPrice: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      img1: {
        type: String,
        default: ''
      },
      img2: {
        type: String,
        default: ''
      },
      img3: {
        type: String,
        default: ''
      },
      img4: {
        type: String,
        default: ''
      },
      img5: {
        type: String,
        default: ''
      },
      img6: {
        type: String,
        default: ''
      },
      damageImg1: {
        type: Object,
        default: {}
      },
      damageImg2: {
        type: Object,
        default: {}
      },
      damageDescription: {
        type: String,
        default: ''
      },
      fuel: {
        type: String,
        default: ''
      },
      km: {
        type: String,
        default: ''
      },
      sign1: {
        type: Array,
        default: []
      },
      sign2: {
        type: Array,
        default: []
      }
  
},{timestamps: true});


module.exports=mongoose.model("rental", rentalSchema);