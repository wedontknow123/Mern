const express = require('express');
const router =express.Router();
const call= require('./calling');


router.get('/',(req,res)=>{
    //var reqbody=JSON.stringify(req.body);
    call.get7(req,res);
})

router.post('/',(req,res)=>{
    const empid= req.body.empid;
    call.get6(req,res,empid);
})

router.post('/save',(req,res)=>{
     call.add4(req,res,JSON.stringify(req.body));
})

module.exports=router;