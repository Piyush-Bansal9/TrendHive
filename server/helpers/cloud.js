import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"
import dotenv from 'dotenv';
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const storage = new multer.memoryStorage();

export async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })
    return result;
}

const upload = multer({storage});

export {upload, imageUploadUtils};
