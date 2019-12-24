
var Article = require("./article");
var middleware = {};


middleware.isLogIned = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


//is there better script???
middleware.checkOwnArticle = function(req, res, next){
	if(req.isAuthenticated()){
		 Article.findOne({_id:req.params.id}, function(err, found){
			if(err){
				console.log(err);
		        res.redirect("back");
			}
			else{
				if(found.authorid.equals(req.user._id)){
					next();
				}
				res.send("you didn't have the article's permission!");
			}
		})
	}
	else{
		res.redirect("/login");
	}

}


module.exports = middleware;