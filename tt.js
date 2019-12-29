

var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});

var Treasure = require("./models/treasure");
var dbfunc = require("./models/dbfunc");


// dbfunc.findById(Treasure, "5e084a993ea46d10a58646ae").then((o,x)=>{
// 	console.log(o);
// })


// dbfunc.findById(Treasure, "5e084a993ea46d10a58646ae").then(ss(666));


dbfunc.findById(Treasure, "5e084a993ea46d10a58646ae").then(()=>{ss(66)});

function ss(x){
	console.log(x);
}