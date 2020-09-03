const express = require('express');
const router =express.Router();
const call= require('./calling');

router.post('/emp',(req,res)=>{    
    const eid= req.body.eid;
    const hkey= req.body.hkey;
    call.get16(req,res,eid,hkey);
})
router.post('/',(req,res)=>{
    call.getapmaster(req,res,JSON.stringify(req.body))
})
router.post('/submit',(req,res)=>{
    call.addapmaster(req,res,JSON.stringify(req.body))
})
router.post('/approval',(req,res)=>{
    call.addapmaster2(req,res,JSON.stringify(req.body))
})
router.post('/pending',(req,res)=>{
    call.checkITorNot(req,res,req.body,function(data){
      if(data.length>0){
        call.getpending_requests_IT(req,res,JSON.stringify(req.body))
      }
      else{
        call.getpending_requests(req,res,JSON.stringify(req.body))
      }
    })

})
router.post('/finalApprover',(req,res)=>{
    call.finalApprover(res,res,JSON.stringify(req.body));
})
router.post('/display',(req,res)=>{
    call.get_to_display(req,res,JSON.stringify(req.body))
})
router.post('/rejected',(req,res)=>{
    call.getrejected_emp_id(req,res,JSON.stringify(req.body))
})
router.post('/checkingIT',(req,res)=>{
    console.log(req.body);
    call.checkITorNot2(req,res,JSON.stringify(req.body))
})
router.post('/previous',(req,res)=>{
    call.changePreviousRejected(req,res,JSON.stringify(req.body))
})
router.post('/itcred',(req,res)=>{
    call.itcredentials(req,res,JSON.stringify(req.body))
})
module.exports=router;
