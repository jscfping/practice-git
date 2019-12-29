var User = require("./user");
var Article = require("./article");
var Treasure = require("./treasure");
var dbfunc = require("./dbfunc");
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





middleware.chkMarketOffReq = function(req, res, next){
	var stu = "......@chkMarketOffReq"
	if(Number(req.body.shoppinglist.qty) > 0){
		next();
	}
	else{
		res.send("qty would >0 and then add your shoppinglist" + stu);
	}
};



middleware.marketOff = function(req, res, next){
    var stu = "......@marketOff"
	dbfunc.findById(Treasure, req.params.id).then(
	    (resolve, reject)=>{
			var found = resolve;
			var qty = Number(req.body.shoppinglist.qty);
			if(qty <= found.stocks){
				found.stocks -= qty; 
				dbfunc.updateById(Treasure, req.params.id, found).then(()=>{
					return next();}
				);
			}
			else{
				reject("we don't have so much stocks");
			}
		}
	).catch((e)=>{
		res.send(e + stu);
	});

};



middleware.shopListIn = function(req, res, next){
    var stu = "......@shopListIn"
	
	dbfunc.findById(User, req.user._id).then(
	    (resolve, reject)=>{
			var found = resolve;
			
			var idx = -1;
	    	for(var i=0; i<found.shoppinglist.length; i++){
	    		if(found.shoppinglist[i].id.equals(req.params.id)){
	    			idx = i;
	    			break;
	    		}
	    	}

			if(idx >= 0){ //already exist
	    		found.shoppinglist[idx].qty += Number(req.body.shoppinglist.qty);
				//be careful string type...
	    	}
	    	else{
	    		req.body.shoppinglist.id = req.params.id;
	    		found.shoppinglist.push(req.body.shoppinglist);
	    	}
			
			dbfunc.updateById(User, req.user._id, found).then(()=>{
				return next();
			});

		}
	).catch((e)=>{
		res.send(e + stu);
	});
};






middleware.chkShopListOutReq = function(req, res, next){
	var stu = "......@chkShopListOffReq"
	if(Number(req.body.shoppinglist.qty) > 0){
		next();
	}
	else{
		res.send("qty would >0 and then pop your shoppinglist" + stu);
	}
};


middleware.shopListOut = function(req, res, next){
    var stu = "......@shopListOut"
	dbfunc.findById(User, req.user._id).then(
	    (resolve, reject)=>{
			var found = resolve;
			var id = req.params.id;
	        var qty = Number(req.body.shoppinglist.qty);
			
			dbfunc.findById(Treasure, _id: id).then(
	            (resolve, reject)=>{
					var foundts = resolve;
					
					var idx = -1;
				    for(var i=0; i<found.shoppinglist.length; i++){
				    	if(found.shoppinglist[i].id.equals(id)){
				    		idx = i;
				    		break;
				    	}
				    }
				    if(idx<0){
				    	reject("it is not in your shoppinglist");
				    }
					
					
					if(qty <= found.shoppinglist[idx].qty){
						if(qty < found.shoppinglist[idx].qty){
                        	found.shoppinglist[idx].qty -= qty;
                        }
                        else{
                        	found.shoppinglist.splice(idx,1);
                        }
						
						dbfunc.updateById(User, req.user._id, found).then(()=>{
			            	foundts.stocks += qty ;
							resolve();}
			            );
                        

					}
					else{
						reject("you don't have much qty");
					}
					
					
					
					
					
					
					
				}
			);
		}
	).catch((e)=>{
		res.send(e + stu);
	});

};





middleware.marketOn = function(req, res, next){
	
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




function isNumsEqual(num1, num2){
	return ((Math.abs(num1 - num2) < 0.001) ? true : false);
}


module.exports = middleware;