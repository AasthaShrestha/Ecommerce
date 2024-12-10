const express = require("express");
const router = express.Router();
const {signUp, signIn } = require("../controllers/auth.controller");

const {
    signUpValidator,
    signInValidator,
}=require("../validator/auth.validator")

router.post("/sign-up",signUpValidator,signUp);
router.post("/sign-in", signInValidator, signIn);

module.exports = router;
