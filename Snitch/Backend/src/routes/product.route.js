import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";

const ProductRouter = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 5 * 1024 * 1024 
    }, 
});

 
ProductRouter.post("/", authenticateSeller, upload.array("images", 7 )   , createProduct);


export default ProductRouter