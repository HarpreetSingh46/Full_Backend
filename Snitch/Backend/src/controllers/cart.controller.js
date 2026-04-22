import cartModel from "../models/cart.model.js";

import productModel from "../models/product.model.js";  
import { stockOfVariant } from "../dao/product.dao.js";
export const addToCart = async (req, res) => {
    console.log("addToCart called with body:", req.body);
    try {
        const userId = req.user?._id;
        if (!userId) {
            console.error("User ID not found in request");
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const { productId, variantId, quantity = 1 } = req.body;
        
        if (!productId || !variantId) {
            console.error("Missing productId or variantId:", { productId, variantId });
            return res.status(400).json({ message: "Product or variant missing", success: false });
        }

        // 1. Find product and verify variant existence
        const product = await productModel.findOne({ _id: productId, "variants._id": variantId });
        if (!product) {
            console.error("Product or variant not found in DB:", { productId, variantId });
            return res.status(404).json({ message: "Product or variant not found", success: false });
        }

        // Get the specific variant to check stock and price
        const variant = product.variants.id(variantId);
        if (!variant) {
            console.error("Variant subdocument not found:", variantId);
            return res.status(404).json({ message: "Variant not found", success: false });
        }

        const stock = variant.stock;

        // 2. Find or create cart
        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = await cartModel.create({ user: userId, items: [] });
        }

        // 3. Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item =>
            item.productId?.toString() === productId &&
            item.variantId?.toString() === variantId
        );

        if (existingItemIndex > -1) {
            // Update existing item
            const existingItem = cart.items[existingItemIndex];
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > stock) {
                return res.status(400).json({
                    message: `Not enough stock. Available: ${stock}, already in cart: ${existingItem.quantity}`,
                    success: false
                });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item
            if (quantity > stock) {
                return res.status(400).json({
                    message: `Not enough stock available. Available: ${stock}`,
                    success: false
                });
            }

            cart.items.push({
                productId,
                variantId,
                quantity,
                price: variant.price
            });
        }

        await cart.save();

        // 4. Return populated cart
        const updatedCart = await cartModel.findById(cart._id).populate("items.productId");

        return res.status(200).json({
            message: existingItemIndex > -1 ? "Cart updated successfully" : "Product added to cart successfully",
            success: true,
            cart: updatedCart
        });
    } catch (error) {
        console.error("ADD TO CART ERROR:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


export const getCart = async (req, res) => {
    const user = req.user;
    let cart = await cartModel.findOne({ user: req.user._id }).populate("items.productId")
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id, items: [] });

    }
    return res.status(200).json({ 
        message: "Cart retrieved successfully", 
        success: true, 
        cart 
    });
}
