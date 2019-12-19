var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/associations_embed", {useNewUrlParser: true});  //use for mongo's use sth


// POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String,
   desc:String,
   date:String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);



//save a new user to test
// var newUser = new User({email:"tom@gmail.com", name:"Clancy Tom"});    //this type is object, and would have a _id random
// newUser.save(function (err, newone) {    //this class' method, so we can't only create a object to save
//     if (err) return console.error(err);
//     console.log(newone);
// });


//associations embed
// User.findOne({name: "Clancy Tom"}, function(err, user){
// 	if (err) {
// 		console.error(err);
// 	}
// 	else {
		
// 		//console.log("before push>>>>>>>>>>" + user)
		
// 		//user.posts.push({title:"found a wonderful DOG", date:"today", desc:"meowww"})
		
// 		//console.log("after push>>>>>>>>>>" + user)

// 		user["__v"]=0;  //just a test for authority
		
// 	    user.save(function (err, newone) {
//             if(err){
// 				console.log(err);
// 			}
// 			else{
// 				console.log(newone);
// 			}
//         });
// 	}
	
// });




