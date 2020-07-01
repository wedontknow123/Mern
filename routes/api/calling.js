var db =require("../../db");
var httpMsgs=require("../../httpMsgs");
var util= require("util");
exports.getList=function(req,resp){
db.executeSql("SELECT * FROM UserAccess_Header",function(data,err){
if(err){
 httpMsgs.show500(req,resp,err);
}
else{
 httpMsgs.sendJson(req,resp,data);
}
});
};
exports.get=function(req,resp,empno,callback){
    db.executeSql("SELECT SL_NO, Username, Email FROM [User] where SL_NO="+empno,function(data,err){
              
  
                if(err){
                  throw err;
                 }
               if(data){
                 return callback(data.recordset);
               }
               else{
                 return callback(null);
               }});
};
exports.get2=function(req,resp,email,callback){

  db.executeSql("SELECT SL_NO, Username, Email, Password FROM [User] where Email='"+email+"'",function(data,err){
      
    if(err){
       throw err;
      }
    if(data){
      return callback(data.recordset);
    }
    else{
      return callback(null);
    }
       });
};

exports.get3=function(req,resp,mod){
  db.executeSql("SELECT Screens from FS_Transactions where Module ='"+mod+"'",function(data,err){
    if(err){
      httpMsgs.show500(req,resp,err);
     }
     else{
      httpMsgs.sendJson(req,resp,data);
     }
  

  });
};

exports.get4=function(req,resp){
  db.executeSql("SELECT distinct Module from FS_Transactions",function(data,err){
    if(err){
      httpMsgs.show500(req,resp,err);
     }
     else{
      httpMsgs.sendJson1(req,resp,data);
     }
  });
};
exports.get5=function(req,res){
   db.executeSql("SELECT max (UserAccess_Headerkey) from UserAccess_Header",function(data,err){
    if(err){
      httpMsgs.show500(req,res,err);
     }
     else{
      httpMsgs.sendJson(req,res,data);
     }
   });
};
exports.get6=function(req,res,empid){
  db.executeSql("SELECT * FROM UserAccess_Header where Emp_ID ='"+empid+"'",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get7=function(req,res){
  db.executeSql("SELECT Emp_ID FROM UserAccess_Header where Status='draft'",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get8=function(req,res){
  db.executeSql("Select Document_Path from Org_details",function(data,err){
    if(err){
      httpMsgs.show500(req,res,err);
     }
     else{
      httpMsgs.sendJson(req,res,data);
     }
  });
};
exports.get9=function(req,res){
  db.executeSql("SELECT  A.Emp_ID FROM UserAccess_Header A where A.Status = 'approved' and A.Emp_ID not in (select B.Emp_ID from UserAccess_Header B where B.Status = 'inactive')",function(data,err){
    if(err){
      httpMsgs.show500(req,res,err);
     }
     else{
      httpMsgs.sendJson(req,res,data);
     }
  });
};

exports.add=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
        var sql="INSERT INTO UserAccess_Header(Trans_Type,Location,Reason,Emp_ID,Emp_Name,Emp_Designation,Emp_Department,Emp_Email,DOJ,Employee_Type,Software,Trans_Datetime,UserAccess_Headerkey,Status) VALUES";
        sql+= util.format("('%s','%s','%s','%d','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s')",data.Trans_Type,data.Location,data.Reason,data.Emp_ID,data.Emp_Name,data.Emp_Designation,data.Emp_Department,data.Emp_Email,data.DOJ,data.Employee_Type,data.Software,data.Trans_Datetime,data.UserAccess_Headerkey,data.Status);
        db.executeSql(sql,function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
             httpMsgs.send200(req,resp);
            }
            });
    }
    else{
         throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,resp,ex);
  }
};

exports.add2=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    
    if(data){
        var sql="INSERT INTO [User](Username,Email,Password) VALUES";
        sql+= util.format("('%s','%s','%s')",data.name,data.email,data.password);
        db.executeSql(sql,function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
            // httpMsgs.send200(req,resp);
            }
            });
    }
    else{
         throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,resp,ex);
  }
};

exports.add3=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    console.log(reqbody);
    var data = JSON.parse(reqbody);
    console.log(data);
    if(data){
        var sql="INSERT INTO UserAccess_Detail(Module,Screens,Trans_Datetime,UserAccess_Headerkey) VALUES";
        sql+= util.format("('%s','%s','%s','%d')",data.Module,data.Screens,data.Trans_Datetime,data.UserAccess_Headerkey);
        db.executeSql(sql,function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
             httpMsgs.send200(req,resp);
            }
            });
    }
    else{
         throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,resp,ex);
  }
};

