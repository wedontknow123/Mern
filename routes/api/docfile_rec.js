const express = require('express');
const router =express.Router();
const call= require('./calling');

router.post('/',function(req,res){
    var reqbody=JSON.stringify(req.body);
    //console.log(reqbody);
    call.add6(req,res,reqbody);
})

router.post('/ch',function(req,res){
    var reqbody=JSON.stringify(req.body);
    //console.log(reqbody);
    call.add6(req,res,reqbody);
})
module.exports=router;