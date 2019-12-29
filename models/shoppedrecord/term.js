var mongoose = require("mongoose");

var shoppedtermSchema = new mongoose.Schema({
	ownerid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    subterms:[
		{
		    type: mongoose.Schema.Types.ObjectId,
            ref: "shoppedsubterm"
        }   
    ],
	date: Date,
	price: {type: Number, min: 0}
});


module.exports = mongoose.model("shoppedterm", shoppedtermSchema);

