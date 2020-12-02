var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", [
    check("name", "name must be at least 3 chars long").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password must be at least 3 chars long").isLength({ min: 3 })
], signup);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 1 })
], signin);

router.get("/signout", signout);


module.exports = router;