const fs = require('fs')
const path=require('path');
let dbConfig1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, "D:\SQL.json")));

exports.dbConfig=dbConfig1;
exports.httpMsgsFormat="HTML";
exports.webPort=5000;