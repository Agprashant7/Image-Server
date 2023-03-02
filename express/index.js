import express from 'express'
import fs from 'fs';
import cors from 'cors';
import serverless from 'serverless-http';
import {upload} from '../utils/multer'
import { cloudinary } from '../utils/cloudinary.js';


var app = express();
var f=fs.promises

const router = express.Router();
 
  var upload = multer({ storage : storage}).single('file');  
router.get('/', function(req, res){
  res.write('<h1>Hello from Express.js!</h1>');
});
 
app.use(express.static('public'));
app.use(cors());
app.use('/.netlify/functions/index', router);

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

module.exports = app;
module.exports.handler = serverless(app);
