
//handling UTC tag's string
var gmt = new Date();
gmt = gmt.getTimezoneOffset()/(-60);
if(gmt>=0){
		gmt = "+" + gmt.toString();
}
else{
    gmt = gmt.toString();
}

document.querySelectorAll("UTC").forEach(function(el){
	var elnum = Number(el.textContent);
	if(elnum){
		var utctime = new Date(elnum);
	    el.textContent = utctime.toLocaleString() + "(GMT" + gmt + ")";
	}
});