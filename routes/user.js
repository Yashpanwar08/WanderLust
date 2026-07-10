const express = require("express");
const passport = require("passport");

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/user");

// =======================
// Signup
// =======================
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signUp));

// =======================
// Login
// =======================
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

// =======================
// Logout
// =======================
router.get("/logout", userController.logout);

module.exports = router;