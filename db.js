var sqlDb=require("mssql");
const key =require('./config/keys');

exports.executeSql=function(sql,callback){
 var conn =new sqlDb.ConnectionPool(key.dbConfig);
 conn.connect().
 then(function(){
 var req= new sqlDb.Request(conn);
 req.query(sql)
 .then(function(recordset){
     callback(recordset);
      })
     .catch(function(err){
        console.log(err);
        callback(null,err);
 });
 })
 .catch(function(err){
  console.log(err);
  callback(null,err);
 });
};