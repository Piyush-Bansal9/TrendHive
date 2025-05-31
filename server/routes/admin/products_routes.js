import express from "express";
import { imageHandler } from "../../controllers/admin/products_controller.js";
import { upload } from "../../helpers/cloudinary.js";
const router = express.Router();

router.post("upload-image", upload.single("my_file"), imageHandler)

export default router;