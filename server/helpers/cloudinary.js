import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"
import dotenv from 'dotenv';
dotenv.config()

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    });
    return result;
}

const upload = multer({storage});

export {upload, imageUploadUtil};
