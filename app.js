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


var dogSchema = new mongoose.Schema({
   name: String,
   age: Number,
});

var Dog = mongoose.model("Dog", dogSchema);

//adding a new dog to the DB

// var lucky = new Dog({
//     name: "Mrs. Lucky",
//     age: 7,
// });

// lucky.save(function(err, dog){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(dog + "is added...");
//     }
// });


//if you use method "find()", the dogSchema's structure(means SCHEMA) doesn't master. it focus on the model "Dog" to import,
// Dog.find(function (err, doh) {
//     if (err) return console.error(err);
//     console.log("=================db's data saved=================")
//     console.log(dog);
//     console.log("=================================================")
// })








app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
    res.send("you post something...");
});




app.listen(3000, function(){
   console.log("Server is running..");
});