var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
//var middleware = require("models/middleware");



//mongoose setup
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true}); // use for mongoose to use sth
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("mongoose........connected"); // we're connected!
});

// mongoose schema setup
var User = require("./models/user");
var Article = require("./models/article");
var ArticleComment = require("./models/comment/articlecomment");


// set up express
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname means current folder???
app.use(methodOverride("_method"));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "cloud_demo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// res.locals is form express
// for every req, would add a currentUser to res in ejs
// req.user is from...???
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});



















//routes
app.get("/",function(req, res){
	res.render("index");
});






// show register form
app.get("/register", function(req, res){
    res.render("users/register"); 
});

// handle sign up logic
app.post("/register", function(req, res){

	var newUser = new User({username: req.body.username});
	userInfoInit(newUser); //better method???
	
	//here would add a lowcase check
    
	User.register(newUser, req.body.password, function(err, user){  //from passport-local-mongoose
        if(err){
            console.log(err);
            return res.render("users/register");
        }
		
		//http://www.passportjs.org/docs/authenticate/
		//JS' closure
		passport.authenticate("local")(req, res, function(){
		    res.redirect("/uu");
		});
    });
});



// show login form
app.get("/login", function(req, res){
    res.render("users/login"); 
});

// handling login logic
app.post("/login",
	passport.authenticate("local",{
            successRedirect: "/uu",
            failureRedirect: "/login"
        }
	),
    function(req, res){
});


// logout route
app.get("/logout", function(req, res){
	req.logout();
    res.redirect("/"); 
});



app.get("/uu",function(req, res){
	
	User.find({}, function(err, allusers){
	    if (err) {
	    	console.log(err);
			res.send("error!");
	    }
	    else {
	        res.render("users/userpage", {allusers: allusers});
	    }
	});

});














//R
app.get("/articles", function(req, res){
	
	
    //if author:{id, username}
	//what in populate run needs a OBJECTIDTYPE, not for author(get a []) but author.id
	//and can be id's array
	//after expansion, the origin obj id would add mongoose's _id and other data
	// like author.id, author.id._id
	Article.find().populate("authorid").exec(function(err, allarticles){
	    if (err) {
	    	console.log(err);
			res.send("error!");
	    }
	    else {
			
			console.log(allarticles);

	        res.render("articles/article", {allarticles: allarticles}); 
	    }
	});
	
    
});



//C
app.post("/articles", function(req, res){
	
	var newArticle = new Article(req.body.article);
	newArticle.authorid = req.user._id;
	
	newArticle.save(function (err, article) {
        if (err){
			console.log(err);
		    return res.redirect("/");
	    }
		else{
			console.log(article);
			console.log("a new data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>added!");
		}

		res.redirect("/articles"); //redirect to get newed data
       
     });

});


//U
app.get("/articles/:id/edit", function(req, res){
	Article.findOne({ _id: req.params.id}, function(err, article){
	    if(err){
	        console.log(err);
			return res.redirect("/articles/");
	    }
		else{
	        res.render("articles/edit", {article: article});
	    }
	});
});

app.put("/articles/:id", function(req, res){
	
	var newdata = req.body.article;
	newdata.isedited = true;
	newdata.edited = new Date;
	
	//req.body.blog.body = req.sanitize(req.body.blog.body);wait for update
	Article.updateOne({ _id: req.params.id}, newdata, function(err, newdata){
	    if(err){
	        console.log(err);
	    }
		else{
	        console.log(newdata + "was added......")
	    }
		res.redirect("/articles/");
	});

});



//D
app.delete("/articles/:id", function(req, res){
	Article.deleteOne({_id: req.params.id}, function(err){
		if(err){
			console.log(err);
	    }
		res.redirect("/articles");
	});
});

















app.get("/getcash",function(req, res){
	
	if(req.user){
	    User.findOne({_id: req.user._id}, function(err, user){
	    	if(err){
	    		console.log(err);
	    	}
	    	else{
	    		user.cash++;
	    		user.save();
	    	}
	    });
	}
	
    
	res.redirect("/");
});







app.get("*",function(req, res){
	 res.send("Hello?");
});




app.listen(3000, function(){
   console.log("The Server Has Started...");
});










//function


function userInfoInit(obj){
    obj.nickname= obj.username;
	obj.cash= 0;
};


