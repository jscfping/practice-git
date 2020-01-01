var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});

var User = require("./models/user");
var ShoppedRecord = require("./models/shopped/shoppedrecord");
var Shopped = require("./models/shopped/shopped");
var Treasure = require("./models/treasure");




// Treasure.find({}, function(err,found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(found);
// 	}
// })



function listMongoose(schema){
	return new Promise(function(resolve, reject){
	    schema.find({}, function(err,found){
        	if(err){
        		reject(err);
        	}
        	else{
        		resolve(found);
        	}
        })
	});
}


p1 = listMongoose(Treasure);
p2 = listMongoose(User);

Promise.all([p1,p2]).then(function(v){
	console.log(v[0]);
	console.log(v[1]);
}).catch(function(v){
	console.log(v[0]);
	console.log(v[1]);
});



// var elUser = new User({username: "ty"});
// elUser.save(function (err, el) {
//     if(err){
//         console.log(err);
//     }
//     console.log(el+ "...added...");
// });




// var elSpdRd = new ShoppedRecord(
// 	{
// 	    ownerid: "5e06f2c161bf5017d04e710c",
// 	}
// );
// elSpdRd.save(function (err, el) {
//     if(err){
//         console.log(err);
//     }
//     console.log(el+ "...added...");
// });







// var elSpd = new Shopped(
// 	{
// 		shoppedrecord: "5e06f2e0e6115e17dff0ad7e",
// 	    itemid: "5e06ef24003619171462712f",
// 		qty: 7,
// 		price: 10,
// 		subtotal: 70
// 	}
// );
// elSpd.save(function (err, el) {
//     if(err){
//         console.log(err);
//     }
//     console.log(el+ "...added...");
// });

//5e06ef24003619171462712e 高興美一天 2 30 60
//5e06ef24003619171462712f 怕 7 10 70








////////////////////////////////////////


// User.findOne({username:"ty"}, function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(found);
// 	}
// });



// ShoppedRecord.findOne({ownerid: "5e06f2c161bf5017d04e710c"}, function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(found);
// 	}
// });


// Shopped.findOne({itemid: "5e06ef24003619171462712e"}, function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(found);
// 	}
// });
//5e06ef24003619171462712e 高興美一天 2 30 60
//5e06ef24003619171462712f 怕 7 10 70


//////////////////////////////////////////////////////////////////////////////



// ShoppedRecord.findOne({ownerid: "5e06f2c161bf5017d04e710c"}, function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		var newdata = found;
// 		newdata.shoppedlist.push("5e06f3ab3f0981181bc43b67");
// 		newdata.shoppedlist.push("5e06f3bd64b305182a5b9d1e");
// 		newdata.date = new Date();
		
// 		if(true){
// 			ShoppedRecord.updateOne({_id: found._id}, newdata, function(err, sign){
// 		    	if(err){
// 	                console.log(err);
// 	            }
// 		        else{
// 	                console.log("updated...and sign:");
//                  console.log(sign);
// 	            }
// 		    });
// 		}
		
// 	}
// });



// User.findOne({username:"ty"}, function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		var newdata = found;
// 		newdata.shoppedlist.push("5e06f2e0e6115e17dff0ad7e")
		
// 		if(true){
// 			User.updateOne({_id: found._id}, newdata, function(err, sign){
// 		    	if(err){
// 	                console.log(err);
// 	            }
// 		        else{
// 	                console.log("updated...and sign:");
// 					console.log(sign);
// 	            }
// 		    });
// 		}
		
// 	}
// });


/////////////////////////////////////////////////////////



//populate!!
// User.findOne({username:"ty"}).populate("shoppedlist").exec(function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		found.shoppedlist.forEach(function(el){
// 			console.log(el);
// 		});
// 	}
// });



// User.findOne({username:"ty"}).populate("shoppedlist").exec(function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		found.shoppedlist.forEach(function(el){
// 			ShoppedRecord.findOne({_id: el._id}).populate("shoppedlist").exec(function(err, found2){
// 				console.log(found2);
// 		    });
// 	    });
// 	}
// });


// User.findOne({username:"ty"}).populate("shoppedlist").exec(function(err, found){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		found.shoppedlist.forEach(function(el){
// 			ShoppedRecord.findOne({_id: el._id}).populate("shoppedlist").exec(function(err, found2){
// 				console.log(found2);
// 		    });
// 	    });
// 	}
// });





///////////////////////////////////////////////////////////////////
// User.deleteMany({},function(err){
// 	if(err){
// 		console.log(err)
// 	}
// 	else{
// 		console.log("...CLEAR!");
// 	}
// });


// Shopped.deleteMany({},function(err){
// 	if(err){
// 		console.log(err)
// 	}
// 	else{
// 		console.log("...CLEAR!");
// 	}
// });

// Shopped.deleteMany({},function(err){
// 	if(err){
// 		console.log(err)
// 	}
// 	else{
// 		console.log("...CLEAR!");
// 	}
// });


