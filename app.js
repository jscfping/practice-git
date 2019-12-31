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












//articles (pbulic)
//
//

//R
app.get("/articles", function(req, res){
	
	
    //if author:{id, username}
	//what in populate run needs a OBJECTIDTYPE, not for author(get a []) but author.id
	//and can be id's array
	//after expansion, the origin obj id would add mongoose's _id and other data
	// like author.id, author.id._id
	var entry = "/articles/"
	Article.find().populate("authorid").exec(function(err, allarticles){
	    if (err) {
	    	console.log(err);
			res.send("article found error!");
	    }
	    else {
	        res.render("articles/dev", {allarticles: allarticles, entry:entry}); 
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
	var entry = "/articles/";
	Article.findOne({ _id: req.params.id}, function(err, article){
	    if(err){
	        console.log(err);
			return res.redirect("/articles/");
	    }
		else{
	        res.render("articles/edit", {article: article, entry:entry});
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
app.delete("/articles/:id", middleware.checkOwnArticle, function(req, res){
	Article.deleteOne({_id: req.params.id}, function(err){
		if(err){
			console.log(err);
	    }
		res.redirect("/articles");
	});
});






//articles (private)
//it can be add a function to judge entry to redirect proper place to make code more dry!!!
//

//R
app.get("/myarticles", middleware.isLogIned, function(req, res){

	var entry = "/myarticles/";
	Article.find({authorid: req.user._id}).populate("authorid").exec(function(err, myarticles){
	    if (err) {
	    	console.log(err);
			res.send("article found error!");
	    }
	    else {
	        res.render("articles/dev", {allarticles: myarticles, entry:entry}); 
	    }
	});
});



//C
app.post("/myarticles", middleware.isLogIned, function(req, res){
	
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
			res.redirect("/myarticles"); //redirect to get newed data
		}
     });
});


//U
app.get("/myarticles/:id/edit", middleware.checkOwnArticle, function(req, res){
	var entry = "/myarticles/";
	Article.findOne({ _id: req.params.id}, function(err, article){
	    if(err){
	        console.log(err);
			return res.redirect("/articles/");
	    }
		else{
	        res.render("articles/edit", {article: article, entry:entry});
	    }
	});
});

app.put("/myarticles/:id", middleware.checkOwnArticle, function(req, res){
	
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
		res.redirect("/myarticles/");
	});

});



//D
app.delete("/myarticles/:id", middleware.checkOwnArticle, function(req, res){
	Article.deleteOne({_id: req.params.id}, function(err){
		if(err){
			console.log(err);
	    }
		res.redirect("/myarticles");
	});
});
































//treasures
//
//
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










//show shoppinglist
app.get("/shoppinglist",
	middleware.isLogIned,
	middleware.getShoppingListRecipe,
	function(req, res){
	    res.render("users/shoppinglist");
});

//shopping list add function
app.put("/shoppinglist/:id",
	middleware.isLogIned,
	middleware.chkMarketOffReq,
	middleware.marketOff,
	middleware.shopListIn,
	function(req, res){
	    res.redirect("/shoppinglist");
});

//shopping list pop function
app.delete("/shoppinglist/:id",
	middleware.isLogIned,
	middleware.chkShopListOutReq,
    middleware.shopListOut,
    middleware.marketOn,
	function(req, res){
	    res.redirect("/shoppinglist");
});




//checkout
//
//
app.post("/checkout",
	middleware.isLogIned,
    middleware.chkOrderReq,//確認訂單要求
	middleware.makeOrder,//生成訂單
	middleware.handDealRecipe,//處理訂單recipe(1)
	middleware.passItemToUser,//移交物品(2)
    middleware.chargeUser,//扣款(3)
	middleware.finishOrder,//完成交易(確認1,2,3完成)
	function(req, res){

	res.redirect("/u");

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


