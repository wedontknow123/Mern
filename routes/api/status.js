const express = require('express');
const router =express.Router();
const call= require('./calling');

router.post('/',(req,res)=>{
    console.log(req.body);
    call.getapprovedby(req,res,JSON.stringify(req.body))
})

router.get('/stat',(req,res)=>{
    call.getstatus(req,res);
})
module.exports=router;