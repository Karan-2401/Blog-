const mongoose = require('mongoose');

const scheme = mongoose.Schema;

const UserSchema = new scheme({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('User',UserSchema)