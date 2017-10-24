/*------------- МОДУЛЬ WINSTON позволяет записывать логи -------------*/
var log = require('logger')(module);
//  log2.debug() - сообщение маленькой важности
//  log2.info() - сообщение средней важности
//  log2.error() - сообщение об ошибке (все ошибки очень важные)
// Логгер выводит ошибки уровня info и error по умолчанию
// NODE_DEBUG - переменная окружения, которая используется внутри самого node.js, если в модуле используется данная переменная, они могут показыват, что происходит внутри них


//Подключение базы данных 
var db = require('db');
db.connect();


var util = require('util');

// Запуск сервера
var http = require('http');
var url = require('url');

/* МОДУЛЬ FS(файловая система) */
var fs = require('fs');

/* Синхронный вызов */
// Блокирует => используется там, где нет параллелизма
// Работает try...catch
// Прост и понятен
http.createServer(function(req, res) {
	var info;
	
	if (req.url == '/') {

		try {
			info = fs.readFileSync('index.html');
		} catch(err) {
			console.error(err);
			res.statusCode = 500;
			res.end('На сервере произошла ошибка');
			return;
		}
		res.end(info);
	} else {
		/* 404 */
	}
}).listen(3000);

/* Асинхронный вызов */
// Не Блокирует
// Не Работает try->catch(работает, но есть err в callback) => callback(err), очень важно обрабатывать ошибки, хоть как-нибуть
// Сложнее(есть способы упростить себе жизнь)
http.createServer(function(req, res) {
	var info;
	
	if (req.url == '/') {
		info = fs.readFile('index.html', function (err, info) {
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.end('На сервере произошла ошибка');
				return;
			}
			res.end(info);
		});
	} else {
		/* 404 */
	}
}).listen(3000);


// Подключаемые модули
var User = require('user');

function run () {
	var petya = new User("Петя");
	var vasya = new User("Вася");
	
	vasya.hello(petya);

	log.info(db.getPhrase("Run is successfuled"));
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}

/* var server = new http.Server(); // Сервер является EventEmmiter
server.listen(1337, '127.0.0.1');

var counter = 0;
server.on('request', function(req, res) {
	// req - входящий запрос, сервер получает то, что присылает бразуер, включая url, пришедшего запроса
	// response -  объект ответа, обязателен res.end();
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
	res.end("Привет, мир!" + ++counter);
}); */

/*  var server = new http.Server(function(req, res) {
	log.info(util.format("%s: %j", "Ответы(то, что присылает) бразуера", req.headers));

	console.log('Метод: ' + req.method, '\n' + 'Url: ' + req.url);
	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);

	if (req.method == 'GET' && urlParsed.pathname == '/' && urlParsed.query.message) {
		var message = urlParsed.query.message
		res.setHeader('Cache-control', 'no-cache');
		log.debug(message);
		res.end(message);
	} else {
		log.error("Unknown URL");
		res.statusCode = 404;
		res.end("Page not found");
	}
});

server.listen(1337, '127.0.0.1'); */