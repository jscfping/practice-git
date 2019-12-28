var mongoose = require("mongoose");

var shoppedSchema = new mongoose.Schema({
	shoppedrecord:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShoppedRecord"
    },
    itemid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treasures"
    },
	qty: {type: Number, min: 0},
	price: {type: Number, min: 0},
	subtotal: {type: Number, min: 0},
});


module.exports = mongoose.model("Shopped", shoppedSchema);

