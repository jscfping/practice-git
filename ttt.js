var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});


var Treasure = require("./models/treasure");


var treasuresAry = [
	new Treasure({
	    id: 111,
	    name: "高興每一天",
    }),
	new Treasure({
	    id: 221,
	    name: "怕",
        image: "/images/userimages/pa.png",
    }),
	new Treasure({
	    id: 331,
	    name: "淡定",
    }),
	new Treasure({
	    id: 441,
	    name: "愛",
	    category: "word",
    }),new Treasure({
	    id: 551,
	    name: "淡定",
	    description: "你要喝杯紅茶嗎.....?",
	    category: "userimage"
    }),
	new Treasure({
	    id: 661,
	    name: "5555",
        image: "5555555",
    }),

	
];



var objIdAry =  ["111", "331", "441"];
var queryAry = [];
var resultAry = [];

for(var i=0; i<objIdAry.length; i++){
	var query = Treasure.findOne({ id: objIdAry[i] });
	queryAry.push(query);
}

function gogo(x){
	
}


var promise = query.exec();
promise.addBack(function (err, docs){
	if(err){
		console.log;
	}
	else{
		resultAry.push(docs);
		promise.addBack;
	}
});


// var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
// var promise = query.exec();
// promise.addBack(function (err, docs) {});







// Treasure.deleteMany({},function(err){
//     if (err) {
//     	console.log(err);
//     }
//     else {

// 		treasuresAry.forEach(function(el){
// 			el.save(function (err, ty) {
//                 if(err){
// 		            console.log(err);
// 		        }
//                 console.log(el+ "...added...");
//             });
//         });
//     }
// });




