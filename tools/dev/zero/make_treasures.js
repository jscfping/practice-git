var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/cloud_demo", {useNewUrlParser: true});


var Treasure = require("../../../models/treasure");

var ts;


ts = new Treasure({
	id: 1,
	name: "高興每一天",
    image: "/images/userimages/happy.png",
	description: "每天都笑嘻嘻~~",
	category: "userimage",
	price: 20
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////

ts = new Treasure({
	id: 2,
	name: "怕",
    image: "/images/userimages/pa.png",
	description: "好像怎麼了...怕怕的...",
	category: "userimage"
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////


ts = new Treasure({
	id: 3,
	name: "淡定",
    image: "/images/userimages/redtea.png",
	description: "你要喝杯紅茶嗎.....?",
	category: "userimage"
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////


ts = new Treasure({
	id: 4,
	name: "愛",
    image: "/images/treasures/images/word_00.png",
	description: "是動詞，也是名子",
	category: "word",
	ishotsold: true,
	isrecommend: true
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////


ts = new Treasure({
	id: 5,
	name: "平",
    image: "/images/treasures/images/word_01.png",
	description: "代表和平、和順",
	category: "word",
	ishotsold: true,
	price: 999
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////



ts = new Treasure({
	id: 6,
	name: "家",
    image: "/images/treasures/images/word_02.png",
	description: "一個傑出的書法字...",
	category: "word"
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////



ts = new Treasure({
	id: 7,
	name: "鳳",
    image: "/images/treasures/images/word_03.png",
	description: "一個傑出的書法字...",
	category: "word"
});

ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////


ts = new Treasure({
	id: 8,
	name: "飛",
    image: "/images/treasures/images/word_04.png",
	description: "一個傑出的書法字...",
	category: "word",
	isrecommend: true
});

ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////


ts = new Treasure({
	id: 9,
	name: "金句良言0",
    image: "/images/treasures/images/str_00.png",
	description: "原來如此！要好好緊記在心！時時督促自己~~",
	category: "string"
});
ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
/////////////////////////////////////////////////////////



ts = new Treasure({
	id: 10,
	name: "金句良言1",
    image: "/images/treasures/images/str_01.png",
	description: "又上了一課呢~~~感謝英國的努力www",
	category: "string"
});

ts.save(function (err, ty) {
    if (err) return console.error(err);
    console.log(ty+ "...added...");
});
