import cartModel from "../models/cart.model.js";

import productModel from "../models/product.model.js";  
import { stockOfVariant } from "../dao/product.dao.js";
export const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;
    const product =  await productModel.findOne({ _id: productId , "variants._id": variantId    });
    if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
    }
    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id, items: [] }))
    const stock = await stockOfVariant(productId, variantId);

    const isProductAlreadyInCart = cart.items.some(item => item.productId.toString() === productId && item.variant.toString() === variantId);

    if (isProductAlreadyInCart) {

           const quantityInCart = cart.items.find(item => item.productId.toString() === productId && item.variant.toString() === variantId).quantity;
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({ message: "Not enough stock available", success: false });
        }
        await cartModel.findOneAndUpdate(
            { user: userId, "items.productId": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        return res.status(200).json({
             message: "Cart updated successfully", success: true
             });   
    
            }

if (quantity > stock) {
        return res.status(400).json({ 
            message: `Not  ${stock} enough stock available`, 
            success: false 
        });
    }
cart.items.push({
    
    product :productId, 
    
    variant: variantId,
    quantity,
    prict: product.price
    
    });
await cart.save();
return res.status(200).json({ 
    message: "Product added to cart successfully", 
    success: true
 });  


}

export const getCart = async (req, res) => {
    const user = req.user;
    let cart = await cartModel.findOne({ user: req.user._id }).populate("items.product")
    if (!cart) {
        cart = await cartModel.create({ user: req.user._id, items: [] });

    }
    return res.status(200).json({ 
        message: "Cart retrieved successfully", 
        success: true, 
        cart 
    });
}
