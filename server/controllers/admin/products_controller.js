import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

const imageHandler = async (req, res) => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured."
        })
    }
}

const addProduct = async(req, res) => {
    try{
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const newlyAddedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await newlyAddedProduct.save();
        res.status(201).json({
            success: true,
            message: ""
        })
    }catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: newlyAddedProduct
        })
    }
}

const getAllProducts = async(req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            succes: true,
            data: listOfProducts
        })
    } catch(e) {
        console.log(e);
        res.status(500).json({
            succes: false,
            message: "Error occured."
        })
    }
}

const editProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const foundProduct = await Product.findById(id);
        if(!foundProduct) {
            return res.status(404).json({
                succes: false,
                message: "Product not found."
            })
        }
        foundProduct.title = title || foundProduct.title;
        foundProduct.description = description || foundProduct.description;
        foundProduct.category = category || foundProduct.category;
        foundProduct.brand = brand || foundProduct.brand;
        foundProduct.price = price || foundProduct.price;
        foundProduct.salePrice = salePrice || foundProduct.salePrice;
        foundProduct.totalStock = totalStock || foundProduct.totalStock;
        foundProduct.image = image || foundProduct.image;
        await foundProduct.save();
        res.status(200).json({
            succes: true,
            data: foundProduct
        })
    } catch(e) {
        console.log(e);
        res.status(500).json({
            succes: false,
            message: "Error occured."
        })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const foundProduct = await Product.findByIdAndDelete(id);
        if(!foundProduct) {
            return res.status(404).json({
                succes: false,
                message: "Product not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "Product delete successfully",
        })
    } catch(e) {
        console.log(e);
        res.status(500).json({
            succes: false,
            message: "Error occured."
        })
    }
}

export { imageHandler, addProduct, getAllProducts, editProduct, deleteProduct }

