const mongoose		= require("mongoose"),
	  passMong		=require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	isAdmin: {type: Boolean, default: false}
})

userSchema.plugin(passMong)

module.exports = mongoose.model("User", userSchema)