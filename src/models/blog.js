const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      photo: {
        type: String,
        default: ''
      }
},{timestamps: true});


module.exports=mongoose.model("blog", blogSchema);