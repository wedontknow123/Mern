<<<<<<< HEAD
exports.dbConfig={
    server:"LAPTOP-P4D7V446\\SQLEXPRESS",
    database:"INTERNSHIP",
    user:"sourish",
    password:"sourish@123",
    port:1433
};
=======
const fs = require('fs')
const path=require('path');
let dbConfig1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, "D:\SQL.json")));

exports.dbConfig=dbConfig1;
>>>>>>> b2bb32348dbc13620fc7e7464f0ca516db2bcacc
exports.httpMsgsFormat="HTML";
exports.webPort=5000;