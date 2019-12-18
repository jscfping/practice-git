var express = require("express");
var router  = express.Router();
var mongoose = require("mongoose");


//mongoose setup
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/test_db", {useNewUrlParser: true});  //use for mongo's use sth
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("mongoose........connected");    // we're connected!
});



//found2's data import found1's
Comment.find({_id: "found1s_id"}, function(err, found1){
	if(err){
		console.log(err);
	}
	
	
	console.log("---------------------------------");
	console.log(found1);
	console.log("---------------------------------");
	
    Comment.find({_id: "found2s_id"}, function(err, found2){
	    if(err){
	    	console.log(err);
	    }
		
		console.log("---------------------------------");
		console.log(found2);
		console.log("---------------------------------");
		
        //what the found returns is a array!!!
		// found1[0].property=found2[0].property;


		
		// Comment.updateOne({_id: "found1s_id"}, found1[0], function(err, updatee){
		//     if(err){
		//     console.log(err);
		//     } else {
		//     console.log(">>>>>>>>>>>>>");
		//     console.log(updatee);
		//     console.log(">>>>>>>>>>>>>");
		// 	}
		// });

	});

});
	


