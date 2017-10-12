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

/* var server = new http.Server(); // Сервер является EventEmmiter
server.listen(1337, '127.0.0.1');

var counter = 0;
server.on('request', function(req, res) {
	// req - входящий запрос, получает то, что присылает бразуер, включая url, пришедшего запроса
	// response -  объект ответа, обязателен res.end();
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	res.end("Привет, мир!" + ++counter);
}); */

 var server = new http.Server(function(req, res) {
	console.log(req.headers);

/* 	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

	console.log('Метод: ' + req.method, '\n' + 'Url: ' + req.url);
	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);

	if (urlParsed.pathname = '/' && urlParsed.query.message) {
		res.end(urlParsed.query.message)
	} else {
		res.statusCode = 404;
		res.end("Page not found");
	} */
});

server.listen(1337, '127.0.0.1');