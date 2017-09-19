var log = require('logger')(module);
var db = require('db');
db.connect();

var user = require('user');

function run () {
	var petya = new user("Петя");
	var vasya = new user("Вася");
	
	vasya.hello(petya);

	log(db.getPhrase("Run is successfuled"));
}



/* var http = require('http');
var server = new http.Server();

server.listen(1337, '127.0.0.1');

server.on('request', function(req, res) {
	res.end("Привет мир!");
}); */

if (module.parent) {
	exports.run = run;
} else {
	run();
}