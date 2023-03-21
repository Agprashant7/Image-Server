
var express= require('express')
var fs =require( 'fs');
var cors = require('cors');
var upload =require( './utils/multer.js')
var cloudinary =require( './utils/cloudinary.js');
var serverless = require('serverless-http');
var bodyParser = require('body-parser');

var app = express();


const router = express.Router();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

router.get('/', function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/test', function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});


  router.post('/upload-single-file', function(req, res){
    upload(req,res,async function(err) {  
    
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      else if(req.body||req.file){
          // var filePath=`uploadFiles/${req.file.originalname}`
          const localFilePath = req.file?.path || "";
          const cloudinaryImageUploadResponseData=await cloudinary.uploader.upload(
              localFilePath,
              {
              public_id: process.env.CLOUDINARY_FOLDER_NAME,
              }
            );
          console.log(cloudinaryImageUploadResponseData);
          const { url } = cloudinaryImageUploadResponseData;
          res.send(url);  
      }
      else{
          res.end("NO Try Again");  
      }
  });
  
});
app.use(bodyParser.json());
app.use('/.netlify/functions/index', router);
app.use(cors(corsOptions));
module.exports = app;
module.exports.handler = serverless(app);
