const express = require('express');
const db= require('./db');
const bodyParser= require('body-parser');
const path=require('path');
var cors=require('cors');
const items =require('./routes/api/items');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/items',require('./routes/api/items'));
app.use('/api/users',require('./routes/api/Users'));
app.use('/api/auth',require('./routes/api/auth'));
app.get('/',function(req,res){
    res.send('hello');
})
app.get('/api',function(req,res){
    res.send('hello123');
})
//app.use('/api/screens',require('./routes/api/screens'));
app.use('/api/screens_test',require('./routes/api/screens_test'));
app.use('/api/apmaster',require('./routes/api/Approval_master'));
app.use('/api/draft',require('./routes/api/draft'));
app.use('/api/doc/rec',require('./routes/api/docfile_rec'));
app.use('/api/doc',require('./routes/api/docfiles'));
app.use('/api/download',require('./routes/api/downloadfile'))
app.use('/api/screens_test_d',require('./routes/api/screens_test_d'));

app.use('/api/changes_required',require('./routes/api/changes_required'));
app.use('/api/changes_screen',require('./routes/api/changes_screen'));
app.use('/api/deactivate',require('./routes/api/deactivate'));
app.use('/api/status',require('./routes/api/status'));
require("./routes/api/items");

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server started on port ${port}`));