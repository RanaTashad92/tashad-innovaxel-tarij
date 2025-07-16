//Mongo DB Schema
const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
   original_url: {
      type: String,
      required: true
   },
   short_code:{type:String,required:true,unique:true},

   created_at: {type:Date, default: Date.now},

   updated_at: {type:Date, default: Date.now},

    access_count: {type:Number, default: 0},


});

module.exports = mongoose.model('Url', urlSchema);