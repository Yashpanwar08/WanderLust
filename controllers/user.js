const User = require("../models/user");

// =======================
// Render Signup
// =======================
module.exports.renderSignupForm = (req, res) => {
    res.render("user/signup");
};

// =======================
// Signup
// =======================
module.exports.signUp = async (req, res, next) => {
    console.log("1. Signup started");

    try {
        const { username, email, password } = req.body;
        console.log("2.", username, email);

        const newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);
        console.log("3. User registered");

        req.login(registeredUser, (err) => {
            console.log("4. Inside req.login");

            if (err) {
                console.log("LOGIN ERROR:", err);
                return next(err);
            }

            console.log("5. Login successful");

            req.flash("success", "Welcome");
            res.redirect("/listings");
        });

    } catch (err) {
        console.log("SIGNUP ERROR:", err);
        res.send(err);
    }
};

// =======================
// Render Login
// =======================
module.exports.renderLoginForm = (req, res) => {
    res.render("user/login");
};

// =======================
// Login
// =======================
module.exports.login = (req, res) => {

    req.flash("success", "Welcome back!");

    const redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
};

// =======================
// Logout
// =======================
module.exports.logout = (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "Logged out successfully!");

        res.redirect("/listings");
    });
};