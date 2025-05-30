import { imageUploadUtils } from "../../helpers/cloud.js";

export const handleImageUpload = async (req, res) => {
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);

        res.status(200).json({
            success: true,
            result
        })
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Error occured."
        })
    }
}