

var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});

var Treasure = require("./models/treasure");




Treasure.findOne({_id: "5e022703a537f6fb2c"}, function(err, found){
    if(err){
		console.log("err");

	}
	else{
		console.log("good");
	}

    
});





var middleware = {Obj:{}};



middleware.isLogIned= function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


//
middleware.checkOwn = function(req, res, next){
	console.log(this.Obj);
}