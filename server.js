var log = require('logger')(module);
var db = require('db');
db.connect();

var User = require('user');

function run () {
	var petya = new User("Петя");
	var vasya = new User("Вася");
	
	vasya.hello(petya);

	log(db.getPhrase("Run is successfuled"));
}


if (module.parent) {
	exports.run = run;
} else {
	run();
}


// Запуск сервера
var http = require('http');
var url = require('url');
var server = new http.Server(function(req, res) {
	console.log('Метод: ' + req.method, '\n' + 'Url: ' + req.url);

	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);

	if (urlParsed.pathname = '/echo' && )
});

server.listen(1337, '127.0.0.1');