exports.add4=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("UPDATE UserAccess_Header SET Location ='%s',Reason ='%s',Emp_Name ='%s',Emp_Designation ='%s',Emp_Department ='%s',Emp_Email ='%s',DOJ ='%s',Employee_Type ='%s',Software ='%s',Trans_Datetime ='%s',Status ='%s' WHERE Emp_ID ='%d'",data.Location,data.Reason,data.Emp_Name,data.Emp_Designation,data.Emp_Department,data.Emp_Email,data.DOJ,data.Employee_Type,data.Software,data.Trans_Datetime,data.Status,data.Emp_ID);
      db.executeSql(sql,function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
             httpMsgs.send200(req,resp);
            }
            });
    }
    else{
         throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,resp,ex);
  }
};
exports.add5=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("Insert into UserAccess_Header (Trans_Type,Reason,Trans_Datetime,UserAccess_Headerkey,Emp_ID,Status) Values('%s','%s','%s','%d','%d','%s')",data.Trans_Type,data.Reason,data.Trans_Datetime,data.UserAccess_Headerkey,data.Emp_ID,data.Status);
      db.executeSql(sql,function(data,err){
        if(err){ 
         httpMsgs.show500(req,resp,err);
        }
        else{
         httpMsgs.send200(req,resp);
        }
        });
}
else{
     throw new Error("Input not valid");
}
}
catch(ex){
httpMsgs.show500(req,resp,ex);
}
};
exports.login=function(req,resp,reqbody){
  try{
    var a;
    if(!reqbody ) throw new Error("Input not valid");
    var data=JSON.parse(reqbody);
    if(data){
      
       db.executeSql("SELECT Password FROM [User] WHERE User_ID="+util.format("('%s')",data.User_ID),function(dat,err){
        if(err){
         httpMsgs.show500(req,resp,err);
        }
        else{
         httpMsgs.sendJson(req,resp,dat);
         
        }
         a=dat.recordset[0].Password;
         console.log(a);
        });
    }else{
      throw new Error("Input not valid");
 }
 console.log(a);
//console.log(data.Password);
  if (a===data.Password){
    console.log("yes");
  }else{
    console.log("No");
  }
}
 catch(ex){
  httpMsgs.show500(req,resp,ex);
}
  };

exports.update =function(req,resp,reqbody){
    try{
        if(!reqbody) throw new Error("Input not valid");
        var data =JSON.parse(reqbody);
        if(data){
            if(!data.id)throw new Error("Empno not provided");

            var sql="UPDATE items SET ";

            var isDataProvided=false;
            if(data.name){
                sql+="name='"+data.name+"'";
                isDataProvided=true;
            }
            sql=sql.slice(0,-1);
            sql+=" WHERE id= " + data.id;
            
            db.executeSql(sql,function(data,err){
                if(err){
                 httpMsgs.show500(req,resp,err);
                }
                else{
                 httpMsgs.send200(req,resp);
                }
                });
        }
        else{
             throw new Error("Input not valid");
        }
      }
      catch(ex){
        httpMsgs.show500(req,resp,ex);
      }

};
exports.del2=function(req,res,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql="delete from UserAccess_Header where Status = 'draft' and Emp_ID="+data.Emp_ID;
      db.executeSql(sql,function(data,err){
        if(err){
          httpMsgs.show500(req,res,err);
        }
        else{
          httpMsgs.send200(req,res);
        }
      })
    }
    else{
      throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,res,ex);
  }
};

exports.del3=function(req,res,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql="delete from UserAccess_Detail where UserAccess_Headerkey = "+data.UserAccess_Headerkey;
      db.executeSql(sql,function(data,err){
        if(err){
          httpMsgs.show500(req,res,err);
        }
        else{
          httpMsgs.send200(req,res);
        }
      })
    }
    else{
      throw new Error("Input not valid");
    }
  }
  catch(ex){
    httpMsgs.show500(req,res,ex);
  }
};

exports.delete=function(req,resp,reqbody){
    try{
        if(!reqbody) throw new Error("Input not valid");
        var data =JSON.parse(reqbody);
        if(data){
            if(!data.id)throw new Error("Empno not provided");

            var sql="DELETE FROM items ";
            sql+=" WHERE id= " + data.id;
            
            db.executeSql(sql,function(data,err){
                if(err){
                 httpMsgs.show500(req,resp,err);
                }
                else{
                 httpMsgs.send200(req,resp);
                }
                });
        }
        else{
             throw new Error("Input not valid");
        }
      }
      catch(ex){
        httpMsgs.show500(req,resp,ex);
      }
};