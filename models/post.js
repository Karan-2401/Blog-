const mongoose = require('mongoose')

const scheme = mongoose.Schema;

const Post = new scheme(
    {
        title:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        updateAt:{
            type: Date,
            default: Date.now
        },

    }
);
module.exports = mongoose.model('Post',Post)