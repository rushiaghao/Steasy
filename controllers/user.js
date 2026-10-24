const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password); 
        console.log(registeredUser);

        // Automatically log in the user after registration
        req.login(newUser, (err) => {
            if (err) return next(err);
            req.flash("success", "SignUp successful!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) =>{
    req.flash("success", "Login successful. Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "Logged out successfully. Have a great day!");
        res.redirect("/listings");
    });
};