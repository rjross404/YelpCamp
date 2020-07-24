const express 	= require("express"),
	router 		= express.Router(),
	passport	= require("passport"),
	User		= require("../models/user")

// HOME PAGE
router.get("/", (req, res) => {
	res.redirect("/camps")
})

// SHOW REGISTRATION FORM
router.get("/register", (req, res) => {
	res.render("register", {page: "register"})
})

// SIGN UP LOGIC ROUTE
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username})
	if (req.body.admin === "admin123") { newUser.isAdmin = true }
	User.register(newUser, req.body.password, (error, user) => {
		if (error) {
			req.flash("error", error.message)
			return res.redirect("/register")
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + user.username + "!")
			res.redirect("/camps")
		})
	})
})

// LOGIN FORM
router.get("/login", (req, res) => {
	res.render("login", {page: "login"})
})

// LOGIN LOGIC ROUTE
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/camps", 
		failureRedirect: "/login"
	}), (req, res) => {
})

// LOGOUT
router.get("/logout", (req, res) => {
	req.logout()
	req.flash("success", "You have logged out.")
	res.redirect("/camps")
})

module.exports = router