import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";
import {GetSellerProducts} from "../controllers/product.controller.js "
const ProductRouter = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 5 * 1024 * 1024 
    }, 
});



 
ProductRouter.post("/", authenticateSeller, createProductValidator ,  upload.array("images", 7 )   , createProduct);

ProductRouter.get("/seller", authenticateSeller , GetSellerProducts)

export default ProductRouter