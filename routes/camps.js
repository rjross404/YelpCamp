const express 	= require("express"),
	router 		= express.Router(),
	Camp		= require("../models/camp"),
	Comment		= require("../models/comment"),
	Mid			= require("../middleware")

// CAMPGROUNDS INDEX
router.get("/", function(req, res){
	Camp.find({}, function(error, camps){
		if (error) { console.log(error) } 
		else {
	res.render("camps/index",{camps:camps, page: "camps"})
		}
	})
})

// NEW ROUTE
router.get("/new", Mid.isLoggedIn, (req, res) => {
	res.render("camps/new")
})

// CREATE ROUTE
router.post("/", Mid.isLoggedIn, (req, res) => {
	var name 	= req.body.name,
		price	= req.body.price,
		image 	= req.body.image,
		desc 	= req.body.desc,
		author 	= {
			id: req.user._id,
			username: req.user.username
		}
	Camp.create({name, price, image, desc, author}, (error, camp) => {
		if (error) { console.log(error) } 
	})
	req.flash("success", "Successfully created campground.")
	res.redirect("/camps")
})

// SHOW ROUTE
router.get("/:id", (req, res) => {
	Camp.findById(req.params.id).populate("comments").exec((error, found) => {
		if (error || !found) { 
			req.flash("error", "Campground not found.")
			res.redirect("back")
		} else { 
			res.render("camps/show", {camp: found}) 
		}
	})
})

// EDIT ROUTE
router.get("/:id/edit", Mid.isLoggedIn, Mid.checkCamp, (req, res) => {
	Camp.findById(req.params.id, (error, found) => {
		res.render("camps/edit", {camp: found})
	})
})

// UPDATE ROUTE
router.put("/:id", Mid.checkCamp, (req, res) => {
	Camp.findByIdAndUpdate(req.params.id, req.body.camp, (error, update) => {
		if (error) { res.redirect("/camps") }
		else { res.redirect("/camps/" + req.params.id) }
	})
})

// DELETE ROUTE
router.delete("/:id", Mid.checkCamp, (req, res) => {
	Camp.findByIdAndRemove(req.params.id, (error, remove) => {
		if (error) { console.log(error) }
		Comment.deleteMany( {_id: { $in: remove.comments }}, (error) => {
			if (error) { console.log(error) }
			req.flash("success", "Campground successfully deleted.")
			res.redirect("/camps")
		})
	})
})

module.exports = router