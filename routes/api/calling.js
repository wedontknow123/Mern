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
  db.executeSql("SELECT * FROM UserAccess_Header where Emp_ID ='"+empid+"' ",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get7=function(req,res,useremail){ //,useremail
  db.executeSql("SELECT Emp_ID FROM UserAccess_Header where Status='draft' and Trans_Type = 'New User Creation' and User_Email ='"+useremail+"'  ",function(data,err){ //and User_Email ='"+useremail+"'
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get8=function(req,res,key){
  
  db.executeSql("SELECT * FROM UserAccess_Detail where UserAccess_Headerkey='"+key+"'",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get9=function(req,res,callback){
  db.executeSql("Select Top 1 Document_Path from Org_details",function(data,err){
    if(err){
      httpMsgs.show500(req,res,err);
     }
     if(data){
       return callback(data.recordset[0].Document_Path)
     }
     else{
       return callback(null);
     }
  });
};
exports.get10=function(req,res,useremail){
  db.executeSql("SELECT  A.Emp_ID FROM UserAccess_Header A where A.Status = 'sent for approval' and A.User_Email ='"+useremail+"' and A.Emp_ID not in (select B.Emp_ID from UserAccess_Header B where B.Status = 'inactive')",function(data,err){
    if(err){
      httpMsgs.show500(req,res,err);
     }
     else{
      httpMsgs.sendJson(req,res,data);
     }
  });
};

exports.get11=function(req,res,useremail ){//,useremail  //and A.User_Email ='"+useremail+"'
  db.executeSql("SELECT  A.Emp_ID FROM UserAccess_Header A where A.Status = 'sent for approval' and A.Trans_Type = 'New User Creation' and A.User_Email ='"+useremail+"' ",function(data,err){//A.Emp_ID not in (select B.Emp_ID from UserAccess_Header B where B.Trans_Type = 'Changes Required'
    if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};

exports.get12=function(req,res,empid){
  db.executeSql("SELECT * FROM UserAccess_Header where Emp_ID ='"+empid+"' and Trans_Type = 'New User Creation'",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.getdepartment=function(req,res){
  db.executeSql("Select distinct Department from Approval_Master",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.checkITorNot=function(req,resp,reqbody,callback){

  db.executeSql("Select IT_Notification from Org_details where IT_Notification='"+reqbody.Approver_Email+"'",function(data,err){
      
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

exports.checkITorNot2=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
      db.executeSql("Select IT_Notification from Org_details where IT_Notification='"+data.Approver_Email+"'",function(data,err){
        if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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
exports.get_to_display=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("SELECT * from UserAccess_Header where Emp_ID='"+data.Emp_ID+"' and UserAccess_Headerkey='"+data.UserAccess_Headerkey+"'",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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

exports.getapmaster=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    console.log(reqbody);
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("SELECT TOP 1 A.* from Approval_Master A where A.Department ='"+data.Department+"' and A.Email not in (SELECT B.Approver_Email from Email_Workflow B where B.Status ='A' and B.UserAccess_Headerkey='"+data.UserAccess_Headerkey+"') and A.Email not in (Select D.Email from Approval_Master D where D.Approval_ID <= (Select E.Approval_ID from Approval_Master E where E.Email=(Select C.User_Email from UserAccess_Header C where C.UserAccess_Headerkey='"+data.UserAccess_Headerkey+"') and E.Department='"+data.Department+"')) ",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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

exports.getpending_requests=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("SELECT Emp_ID,UserAccess_Headerkey from Email_Workflow where Approver_Email='"+data.Approver_Email+"' and (Status is null or Status ='')",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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

exports.getapprovedby=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("SELECT Approver_Name,Trans_Datetime FROM Email_Workflow where UserAccess_Headerkey = '"+data.UserAccess_Headerkey+"' and (Status='A' or Status='AF')",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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

exports.getpending_requests_IT=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("Select A.Emp_ID,A.UserAccess_Headerkey from Email_Workflow A where A.Status='AF' AND A.Emp_ID not in (Select B.Emp_ID from User_Credentials B) ",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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
exports.getrejected_emp_id=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    var data = JSON.parse(reqbody);
    if(data){
            db.executeSql("Select distinct A.Emp_ID,A.UserAccess_Headerkey,B.Reasons from UserAccess_Header A inner join Email_Workflow B on A.UserAccess_Headerkey=B.UserAccess_Headerkey where A.User_Email='"+data.User_Email+"' and B.Status='R'",function(data,err){
            if(err){ 
             httpMsgs.show500(req,resp,err);
            }
            else{
              httpMsgs.sendJson(req,resp,data);
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
//db.executeSql("update Email_Workflow set Status='RA' where Status ='R' and Approver_Email='"+data.Approver_Email+"' and UserAccess_Headerkey='"+data.UserAccess_Headerkey+"'",function(data,err){
  exports.changePreviousRejected=function(req,resp,reqbody){
    try{
      if(!reqbody) throw new Error("Input not valid");
      
      var data = JSON.parse(reqbody);
      if(data){
        var sql=util.format("update Email_Workflow set Status ='RA' where UserAccess_Headerkey='%d' and Approver_Email='%s' and Status='RIP'",data.UserAccess_Headerkey,data.Approver_Email);
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
  exports.changeRejectedStatus=function(req,resp,reqbody){
    try{
      if(!reqbody) throw new Error("Input not valid");
      
      var data = JSON.parse(reqbody);
      if(data){
        var sql=util.format("update Email_Workflow set Status ='RIP' where UserAccess_Headerkey='%d' and Approver_Email='%s' and Status='R'",data.UserAccess_Headerkey,data.Approver_Email);
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
exports.finalApprover=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("update Email_Workflow set Status ='AF' where UserAccess_Headerkey='%d' and Approver_Email='%s' and Status='A'",data.UserAccess_Headerkey,data.Approver_Email);
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
exports.get13=function(req,res,key,callback){//,useremail  //and A.User_Email ='"+useremail+"'
  db.executeSql("SELECT  Document_Name FROM User_Document where UserAccess_Headerkey = '"+key+"' ",function(data,err){//A.Emp_ID not in (select B.Emp_ID from UserAccess_Header B where B.Trans_Type = 'Changes Required'
    if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
      if(data){
        return callback(data)
      }
      else{
        return callback(null);
      }
    }
  });
};

exports.get14=function(req,res,key){
  db.executeSql("SELECT  Document_Name FROM User_Document where UserAccess_Headerkey = '"+key+"' ",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};

exports.get15=function(req,res){
  db.executeSql("Select Document_Path from Org_details",function(data,err){
   if(err){
     httpMsgs.show500(req,res,err);
    }
    else{
     httpMsgs.sendJson(req,res,data);
    }
  });
};
exports.get16=function(req,res,eid,hkey){
  db.executeSql("SELECT * FROM UserAccess_Header where Emp_ID ='"+eid+"' and UserAccess_Headerkey = '"+hkey+"' ",function(data,err){
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
        var sql="INSERT INTO UserAccess_Header(Trans_Type,Location,Reason,Emp_ID,Emp_Name,Emp_Designation,Emp_Department,Emp_Email,DOJ,Employee_Type,Software,Trans_Datetime,UserAccess_Headerkey,Status,User_Email) VALUES";
        sql+= util.format("('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s','%s')",data.Trans_Type,data.Location,data.Reason,data.Emp_ID,data.Emp_Name,data.Emp_Designation,data.Emp_Department,data.Emp_Email,data.DOJ,data.Employee_Type,data.Software,data.Trans_Datetime,data.UserAccess_Headerkey,data.Status,data.User_Email);
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
        var sql="INSERT INTO UserAccess_Detail(Emp_ID,Module,Screens,Trans_Datetime,UserAccess_Headerkey) VALUES";
        sql+= util.format("('%s','%s','%s','%s','%d')",data.Emp_ID,data.Module,data.Screens,data.Trans_Datetime,data.UserAccess_Headerkey);
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
      var sql=util.format("UPDATE UserAccess_Header SET Location ='%s',Reason ='%s',Emp_Name ='%s',Emp_Designation ='%s',Emp_Department ='%s',Emp_Email ='%s',DOJ ='%s',Employee_Type ='%s',Software ='%s',Trans_Datetime ='%s',Status ='%s' WHERE Emp_ID ='%s'",data.Location,data.Reason,data.Emp_Name,data.Emp_Designation,data.Emp_Department,data.Emp_Email,data.DOJ,data.Employee_Type,data.Software,data.Trans_Datetime,data.Status,data.Emp_ID);
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

exports.upstat=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("UPDATE UserAccess_Header SET Status ='%s' WHERE Emp_ID ='%s' and UserAccess_Headerkey ='%d'",data.sa,data.id,data.key);
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

exports.add7=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("UPDATE User_Document SET UserAccess_Headerkey ='%d' WHERE UserAccess_Headerkey ='%d'",data.key,data.okey);
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
      var sql=util.format("Insert into UserAccess_Header (Trans_Type,Reason,Trans_Datetime,UserAccess_Headerkey,Emp_ID,Status,User_Email) Values('%s','%s','%s','%d','%s','%s','%s')",data.Trans_Type,data.reason,data.Trans_Datetime,data.UserAccess_Headerkey,data.Emp_ID,data.Status,data.User_Email);
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
exports.add6=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("Insert into User_Document (UserAccess_Headerkey,Emp_ID,Document_Name,Trans_Datetime) Values('%d','%s','%s','%s')",data.UserAccess_Headerkey,data.Emp_ID,data.Document_Name,data.Trans_Datetime);
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
exports.addapmaster=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      //var sql=util.format("Insert into Email_Workflow (Emp_ID) Values('%d')",data.Emp_ID);

        var sql=util.format("Insert into Email_Workflow (Emp_ID,UserAccess_Headerkey,Approver_Name,Approver_Email) Values('%s','%d','%s','%s')",data.Emp_ID,data.UserAccess_Headerkey,data.Approver_Name,data.Approver_Email);
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
}
exports.itcredentials=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){

        var sql=util.format("insert into User_Credentials (Emp_ID,UserAccess_Headerkey,FS_SS_UserID,Created_by,Created_on,Remarks,Trans_Datetime) values ('%s','%d','%s','%s','%s','%s','%s') ",data.Emp_ID,data.UserAccess_Headerkey,data.FS_SS_UserID,data.Created_by,data.Created_on,data.Remarks,data.Trans_Datetime);
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
exports.addapmaster2=function(req,resp,reqbody){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var data = JSON.parse(reqbody);
    if(data){
      var sql=util.format("UPDATE Email_Workflow SET Status ='%s',Reasons ='%s', Trans_Datetime='%s' where UserAccess_Headerkey='%d' and Approver_Email='%s' and Emp_ID='%s' and (Status is null or Status ='')",data.Status,data.Reason,data.Trans_Datetime,data.UserAccess_Headerkey,data.Approver_Email,data.Emp_ID);
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
      var sql="delete from UserAccess_Header where Status = 'draft' and Emp_ID='"+data.Emp_ID+"'";
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

exports.del4=function(req,res,reqbody,fname){
  try{
    if(!reqbody) throw new Error("Input not valid");
    
    var key = JSON.parse(reqbody);
    var fn = JSON.parse(fname);
    if(key&&fn){
      var sql=util.format("delete from User_Document where UserAccess_Headerkey ='%d' and Document_Name ='%s'",key,fn) ;
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