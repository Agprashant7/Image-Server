var client=require( "https");
var bodyParser = require('body-parser');
var express = require('express');
var multer = require('multer');
var app = express();
var fs=require('fs').promises
const serverless = require('serverless-http');
const cors = require("cors");

var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploadFiles');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('file');  
app.get('/', function(req, res){
   res.render('form');
});
 
app.use(express.static('public'));
app.use(cors());


  app.get(
    "/fetch-file",
    async (request, response) => {
        var filePath=`${__dirname}\\uploadFiles\\${request.query.filename}`
        var data = await fs.readFile(filePath,(err,data)=>{
              if(err){
                console.error("err",err)
              }
                console.log("data",data);
              });
            //   return data
            response.writeHead(200, {'Content-Type': 'image/jpeg'})
            var base64=Buffer.from(data).toString('base64')
            base64='data:image/png;base64,'+base64;
            response.end(base64)
          } 

    
  );
app.post('/upload-single-file', function(req, res){
   upload(req,res,function(err) {  
    
    if(err) {  
        return res.end("Error uploading file.");  
    }  
    else if(req.body||req.file){
        var filePath=`uploadFiles/${req.file.originalname}`
        // var co=Buffer.from( __dirname+'/'+filePath,'binary')
      //  res.sendFile( __dirname+'/'+filePath);
       res.send(req.file.originalname);  
       
        // var file = fs.readFile(filePath, "binary");
        // res.setHeader('Content-Length', stat.size);
        // res.setHeader('Content-Type', 'jpeg/png');
        // res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
        // res.write(file, binary);
       
    }
    else{
        res.end("NO Try Again");  
    }
    //
});
});
// app.listen(3001, () => {
//     console.log(`app starting at port 3001`);
//   });

  module.exports = app;
module.exports.handler = serverless(app);
