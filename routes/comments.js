const express 	= require("express"),
	router 		= express.Router({mergeParams: true}),
	Camp		= require("../models/camp"),
	Comment		= require("../models/comment"),
	Mid			= require("../middleware")

// NEW COMMENT
router.get("/new", Mid.isLoggedIn, (req, res) => {
	Camp.findById(req.params.id, (error, camp) => {
		if (error) { console.log(error) }
		else { res.render("comments/new", {camp:camp}) }
	})
})

// CREATE COMMENT
router.post("/", Mid.isLoggedIn, (req, res) => {
	Camp.findById(req.params.id, (error, camp) => {
		if (error) { 
			console.log(error) 
			res.redirect("/camps")
		} else {
			Comment.create(req.body.comment, (error, comment) => {
				if (error) { console.log(error) }
				else {
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					camp.comments.push(comment)
					camp.save()
					req.flash("success", "Successfully added comment.")
					res.redirect("/camps/" + camp._id)
				}
			})
		}
	})
})

// EDIT COMMENT
router.get("/:com/edit", Mid.isLoggedIn, Mid.checkCom, (req, res) => {
	Camp.findById(req.params.id, (error, found) => {
		if (error || !found) {
			req.flash("error", "Campground not found.")
			return res.redirect("back")
		} 
		Comment.findById(req.params.com, (error, found) => {
			if (error || !found) { 
				req.flash("error", "Comment not found.")
				res.redirect("back") 
			} else {
				res.render("comments/edit", {camp_id: req.params.id, comment: found})
			}
		})
	})
})

// UPDATE COMMENT
router.put("/:com", Mid.checkCom, (req, res) => {
	Comment.findByIdAndUpdate(req.params.com, req.body.comment, (error, update) => {
		if (error) { res.redirect("back") }
		else { res.redirect("/camps/" + req.params.id) }
	})
})

// DELETE COMMENT
router.delete("/:com", Mid.checkCom, (req, res) => {
	Comment.findByIdAndRemove(req.params.com, (error, remove) => {
		if (error) { res.redirect("back") }
		else { 
			req.flash("success", "Comment successfully deleted.")
			res.redirect("back") 
		}
	})
})

module.exports = router