const express = require('express');
const router =express.Router();
const call= require('./calling');


router.get('/empid',(req,res)=>{
    //var reqbody=JSON.stringify(req.body);
    //call.get7(req,res);
    call.get11(req,res);// change the get11 from draft to "sent for approval" later
})

router.post('/hkey',(req,res)=>{
    const empid= req.body.empid;
    call.get12(req,res,empid);
})

router.post('/data',(req,res)=>{
    const key= req.body.key;
    call.get8(req,res,key);
})

router.get('/',(req,res)=>{
    //var reqbody=JSON.stringify(req.body);
    call.get4(req,res);
})

router.post('/',(req,res)=>{
    
    const module=req.body.module;
    call.get3(req,res,module);
})

router.post('/save',(req,res)=>{
    
    //call.del3(req,res,JSON.stringify(req.body));
    call.add3(req,res,JSON.stringify(req.body));   
})

module.exports=router;

// /hkey have to be changed according to get11