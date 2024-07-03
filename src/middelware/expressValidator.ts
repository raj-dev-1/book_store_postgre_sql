import { body, check } from "express-validator";

const registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("Name must be between 3 and 10 characters long"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  }),
  check("gender").notEmpty().withMessage("Gender is required"),
  check("interest")
    .notEmpty()
    .withMessage("Interest is required")
    .isArray({ min: 1 })
    .withMessage("Interest must be an array with at least one element")
    .custom((value) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
            throw new Error('Interest must be an array with at least one element');
        }
        return true;
    }),
];

const loginValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("Password is required"),
];

export { registerValidator, loginValidator };
