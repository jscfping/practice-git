var express = require("express");
var cors = require("cors");
var app = express();


app.use(cors());






var data = JSON.stringify();

app.get("/",function(req, res){
	 res.json({ x: 5, y: 6 });
});




app.listen(3000, function(){
   console.log("The Server Has Started...");
});
