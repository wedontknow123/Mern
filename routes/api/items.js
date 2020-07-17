const express = require('express');
const router =express.Router();
const call= require('./calling');

router.get('/',(req,res)=>{
    call.getList(req,res);
});

router.get('/key',(req,res)=>{
    call.get5(req,res);
});
router.get('/del',(req,res)=>{
    call.get7(req,res);
})

router.post('/delete',(req,res)=>{
     var reqbody=JSON.stringify(req.body);
     call.del2(req,res,reqbody);
})

router.post('/',(req,res)=>{
    var reqbody=JSON.stringify(req.body);               
    call.add(req,res,reqbody);               
})

module.exports= router;