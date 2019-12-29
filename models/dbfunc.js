var User = require("./user");
var Article = require("./article");
var Treasure = require("./treasure");
var Shoppedterm = require("./shoppedrecord/term.js");
var Shoppedsubterm = require("./shoppedrecord/subterm.js");

var dbfunc = {};






dbfunc.findById = function (objSchema, _id){
	return new Promise(function(resolve, reject){
		objSchema.findOne({_id: _id}, function(err, found){
		    if(err){
				console.log(err);
				reject("database find error");
			}
			else{
				resolve(found);
			}	
		});
	});
};



dbfunc.updateById = function (objSchema, _id, renew){
	return new Promise(function(resolve, reject){
		objSchema.updateOne({_id: _id}, renew, function(err, sign){
		    if(err){
				console.log(err);
				reject("database update error");
			}
			else{
				resolve(sign);
			}	
		});
	});
};













module.exports = dbfunc;



