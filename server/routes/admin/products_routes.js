import express from "express";
import { upload } from "../../helpers/cloud";
import { handleImageUpload } from "../../controllers/admin/products.controller";
const router = express.Router;

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

export default router;