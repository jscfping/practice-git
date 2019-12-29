var mongoose = require("mongoose");

var shoppedsubtermSchema = new mongoose.Schema({
	ownerid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "shoppedterm"
    },
    itemid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treasures"
    },
	qty: {type: Number, min: 0},
	price: {type: Number, min: 0},
	subtotal: {type: Number, min: 0},
});


module.exports = mongoose.model("shoppedsubterm", shoppedsubtermSchema);

