var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),


//mongoose setup
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/test_db", {useNewUrlParser: true});  //use for mongo's use sth
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("mongoose........connected");    // we're connected!
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");






app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
    res.send("you post something...");
});




app.listen(3000, function(){
   console.log("Server is running..");
});