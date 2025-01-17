const express = require('express');
const router = express.Router();
const createPost = require('../models/post')
const User = require('../models/user')
const layout = "../views/layouts/admin"
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const jwtsecret = process.env.SECRET_KEY

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg:"Unauthorize"})
    }else{
        try {
            const decoded = jwt.verify(token,jwtsecret)
            req.userId=decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({msg:"Unauthorize"});
        }
    }
}


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

router.post('/admin',async(req,res)=>{
    
    try{
        const {username,password}= req.body;
        const user = await User.findOne({username})
        
        if(user){
            const pass = await bcrypt.compare(password,user.password) 
            if(pass){
                const token = jwt.sign({userId:user.id},jwtsecret)
                res.cookie('token',token,{httpOnly:true})
                res.redirect('/dashboard')
            }else{
            res.status(401).json({msg:"invalid user"})
        }
        }else{
            res.status(401).json({msg:"invalid user"})
        }
    }catch(error){
        res.status(401).json({msg:"error"})
    }

})

router.get('/dashboard',authMiddleware,async(req,res)=>{
    try {
        const locals = {
            title:"Dashboard"
        }
        res.render('admin/dashboard')
    } catch (error) {
        console.log(error)
    }
    
})



router.post('/register',async(req,res)=>{
      try{
        const {username,password}= req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        try {
            const user = await User.create({username,password:hashedPassword})
            res.status(200).send(user)
        } catch (error) {
            res.status(404).json({msg:"error"})
        }
    }catch(error){
         res.status(404).json({msg:"error"})
    }

})

module.exports = router
