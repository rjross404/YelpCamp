//DECLARATIONS
const express 	= require("express"),
	app 		= express(),
	port 		= process.env.PORT || 3000,
	flash		= require("connect-flash"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport	= require("passport"),
	passLocal	= require("passport-local"),
	passMong	= require("passport-local-mongoose"),
	override	= require("method-override"),
	session 	= require("cookie-session"),
	Camp		= require("./models/camp"),
	Comment		= require("./models/comment"),
	User 		= require("./models/user"),
	campRoutes	= require("./routes/camps"),
	commRoutes	= require("./routes/comments"),
	indexRoutes	= require("./routes/index")

app.use(flash())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(override("_method"))
app.set("view engine", "ejs")
app.locals.moment = require("moment")

//  PASSPORT CONGIGURATION
app.use(require("cookie-session")({
	secret: "Copper is a good boy.",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
	res.locals.currentUser 	= req.user
	res.locals.error 		= req.flash("error")
	res.locals.success 		= req.flash("success")
	next()
})

// DATABASE
const url = process.env.DATABASEURL || "mongodb://localhost:27017/yelpCamp"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true	
})
.then(() => console.log('Connected to Database!'))
.catch(error => console.log(error.message));

// ROUTES
app.use("/", indexRoutes)
app.use("/camps", campRoutes)
app.use("/camps/:id/comments", commRoutes)

// LISTENER
app.listen(port, () => { 
	console.log("YelpCamp Server listening on port " + port) 
})