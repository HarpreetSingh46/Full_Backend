import { body, validationResult } from 'express-validator';



export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};
// Validation rules for user registration
export const registerValidationRules = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .isLength({ max: 30 })
      .withMessage('Username cannot exceed 30 characters')
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Username can only contain letters, numbers, underscores, and hyphens')
      .custom(async (value) => {
        // Check if username already exists
        const User = (await import('../models/user.model.js')).default;
        const existingUser = await User.findOne({ username: value });
        if (existingUser) {
          throw new Error('Username already in use');
        }
      }),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail()
      .custom(async (value) => {
        // Check if email already exists
        const User = (await import('../models/user.model.js')).default;
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error('Email already registered');
        }
      }),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .isLength({ max: 50 })
      .withMessage('Password cannot exceed 50 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    body('confirmPassword')
      .notEmpty()
      .withMessage('Please confirm your password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ];
};

// Validation rules for login
export const loginValidationRules = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email'),

    body('password')
      .notEmpty()
      .withMessage('Password is required'),
      
      
      validate
  ];
};


// Middleware to handle validation errors

