const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carID : {
     type : String,
     unique : true,
     required :[true , "Please Enter Car indentification ID"]
  },
  CarName:{
    type: String
  },
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  user:{
    type : mongoose.SchemaTypes.ObjectId, ref :'Users'
}});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
