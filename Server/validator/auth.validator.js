const {body}=require("express-validator");
const {validate}=require("../middleware/validator.middleware");

const signUpValidator = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password").isStrongPassword().withMessage("make strong password."),
  validate,
];
const signInValidator = [
    body("email").isEmail(),
    body("password").notEmpty(),
    validate,
];

module.exports={
    signInValidator,
    signUpValidator
}
