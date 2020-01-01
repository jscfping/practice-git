var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});


var Event = require("../../../models/event");


var eventsAry = [
	new Event({
	    name: "Hi~Hi~",
	    description: "填寫個人描述，讓大家可以更認識你，以拿取獎金~",
	    isrunning: true,
		reward_cash: 100
	}),
	new Event({
	    name: "第一則po文",
	    description: "po出你的第一則文章，展現你的文采，以拿取獎金~",
	    isrunning: true,
		reward_cash: 300
    }),
	new Event({
	    name: "雲氣象",
	    description: "告訴本雲下雨概率有多少，本雲會送一些些獎金以答謝",
	    isrunning: true,
		reward_cash: 700,
    }),
	new Event({
	    name: "達成率萬分之一",
	    description: "達成率萬分之一的挑戰，你！敢挑戰嗎？挑戰成功有豐富獎金~~~",
	    isrunning: true,
		reward_cash: 1000,
    }),
	new Event({
	    name: "登入即送!",
	    description: "這雲站製作人瘋了！！！ 九星大禮登入即送！？！",
	    isrunning: true,
		reward_treasure:[{
			id: "5e0c014e0738680ad3ffafdb",
			qty: 1
		}]
    })
	
];



function seedData(el){
    return new Promise(function(resolve, reject){
		el.save(function (err, ele){
            if(err){
                reject(err);
            }
			console.log(ele + "...added...");
            resolve(el);
        });
	});
};

var sequence = Promise.resolve();



Event.deleteMany({},function(err){
    if (err) {
    	console.log(err);
    }
    else {
        console.log("...CLEAR!");
		// Loop through our chapter urls
        eventsAry.forEach(function(el){
            // Add these actions to the end of the sequence
            sequence = sequence.then(function(){
                return seedData(el); //if then(seedDate(el)) would run in this line, return would be submit
            });
        });
		
    }
});




