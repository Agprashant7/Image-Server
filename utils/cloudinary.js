var cloudinaryObject=require( "cloudinary");
var CloudinaryStorage=require( "multer-storage-cloudinary");
var dotenv=require( "dotenv");

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinaryObject.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
const cloudinary = cloudinaryObject;

module.exports=cloudinary
// export const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (request, file) => {
//     return {
//       folder: "unsplash",
//       allowedFormats: ["png", "jpeg", "jpg"],
//     };
//   },
// });