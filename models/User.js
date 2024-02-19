const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : { 
    type : String,
    required: [true,"Please enter an Email"]
    },
    password : {
        type :String,
        required: [true,"Please enter a password"]
        
        
    },
    firstName: {
        type:String,
        required :[true,"Please Enter your name"]  ,
        minlength :[3,"Name should be atleast 3 characters long"]  
    },
    lastName: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin : {
        type: Boolean
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;