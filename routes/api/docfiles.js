const express = require('express');
const call= require('./calling');
const app=express();
var multer=require('multer');
var cors=require('cors');
var a="";
app.use(cors())

app.post('/',function(req,res){
    call.get9(req,res,function(data){
        a=data;
        console.log(a)
     
    multer({storage:multer.diskStorage(         
        {
            destination:function(req,file,cb){
                cb(null,a)
            },
            filename:function(req,file,cb){
                cb(null,Date.now()+"-"+file.originalname)
            }        
        }
        )}).array('file')(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(503).json(err)
            }
            else if(err){
                res.status(503).json(err)
                console.log(err)
            }
            var arr=[];
            for(var x=0;x<req.files.length;x++){
            arr[x]=req.files[x].filename
        } 
        console.log(arr);
        return res.status(200).send(arr) 
        })

})
})

app.post('/update',function(req,res){
    var reqbody=JSON.stringify(req.body);
    //console.log(reqbody);
    call.add7(req,res,reqbody);
})
console.log(a)
module.exports=app;

