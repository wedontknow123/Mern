const express = require('express');
const router =express.Router();
const call= require('./calling');
const fileUpload=require('express-fileupload');
const app=express();
app.use(fileUpload());
var a='';
router.post('/upload',(req,res)=>{
    call.get9(req2,res2,function(data){
        a=data;
        if(req.files===null){
            return res.status(400).json({msg:'No file uploaded'});
        }
        const file=req.files.file;

        file.mv(`${a}/${file.name}`,err=>{
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            res.json({fileName:file.name,filePath:`/uploads/${file.name}`});
        })
    });
})
module.exports=router;