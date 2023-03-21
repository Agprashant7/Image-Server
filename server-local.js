
var express= require('express')
var fs =require( 'fs');
var cors = require('cors');
var upload =require('./utils/multer.js');
var cloudinary =require( './utils/cloudinary.js');
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
app.get('/test', function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
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

