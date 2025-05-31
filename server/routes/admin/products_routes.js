import express from "express";
import { imageHandler, addProduct, getAllProducts, editProduct, deleteProduct} from "../../controllers/admin/products_controller.js";
import { upload } from "../../helpers/cloudinary.js";
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), imageHandler)
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", getAllProducts);
export default router;