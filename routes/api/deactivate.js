const express = require('express');
const router =express.Router();
const call= require('./calling');

router.post('/',(req,res)=>{
    const useremail= req.body.useremail;    
    call.getempid(req,res,useremail);
})

router.post('/cont',(req,res)=>{
    var reqbody=JSON.stringify(req.body);

    call.add5(req,res,reqbody);
})

module.exports=router;