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
            layout:layout,
            cookie:req.cookies.token
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
                const token = await jwt.sign({userId:user.id},jwtsecret)
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
        const perPage = 10;
        const Page = req.query.page || 1;
        const Data = await createPost.aggregate([
            {$sort:{_id:-1}},
            {$skip:perPage * Page - perPage},
            {$limit:perPage}
        ])
        const newPage = parseInt(Page)+1;
        const posts = await createPost.countDocuments();
        console.log(posts)
        const condition = newPage <= Math.ceil(posts/perPage)
        console.log(condition)
        res.render('admin/dashboard',{locals,Data:Data,newPage:newPage,condition:condition ? null : 1,layout:layout,cookie:req.cookies.token})
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
            res.redirect('/admin')
        } catch (error) {
            res.status(404).json({msg:"error"})
        }
    }catch(error){
         res.status(404).json({msg:"error"})
    }

})

router.get('/add-post',authMiddleware,async(req,res)=>{
    try {
        res.render('admin/add-post',{cookie:req.cookies.token})
    } catch (error) {
        console.log(error)        
    }
})

router.post('/add-post',authMiddleware,async(req,res)=>{
    try {
        const {title,body} =req.body;
        const t = String(title);
        const b = String(body)
        const data = await createPost.insertMany([{
            title:t,
            body:b,
        }])
        res.render('admin/add-post',{layout:layout})
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit-post/:id',authMiddleware,async(req,res)=>{
    const locals = {
        title:"Dashboard"
    }
    const id = req.params.id;
    console.log(id)
    const data =await createPost.findOne({_id:id});

    res.render('admin/edit-post',{
        Data:data,
        locals:locals,
        layout:layout,
        cookie:req.cookies.token
    })
})

router.put('/edit-post/:id',authMiddleware, async(req,res)=>{
   
   try {
    const change = await createPost.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        body:req.body.body,
        updateAt:Date.now()
    });
    res.redirect(`/edit-post/${req.params.id}`)
    
   } catch (error) {
    console.log(error)
}})

router.delete('/delete-post/:id',authMiddleware, async(req,res)=>{
    try {
        await createPost.deleteOne({_id:req.params.id})
        res.redirect(`/dashboard`)
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout',authMiddleware, async(req,res)=>{
    res.clearCookie('token')
    res.redirect('/')
})
module.exports = router
