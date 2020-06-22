const express = require('express');
const router =express.Router();
const db= require('../../db');
const httpMsgs = require('../../httpMsgs');
const util=require('util');
var http =require("http");
const call= require('./calling');
const keys =require('../../config/keys');


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