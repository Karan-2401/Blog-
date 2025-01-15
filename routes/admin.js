const express = require('express');
const router = express.Router();
const createPost = require('../models/post')
const layout = "../views/layouts/admin"

router.get("/admin", async(req,res)=>{
    try{
        const locals = {
            title:"admin"
        }
        res.render('admin/index',{locals:locals,
            layout:layout
        })
    }catch(error){
        console.log(error)
    }
})

module.exports = router