
var express = require("express");
var router  = express.Router();  //var router  = express.Router({mergeParams: true});

var dbfunc = require("../models/dbfunc");
var middleware = require("../models/middleware");
var eventfunc = require("../models/eventfunc");

var Event = require("../models/event");
var User = require("../models/user");



router.get("/", function(req, res){
	Event.find({}, function(err, founds){
	    if (err) {
	    	console.log(err);
			res.send("events found error!");
	    }
	    else {
	        res.render("events/_dev", {allevents: founds}); 
	    }
	});
});


router.get("/:id", function(req, res){

	Event.findOne({_id: req.params.id}, function(err, founds){
	    if (err) {
	    	console.log(err);
			res.send("events found error!");
	    }
	    else {
	        res.render("events/e" + founds.eid, {event: founds}); 
	    }
	});
});




router.post("/:id",
	middleware.isLogIned,
	eventfunc.find,
	eventfunc.isUidFinish,
	eventfunc.logic,
	eventfunc.sendReward,
	eventfunc.finish,
	function(req, res){

	res.redirect("/events/" + req.params.id);
});










module.exports = router;