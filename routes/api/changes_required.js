const express = require('express');
const router =express.Router();
const call= require('./calling');


router.post('/',(req,res)=>{//get
    
    const useremail= req.body.useremail;    
    call.getempid(req,res,useremail);// change the get11 from draft to "sent for approval" later //,useremail
})

router.post('/emp',(req,res)=>{
    const empid= req.body.empid;
    call.getempidinfo2(req,res,empid);
})

router.post('/save',(req,res)=>{
     call.add(req,res,JSON.stringify(req.body));
})

module.exports=router;