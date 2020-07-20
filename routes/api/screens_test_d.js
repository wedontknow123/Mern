const express = require('express');
const router =express.Router();
const call= require('./calling');


// router.get('/empid',(req,res)=>{
//     //var reqbody=JSON.stringify(req.body);
//     call.get7(req,res);
// })

// router.post('/hkey',(req,res)=>{
//     const empid= req.body.empid;
//     const useremail= req.body.empid;
//     call.get6(req,res,empid,useremail);
// })

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

router.post('/del',(req,res)=>{
    
    call.del3(req,res,JSON.stringify(req.body));
})


router.post('/save',(req,res)=>{
    
    //call.del3(req,res,JSON.stringify(req.body));
    call.add3(req,res,JSON.stringify(req.body));   
})

module.exports=router;

//inside /save, i have to do a "delete the rows" query too