
var dbfunc = require("./dbfunc");

var Event = require("./event");
var User = require("./user");

var eventfunc = {};





eventfunc.find = function(reqapiCWB res, next){
    var stu = "......@find";
	dbfunc.findById(Event, req.params.id).then(
	    (resolve, reject)=>{
			res.locals.running_event = resolve["_doc"];
			next();
		}
	).catch((e)=>{
		res.send(e + stu);
	});
};


eventfunc.isUidFinish = function(req, res, next){
    var stu = "......@isUidFinish";
	dbfunc.findById(User, req.user._id).then(
	    (resolve, reject)=>{
			res.locals.running_event.user = resolve["_doc"];
			var uidfinished = false;
			
			for(var i=0; i<res.locals.running_event.finish_uid.length; i++){
				if(res.locals.running_event.finish_uid[i].toString() === req.user._id.toString()){
					uidfinished = true;
					break;
				}
			}
			
			if(uidfinished){
				res.send("you finished the event!!!" + stu);
			}
			else{
				next();
			}
			
		}
	).catch((e)=>{
		res.send(e + stu);
	});
};




eventfunc.logic = function(req, res, next){
    var stu = "......@logic";
	
	var eid = "e" + res.locals.running_event.eid
	var logicFunFound = true;
	var tmp_event;  //which lets res get the pop of a obj

	switch (eid) {
        case "e0001":
			tmp_event = eventfunc.logic["e0001"](req, res);
            break;
		case "e0002":
			tmp_event = eventfunc.logic["e0002"](req, res);
			break;
		case "e0101":
			tmp_event = eventfunc.logic["e0101"](req, res);
            break;
        case "test_null":
        default:
            logicFunFound = false;
		    break;
    }
	
	if(logicFunFound){
		res.locals.running_event = tmp_event;
		
		if(res.locals.running_event.isSuc){
			next();
		}
		else{
			var result = "something wrong in event...because:";
			result += res.locals.running_event.result
			res.send( result + stu);
		}
	}
	else{
		res.send("event is not valid" + stu);
	}
};





eventfunc.sendReward = function(req, res, next){
    var stu = "......@sendReward";
	
	
	if(res.locals.running_event.reward_cash){
		res.locals.running_event.user.cash += res.locals.running_event.reward_cash;
	}
	
	
	if(res.locals.running_event.reward_treasure){
		
		for(var i=0; i<res.locals.running_event.reward_treasure.length; i++){
	    	var isUserOwn = false;
	    	for(var j=0; j<res.locals.running_event.user.treasures.length; j++){
	    		if(res.locals.running_event.user.treasures[j].id.toString() === res.locals.running_event.reward_treasure[i].id.toString()){
	    			isUserOwn = true;
	    			res.locals.running_event.user.treasures[j].qty += res.locals.running_event.reward_treasure[i].qty;
	    		}
	    	}
	    	if (!isUserOwn){
	    		var newOwn = {
	    		    id:	res.locals.running_event.reward_treasure[i].id,
	    			qty: Number(res.locals.running_event.reward_treasure[i].qty)
	    		};
	    		res.locals.running_event.user.treasures.push(newOwn);
	    	}
	    }
	}

	
	dbfunc.updateById(User, req.user._id, res.locals.running_event.user).then(()=>{
    	next();
    }).catch((e)=>{
    	res.send(e + stu);
    });

};


eventfunc.finish = function(req, res, next){
    var stu = "......@finish";
	
	var uid = req.user._id.toString();
	
	res.locals.running_event.finish_uid.push(uid);

	dbfunc.updateById(Event, req.params.id, res.locals.running_event).then(()=>{
    	next();
    }).catch((e)=>{
    	res.send(e + stu);
    });

};















//each events' logic
//
//
//user's desc event
eventfunc.logic.e0001 = function(req, res){
	
	var keyobj = ""; //alway check the valve exist first!
	
	if(res.locals.running_event.user.desc){
		keyobj = res.locals.running_event.user.desc;
	} 

	if(keyobj.length>=5){
		res.locals.running_event.isSuc = true;
	}
	else{
		res.locals.running_event.isSuc = false;
		res.locals.running_event.result = "your desc is less than 5!!!"
	}
	return res.locals.running_event;
}

//user's article event
eventfunc.logic.e0002 = function(req, res){
	
	var keyobj = []; //alway check the valve exist first!
	
	if(res.locals.running_event.user.articles){
		keyobj = res.locals.running_event.user.articles;
	} 

	if(keyobj.length>=1){
		res.locals.running_event.isSuc = true;
	}
	else{
		res.locals.running_event.isSuc = false;
		res.locals.running_event.result = "nothing in your articles!!!"
	}
	return res.locals.running_event;
}

//cwb api event
eventfunc.logic.e0101 = function(req, res){
	
	var keyobj = {}; //alway check the valve exist first!
	req.body.cwbans
	//key.obj init()

	if(keyobj.Suc){
		res.locals.running_event.isSuc = true;
	}
	else{
		res.locals.running_event.isSuc = false;
		res.locals.running_event.result = "fail reason"
	}
	return res.locals.running_event;
}




//sample event
eventfunc.logic.e0000 = function(req, res){
	
	var keyobj = {}; //alway check the valve exist first!
	
	//key.obj init()

	if(keyobj.Suc){
		res.locals.running_event.isSuc = true;
	}
	else{
		res.locals.running_event.isSuc = false;
		res.locals.running_event.result = "fail reason"
	}
	return res.locals.running_event;
}












module.exports = eventfunc;