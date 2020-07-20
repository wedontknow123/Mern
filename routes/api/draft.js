const express = require('express');
const router =express.Router();
const call= require('./calling');


// router.get('/',(req,res)=>{ //post
    
//     //const useremail= req.body.useremail;
//     call.get7(req,res);//,useremail
// })
router.post('/',(req,res)=>{ //post
    
    const useremail= req.body.useremail;
    call.get7(req,res,useremail);//,useremail
})

router.post('/emp',(req,res)=>{
    
    const empid= req.body.empid;
    call.get6(req,res,empid);
})

router.post('/save',(req,res)=>{
     call.add4(req,res,JSON.stringify(req.body));
})

module.exports=router;