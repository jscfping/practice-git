



var middleware = {Obj:{}};


middleware.checkOwn;

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