const express = require('express');
const router =express.Router();
var db =require("../../db");
var httpMsgs=require("../../httpMsgs");
var util= require("util");
const bcrypt= require('bcryptjs');
const call= require('./calling');
const config=require('config');
const jwt = require('jsonwebtoken');

router.post('/',(req,res)=>{
   const{name,email,password}=req.body;
   //var reqbody=(req.body);
   const id='';
   if(!name || !email|| !password){
       return res.status(400).json({msg:"Please enter all fields"});
   }
   bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(password,salt,(err,hash)=>{
           if(err){
               console.log(err);
               res.sendStatus(500);

               return;
           }
           
           req.body.password=hash;
           var reqbody=JSON.stringify(req.body);
           
           call.add2(req,res,reqbody);
           call.get2(req,res,req.body.email,function(data){
               if(data){
                //values(req,res,data);
                console.log(data[0]);
                jwt.sign({
                    id:data[0].SL_NO },
                    config.get('jwtSecret'),
                    {expiresIn:7200},
                    (err,token)=>{
                        if(err){
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }else{
                        res.status(200).json({token,
                            user:{
                            id:data[0].SL_NO,
                            name:data[0].Username,
                            email:data[0].Email
                        }});}
                    
                    });
               }
           });
               //console.log(data);
              // res.write(JSON.stringify(data),function(err){res.end();});
              
               //
           
           values=function(req,res,data){
            console.log(data);
            
            
           };
        
           console.log(id);
            //console.log(a);
             //,(data)=>{console.log(data[0].SL_NO)}
       })
       if(err) throw err;
   })
    
      
  
});

module.exports= router;