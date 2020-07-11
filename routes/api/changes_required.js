const express = require('express');
const router =express.Router();
const call= require('./calling');


router.get('/',(req,res)=>{
    //var reqbody=JSON.stringify(req.body);
    //call.get7(req,res);
    call.get11(req,res);// change the get11 from draft to "sent for approval" later
})

router.post('/',(req,res)=>{
    const empid= req.body.empid;
    call.get12(req,res,empid);
})

router.post('/save',(req,res)=>{
     call.add(req,res,JSON.stringify(req.body));
})

module.exports=router;