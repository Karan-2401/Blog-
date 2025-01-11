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
            type: Date.now,
            default: true
        },
        updateAt:{
            type: Date.now,
            default: true
        },

    }
);
module.exports = mongoose.model('Post',Post)