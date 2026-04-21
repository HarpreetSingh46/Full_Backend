import express from "express";
const router = express.Router();
import { authenticateUser } from '../middleware/auth.middleware.js'; 
import { validateAddToCart } from "../validators/cart.validator.js";  
import { addToCart, getCart } from "../controllers/cart.controller.js";



const Cartrouter = express.Router();

Cartrouter.post("/add/:productId/:variantId",authenticateUser, validateAddToCart,addToCart)
Cartrouter.get("/",authenticateUser,getCart)
export default Cartrouter;