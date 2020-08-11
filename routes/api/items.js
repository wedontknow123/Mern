const express = require('express');
const router =express.Router();
const call= require('./calling');

router.get('/',(req,res)=>{
    call.getList(req,res);
});

router.get('/key',(req,res)=>{
    call.get5(req,res);
});
router.post('/del',(req,res)=>{
    const useremail= req.body.useremail;
    call.get7(req,res,useremail);
})

router.post('/delete',(req,res)=>{
     var reqbody=JSON.stringify(req.body);
     call.del2(req,res,reqbody);
})

router.post('/',(req,res)=>{
    var reqbody=JSON.stringify(req.body);               
    call.add(req,res,reqbody);               
})
router.get('/department',(req,res)=>{
    call.getdepartment(req,res);
})
module.exports= router;