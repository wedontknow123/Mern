const express = require('express');
const router =express.Router();
const call= require('./calling');


router.get('/',(req,res)=>{
    //var reqbody=JSON.stringify(req.body);
    call.get4(req,res);
})

router.post('/',(req,res)=>{
    
    const module=req.body.module;
    call.get3(req,res,module);
})

router.post('/save',(req,res)=>{
     call.add3(req,res,JSON.stringify(req.body));
})

router.post('/upstat',(req,res)=>{
    call.upstat(req,res,JSON.stringify(req.body));
})

module.exports=router;