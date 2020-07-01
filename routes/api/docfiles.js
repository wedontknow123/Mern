const express = require('express');
const router =express.Router();
const call= require('./calling');

router.get('/',(req,res)=>{
    call.get8(req,res);
})

module.exports=router;