import cartModel from "../models/cart.model.js";

import productModel from "../models/product.model.js";  

export const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    const product =  await productModel.findOne({ _id: productId , "variants._id": variantId    });
    if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
    }
    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id, items: [] }))

    const isProductAlreadyInCart = cart.items.some(item => item.productId.toString() === productId && item.variant.toString() === variantId);

    if (isProductAlreadyInCart) {
        return res.status(400).json({ message: "Product already in cart", success: false });
    }

    cart.items.push({ productId, variantId, quantity });
    await cart.save();


}