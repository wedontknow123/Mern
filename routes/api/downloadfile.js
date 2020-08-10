const express = require('express');
const router =express.Router();
const app=express();
const call= require('./calling');
const path= require('path')
var fs = require('fs');
var a=""
var filename = []

app.post('/fn',(req,res)=>{ //post
    
    const key= req.body.key;
    call.get14(req,res,key);//,useremail
})

app.get('/fp',(req,res)=>{
    call.get15(req,res);
});

app.post('/',(req,res)=>{//get
    
    filename = req.body.fname
    filepath= req.body.fpath
    var file = path.join(filepath,filename)  //path.join
   
    res.download(file, (err)=>{ console.log(err) })
    
    console.log(filename)
    console.log(filepath) 
    console.log(file)        
})

app.post('/del',(req,res)=>{    
    filename = req.body.fname
    filepath= req.body.fpath
    var file = path.join(filepath,filename) 
    //if(req.body.hkey present in the files document, then do the below shit) 
    fs.unlink(file, function (err) {
        if (err) throw err;        
        console.log('File deleted!');
    });
    call.del4(req,res,JSON.stringify(req.body.hkey),JSON.stringify(req.body.fname))
})


module.exports=app;