const express = require('express');
const router =express.Router();
const call= require('./calling');

router.get('/',(req,res)=>{
    call.get10(req,res);
})

router.post('/cont',(req,res)=>{
    var reqbody=JSON.stringify(req.body);

    call.add5(req,res,reqbody);
})

module.exports=router;