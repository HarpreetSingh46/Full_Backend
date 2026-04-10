import { body,validationResult  } from 'express-validator';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const  validateRegister = [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").isLength({ min: 10, max: 15 }).withMessage("Invalid contact number").notEmpty().withMessage("Contact number is required"),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean value").notEmpty().withMessage("isSeller must be a boolean value"),
    validateRequest
];

