

// import multer from 'multer'
// import path from 'path'

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// // File filter 
// const fileFilter = (req, file, cb) => {
//   cb(null, true)
// }

// const upload = multer({ storage, fileFilter })

// export default upload


import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cheel-task-manager',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
})

const upload = multer({ storage })

export default upload