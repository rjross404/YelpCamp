const midObj 	= {},
	Camp		= require("../models/camp"),
	Comment		= require("../models/comment")

midObj.checkCamp = function(req, res, next) {
	if (req.isAuthenticated()) {
		Camp.findById(req.params.id, function(error, found) {
			if (error || !found) { 
				req.flash("error", "Campground not found.")
				res.redirect("back") 
			} else {
				if (found.author.id.equals(req.user._id) || req.user.isAdmin) { return next() }
				else { 
					req.flash("error", "You don't have permission to do that.")
					res.redirect("back") 
				}
			}
		})
	} else { 
		req.flash("error", "You must be logged in to do that.")
		res.redirect("back") 
	}
}

midObj.checkCom = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.com, function(error, found) {
			if (error || !found) { 
				req.flash("error", "Comment not found.")
				res.redirect("back") 
			} 
			if (found.author.id.equals(req.user._id) || req.user.isAdmin) { return next() }
			else { 
				req.flash("error", "You don't have permission to do that.")
				res.redirect("back") 
			}
		})
	} else {
		req.flash("error", "You must be logged in to do that.")
		res.redirect("back") 
	}
}

midObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) { return next() }
	req.flash("error", "You must be logged in to do that.")
	res.redirect("/login")
}

module.exports = midObj