var settings= require('./config/keys');


exports.show500=function(req,resp,err){
    if (settings.httpMsgsFormat==="HTML"){
        resp.writeHead(500,"INternal Error occured",{"Content-Type":"text/html"});
        resp.write("<html><head><title>500</title></head><body>500:Internal Error. Details:"+err+"</body></html>");
   
    }
    else{
       resp.writeHead(500,"INternal Error occured",{"Content-Type":"application/json"});
       resp.write(JSON.stringify({data:"Error occured"+err}));
       
    }
    resp.end();
   };
   
   exports.sendJson=function(req,resp,data){
       resp.writeHead(200,{"Content-Type":"application/json"});
       if(data){
           
       resp.write(JSON.stringify(data.recordset));
       }
       resp.end();
   };
   exports.sendJson1=function(req,resp,data){
    if(data){
        
    resp.write(JSON.stringify(data.recordset));
    }
    resp.end();
};

   exports.show405=function(req,resp){
       if (settings.httpMsgsFormat==="HTML"){
           resp.writeHead(405,"Method not supported",{"Content-Type":"text/html"});
           resp.write("<html><head><title>405</title></head><body>405:Method not supported</body></html>");
      
       }
       else{
          resp.writeHead(405,"Method not supported",{"Content-Type":"application/json"});
          resp.write(JSON.stringify({data:"Method not supported"}));
          
       }
       resp.end();
      };
   
       exports.show404=function(req,resp){
       if (settings.httpMsgsFormat==="HTML"){
           resp.writeHead(404,"Resource not found",{"Content-Type":"text/html"});
           resp.write("<html><head><title>404</title></head><body>405:Resource not found</body></html>");
      
       }
       else{
          resp.writeHead(404,"Resource not found",{"Content-Type":"application/json"});
          resp.write(JSON.stringify({data:"Resource not found"}));
          
       }
       resp.end();
      };
   
   exports.showHome=function(req,resp){
       if (settings.httpMsgsFormat==="HTML"){
           resp.writeHead(200,{"Content-Type":"text/html"});
           resp.write("<html><head><title>Home</title></head><body>Valid endpoints:<br> /employees/<empno>- GET to search for an Employee</body></html>");
      
       }
       else{
          resp.writeHead(200,{"Content-Type":"application/json"});
          resp.write(JSON.stringify([
           {url:"/employee", operation:"GET",desciption:"To list all employees"},
           {url:"/employee/empno", operation:"GET",desciption:"To search an employee"}
       ]));
          
       }
       resp.end();
   }
   exports.send200=function(req,resp){
       resp.writeHead(200,{"Content-Type":"application/json"});
       resp.end();
   };