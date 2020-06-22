const express = require('express');
const router =express.Router();
var db =require("../../db");
var httpMsgs=require("../../httpMsgs");
var util= require("util");
const bcrypt= require('bcryptjs');
const call= require('./calling');
const config=require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
router.post('/',(req,res)=>{
   const{email,password}=req.body;
   //var reqbody=(req.body);
   const id='';
   if(!email|| !password){
       return res.status(400).json({msg:"Please enter all fields"});
   }
   call.get2(req,res,req.body.email,function(data){
       
        if(data[0]===undefined){
            res.status(400).json({msg:"User doesn't exist"});
        }
        bcrypt.compare(req.body.password,data[0].Password).then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});
            values(req,res,data);
        }).catch((err)=>{
            console.log(err);
        });
        
   });
   values=function(req,res,data){
       console.log(data);
    
        jwt.sign({
            id:data[0].SL_NO },
            config.get('jwtSecret'), {
                expiresIn: 3600
              },
            (err,token)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }else{
                res.status(200).json({token,
                    user:{
                    id:data[0].SL_NO,
                    Username:data[0].Username,
                    email:data[0].Email
                }});}
            
            });
    //})



   }
      
  
});

router.get('/user',auth,(req,res)=>{
    call.get(req,res,req.user.id,function(data){
        res.status(200).json(data[0]);
    });
    
});
module.exports= router;