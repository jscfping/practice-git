var User = require("./user");
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
		        res.send("article can't found or sth err");
			}
			else{
				if(found.authorid.equals(req.user._id)){
					next();
				}
				else{//async!!!!!!!
					res.send("you didn't have the article's permission!"); 
				}
			}
		})
	}
	else{
		res.redirect("/login");
	}
};





middleware.checkshoppingListPush = function(req, res, next){
	if(Number(req.body.shoppinglist.qty) > 0){
		next();
	}
	else{
		res.send("qty would >0 and then add your shoppinglist");
	}
};

middleware.shoppingListPush = function(req, res, next){

	Treasure.findOne({_id: req.params.id}, function(err, found){
        if(err){
			console.log(err);
			res.send("can't find user id or sth err");
		}
		else{
	        var qty = Number(req.body.shoppinglist.qty);
			
			if(qty <= found.stocks){
				
				found.stocks -= qty; 

				//can better? async...
				if(true){
					Treasure.updateOne({_id: req.params.id}, found, function(err, sign){
	                    if(err){
				    		console.log();
	                        res.send("Treasure database update error");
	                    } else {
				            next();
	                    }
	                });
				}

			}
			else{
				res.send("we don't have so much stocks");
			}
		}
    });
};






middleware.checkshoppingListPop = function(req, res, next){
	
	if(Number(req.body.shoppinglist.qty) > 0){
		next();
	}
	else{
		res.send("qty would >0 and then pop your shoppinglist");
	}
};

middleware.shoppingListPop = function(req, res, next){
	
	User.findOne({_id: req.user._id}, function(err, found){
	    if (err) {
	    	console.log(err);
			res.send("can't find user id or sth err");
	    }
	    else {
			var id = req.params.id;
	        var qty = Number(req.body.shoppinglist.qty);
			//can better? async...
			if(true){
				Treasure.findOne({_id: id}, function(err, foundts){
                    if(err){
		            	console.log(err);
		            	res.send("can't find item id or sth err");
		            }
		            else{
				    	
				    	var idx = -1;
				    	
				    	for(var i=0; i<found.shoppinglist.length; i++){
				    		if(found.shoppinglist[i].id.equals(id)){
				    			idx = i;
				    			break;
				    		}
				    	}
				    	
				    	
				    	if(idx<0){
				    		res.send("it is not in your shoppinglist");
				    	}
				    	else{
				    		if(qty <= found.shoppinglist[idx].qty){
				    	    	if(qty < found.shoppinglist[idx].qty){
				    	    		found.shoppinglist[idx].qty -= qty;
				    	    	}
				    	    	else{
				    	    		found.shoppinglist.splice(idx,1);
				    	    	}
				    	    	foundts.stocks += qty ;
				    	    	//can better? async...
								if(true){
									User.updateOne({_id: req.user._id}, found, function(err, sign){
	                                    if(err){
				                    		console.log();
	                                        res.send("users database update error");
	                                    }
				    	    	    	else {
				                            Treasure.updateOne({_id: id}, foundts, function(err, sign){
	                                            if(err){
				                            		console.log();
	                                                res.send("treasures database update error");
	                                            } else {
				                                    next();
	                                            }
	                                        });
	                                    }
	                                });
								}
				    	    }
				    	    else{
				    	    	res.send("you don't have much qty");
				    	    }
				    	}
		            }
                });
			}
			
			

	    }
	});

};




function isNumsEqual(num1, num2){
	return ((Math.abs(num1 - num2) < 0.001) ? true : false);
}


module.exports = middleware;