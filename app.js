var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");




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
var Treasure = require("./models/treasure");


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


//set up middleware
var middleware = require("./models/middleware");



















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
		    res.redirect("/u");
		});
    });
});



// show login form
app.get("/login", function(req, res){
	//can be better
    if(req.user){
        res.redirect("/"); 
	}else{
		res.render("users/login"); 
	}
	
});

// handling login logic
app.post("/login",
	passport.authenticate("local",{
            successRedirect: "/u",
            failureRedirect: "/login"
        }
	),
    function(req, res){
});


// logout route
app.get("/logout", function(req, res){
	if(req.user){
		req.logout();
        res.redirect("/"); 
	}else{
		res.redirect("/login"); 
	}
	
});



app.get("/u",function(req, res){
	
	User.find({}, function(err, allusers){
	    if (err) {
	    	console.log(err);
			res.send("error!");
	    }
	    else {
	        res.render("users/dev", {allusers: allusers});
	    }
	});

});












//articles
//
//

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
			res.send("article found error!");
	    }
	    else {
	        res.render("articles/dev", {allarticles: allarticles}); 
	    }
	});
	
    
});



//C
app.post("/articles",middleware.isLogIned, function(req, res){
	
	var newArticle = new Article(req.body.article);
	newArticle.authorid = req.user._id;
	
	newArticle.save(function (err, article) {
        if (err){
			console.log(err);
		    res.send("article created error!");
	    }
		else{
			console.log(article);
			console.log("a new data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>added!");
			res.redirect("/articles"); //redirect to get newed data
		}

       
     });

});


//U
app.get("/articles/:id/edit", middleware.checkOwnArticle, function(req, res){
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

app.put("/articles/:id", middleware.checkOwnArticle, function(req, res){
	
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
app.delete("/articles/:id", middleware.isLogIned, middleware.checkOwnArticle, function(req, res){
	Article.deleteOne({_id: req.params.id}, function(err){
		if(err){
			console.log(err);
	    }
		res.redirect("/articles");
	});
});













//treasures
//
//

//R
app.get("/treasures", function(req, res){
	
	Treasure.find({}, function(err, founds){
	    if (err) {
	    	console.log(err);
			res.send("error!");
	    }
	    else {
	        res.render("treasures/dev", {alltreasures: founds}); 
	    }
	});

});














//shoppinglist
app.get("/shoppinglist", middleware.isLogIned, function(req, res){
	
	User.findOne({_id: req.user._id}, function(err, found){
	    if (err) {
	    	console.log(err);
			res.send("error!");
	    }
	    else {

			res.render("users/shoppinglist", {user: found});
	    }
	});
});

//shopping list function
app.put(
	"/shoppinglist/:id", middleware.isLogIned,
	middleware.checkshoppingListPush,
	middleware.shoppingListPush,
	function(req, res){
	
	    User.findOne({_id: req.user._id}, function(err, found){
	        if (err) {
	        	console.log(err);
	    		res.send("can't find user id or sth err");
	        }
	        else {
	    		
	    		var idx = -1;
	    		for(var i=0; i<found.shoppinglist.length; i++){
	    			if(found.shoppinglist[i].id.equals(req.params.id)){
	    				idx = i;
	    				break;
	    			}
	    		}
				
	    		if(idx >= 0){ //already exist
					//be careful string type...
	    			found.shoppinglist[idx].qty += Number(req.body.shoppinglist.qty);
	    		}
	    		else{
	    			req.body.shoppinglist.id = req.params.id;
	    			found.shoppinglist.push(req.body.shoppinglist);
	    		}
	    		
				if(true){
				    User.updateOne({_id: req.user._id}, found, function(err, sign){
	                     if(err){
	                         console.log(err);
	    	            	 res.send("user database update error!");
	                     }
	    	             else{
                             res.redirect("/shoppinglist");
	    	            }
	                });
				}
	    		
	        }
	    });
});


//shopping list function
app.delete(
	"/shoppinglist/:id", middleware.isLogIned,
	middleware.checkshoppingListPop,
	middleware.shoppingListPop,
	function(req, res){
	    res.redirect("/shoppinglist");
});





















//checkout
app.post("/checkout", middleware.isLogIned, function(req, res){
	

	res.render("users/checkout");

});














app.get("/getcash", middleware.isLogIned, function(req, res){
	
	if(req.user){ //can be better
	    User.findOne({_id: req.user._id}, function(err, found){
	    	if(err){
	    		console.log(err);
				res.send("find user id err");
	    	}
	    	else{
	    		found.cash += 1000;
				
				User.updateOne({_id: req.user._id}, found, function(err, sign){
	                if(err){
						console.log();
	                    res.send("database update error");
	                } else {
	                    res.redirect("/");
	                }
	            });

	    	}
	    });
	}

});







//API
//get treasure's data
app.get("/api/treasures/:id", function(req, res){
	
	Treasure.findOne({_id: req.params.id}, function(err, found){
	    if(err){
			console.log(err);
			res.send("API can't find the treasure, or sth wrong"); 
		}
		else{
			
			// var x = found
			// console.log(x);
			// x.d = 9;
			// console.log(x); //there, x DIDN'T HAVE d!!!!!   WHICH is x['_doc']!!!!!!!!!
			// actually, x is { '$__', 'isNew', 'errors', '_doc', '$locals', '$init' }
			// console.log(x.d);

			var data = found["_doc"];
			data.releasedate = UTC(data.releasedate);

			res.json(data);

		}
	});
});















app.get("*",function(req, res){
	 res.send("not found...");
});




app.listen(3000, function(){
   console.log("The Server Has Started...");
});










//function
function userInfoInit(obj){
    obj.nickname= obj.username;
	obj.cash= 0;
};



function UTC(x){
	if(x){
        return x.getTime().toString()
    }
}

//useless
function checkInObjHasNull(obj){
	var propertyary = Object.keys(obj)
	for(var i=0; i<propertyary.length; i++){
		if(!x[propertyary[i]]) return true;
	}
	return false;
};


