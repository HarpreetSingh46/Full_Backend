import cartModel from "../models/cart.model.js";

import productModel from "../models/product.model.js";  
import { stockOfVariant } from "../dao/product.dao.js";
export const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, variantId ,quantity = 1 } = req.body;
    
    const product =  await productModel.findOne({ _id: productId , "variants._id": variantId    });
    if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
    }
    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id, items: [] }))
    const stock = await stockOfVariant(productId, variantId);
const existingItem = cart.items.find(item => 
  item.productId?.toString() === productId && 
  item.variantId?.toString() === variantId
);

if (existingItem) {
    const updatedCart = await cartModel.findOneAndUpdate(
  { user: userId, "items.productId": productId, "items.variantId": variantId },
  { $inc: { "items.$.quantity": quantity } },
  { new: true }
);
    const quantityInCart = existingItem.quantity || 0;

    if (quantityInCart + quantity > stock) {
        return res.status(400).json({ 
            message: "Not enough stock available", 
            success: false 
        });
    }

    await cartModel.findOneAndUpdate(
        { user: userId, "items.productId": productId, "items.variantId": variantId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true }
    );

    return res.status(200).json({
        message: "Cart updated successfully",
        success: true
    });
}
if (quantity > stock) {
        return res.status(400).json({ 
            message: `Not  ${stock} enough stock available`, 
            success: false 
        });
    }
    const variant = product.variants.id(variantId);
cart.items.push({
    productId: productId,
    variantId: variantId,
    quantity: quantity,
    price: variant?.price || product.price,
});
await cart.save();
return res.status(200).json({ 
    message: "Product added to cart successfully", 
    success: true,
    cart: updatedCart,
 });  


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
