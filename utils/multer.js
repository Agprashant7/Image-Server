import multer from "multer";
var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploadFiles');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
const upload = multer({ storage : storage}).single('file');  
export default upload