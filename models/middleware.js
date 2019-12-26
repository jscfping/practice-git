
var Article = require("./article");
var Treasure = require("./treasure");
var middleware = {};


middleware.isLogIned = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


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
};






middleware.checkShoppingListAdd = function(req, res, next){

	var price = Number(req.body.shoppinglist.price);
	var qty = Number(req.body.shoppinglist.qty);
	
	Treasure.findOne({_id: req.body.shoppinglist.id}, function(err, found){
        if(err){
			//can't find or sth err
			res.redirect("back");
		}
		else{
			if((qty <= found.stocks) && isNumsEqual(price, found.price)){
				req.body.shoppinglist.price = found.price;
				req.body.shoppinglist.name = found.name;
				req.body.shoppinglist.image = found.image;
				next();
			}
			else{
				res.send("error list!");
			}
		}
    });
};




function isNumsEqual(num1, num2){
	return ((Math.abs(num1 - num2) < 0.001) ? true : false);
}


module.exports = middleware;