const express = require('express');
const router =express.Router();
const call= require('./calling');
const bcrypt= require('bcryptjs');

router.post('/',(req,res)=>{
    console.log(req.body);
    call.checkauth(req,res,JSON.stringify(req.body))
})

router.post('/otp',(req,res)=>{
    call.otpgen(req,res,JSON.stringify(req.body));
})

router.post('/date',(req,res)=>{
    call.checkvaliddate(req,res,JSON.stringify(req.body));
})

router.post('/validotp',(req,res)=>{
    call.checkotp(req,res,JSON.stringify(req.body));
})


router.post('/password',(req,res)=>{
    const{Email,Password}=req.body;
    //var reqbody=(req.body);
    const id='';
    // if(!name || !email|| !password){
    //     return res.status(400).json({msg:"Please enter all fields"});
    // }
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(Password,salt,(err,hash)=>{
            if(err){
                console.log(err);
                res.sendStatus(500);
 
                return;
            }
            
            req.body.Password=hash;
            var reqbody=JSON.stringify(req.body);
            
            call.savepassword(req,res,reqbody);
            // call.get2(req,res,req.body.email,function(data){
            //     if(data){
            //      //values(req,res,data);
            //      console.log(data[0]);
            //      jwt.sign({
            //          id:data[0].SL_NO },
            //          config.get('jwtSecret'),
            //          {expiresIn:3600},
            //          (err,token)=>{
            //              if(err){
            //                  console.log(err);
            //                  res.sendStatus(500);
            //                  return;
            //              }else{
            //              res.status(200).json({token,
            //                  user:{
            //                  id:data[0].SL_NO,
            //                  name:data[0].Username,
            //                  email:data[0].Email
            //              }});}
                     
            //          });
            //     }
            // });
            //     //console.log(data);
            //    // res.write(JSON.stringify(data),function(err){res.end();});
               
            //     //
            
            // values=function(req,res,data){
            //  console.log(data);
             
             
            // };
         
            console.log(id);
             //console.log(a);
              //,(data)=>{console.log(data[0].SL_NO)}
        })
        if(err) throw err;
    })
     
       
   
 });
module.exports=router;