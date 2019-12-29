//API
//get treasure's data
app.get("/api/treasures/:id", function(req, res){
	
	Treasure.findOne({_id: req.params.id}, function(err, found){
	    if(err){
			console.log(err);
			res.send("API can't find the treasure, or sth wrong"); 
		}
		else{
			
			// var x = found
			// console.log(x);
			// x.d = 9;
			// console.log(x); //there, x DIDN'T HAVE d!!!!!   WHICH is x['_doc']!!!!!!!!!
			// actually, x is { '$__', 'isNew', 'errors', '_doc', '$locals', '$init' }
			// console.log(x.d);

			var data = found["_doc"];
			data.releasedate = UTC(data.releasedate);

			res.json(data);

		}
	});
});