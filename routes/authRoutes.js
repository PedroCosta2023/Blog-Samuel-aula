const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const { validateEmail, validateName, validatePassword, validateEmailExists } = require("../services/validators");

router.post('/signup',[validateEmail, validateName, validatePassword, validateEmailExists], auth.signUpUser);
router.post('/signin',[validateEmail, validatePassword], auth.signInUser);




module.exports = router;
