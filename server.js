/*------------- Подключение логгера (Модуль WINSTON) -------------*/
var log = require('logger')(module);

/*------------- Подключение базы данных -------------*/
var db = require('db');
db.connect();

var util = require('util');

// Запуск сервера
var http = require('http');
var url = require('url');


/*------------- МОДУЛЬ FS(файловая система) -------------*/
var fs = require('fs');


/*------------- Библиотека LibUV (написана на языке СИ и встроена в NodeJS) -------------*/
/* Отвечает за важные вещи:
	1. Кроссплатформенные операции ввода-вывода(работа с файлами, работа с сетью)?, много операций одновременно
	2. Поддержка основного событийного цикла NodeJS
		Запуская какой-нибудь скрипт, то он запускается в режиме цикла, который чередует выполнение JS(V8) с ожиданием различных событий ввода/вывода, срабатыванием таймеров. Цикл продолжает до тех пор, пока не появится новое событие  ввода/вывода  или срабатывание таймеров.
	3. требует асинхронности function([params, function callback(err, [params])])
	4. сложные вычисления противопоказаны, можно запустить NodeJS в режиме множества процессов
*/


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