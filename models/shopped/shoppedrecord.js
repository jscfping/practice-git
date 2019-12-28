var mongoose = require("mongoose");

var shoppedrecordSchema = new mongoose.Schema({
	ownerid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    shoppedlist:[
		{
		    type: mongoose.Schema.Types.ObjectId,
            ref: "Shopped"
        }   
    ],
	date: Date
});


module.exports = mongoose.model("ShoppedRecord", shoppedrecordSchema);

