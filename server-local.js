
import express from 'express'
import fs from 'fs';
import cors from 'cors';
import {upload} from './utils/multer.js'
import { cloudinary } from './utils/cloudinary.js';

var app = express();
var f=fs.promises

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.get('/', function(req, res){
   res.render('form');
});
 
app.use(express.static('public'));
app.use(cors(corsOptions));

app.post('/upload-single-file',  function(req, res){
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
app.listen(3001, () => {
    console.log(`app starting at port 3001`);
  });

