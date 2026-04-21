import {param, body,validationResult} from "express-validator";  

const validateRequests = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    next();
}

export const validateAddToCart = [
    body("productId").isMongoId().withMessage("Invalid product ID"),
    body("variantId").isMongoId().withMessage("Invalid variant ID"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validateRequests
]
