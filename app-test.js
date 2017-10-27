var server = require('server');

server.run();

/*------------- МОДУЛЬ(ОБЪЕКТ) UTIL -------------*/
var util = require('util');

/* 1. красиво выведт любой объект, можно и просто так: console.log(obj); Также имеются доп. параметры */
var obj = { a: 5, b: 6 }
obj.self = obj;
console.log(util.inspect(obj/*, {...} */));

/* 2. получает строку, а дальше: 1) вместо %s, будет выведена строка "string", 2) вместо %d, будет число 123, 3) вместо %j, будет объект в формате JSON*/
console.log(util.format("My %s %d %j", "string", 123, {test: "obj"}));

/* 3. util.inherits() создает наследование, внутри это метода лежит Object.create()*/
function Animal(name) {
	this.name = name;
}
Animal.prototype.walk = function () {
	console.log("Ходит " + this.name);
}

function Rabbit(name) {
	this.name = name;
}
util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function () {
	console.log("Прыгает " + this.name);
}
var rabbit = new Rabbit("наш кролик");
rabbit.walk();
rabbit.jump();


/*------------- МОДУЛЬ(ОБЪЕКТ) CONSOLE -------------*/

/* 1. Использует util.format, util.inspect */
/* 2. console - это глобальная переменная, её не надо подключать(require) */
/* 3. Имеет всего два метода: console.log() и console.error() */
console.log("Log"); // = info (out)
console.error("Error"); // = warn (err)


/*------------- ОБЪЕКТ ERROR -------------*/
var phrases = {
	"Hello": "Привет",
	"world": "мир"
};


function PhraseError(message) {
	this.message = message;
	Error.captureStackTrace(this, PhraseError);
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
	this.status = status;
	this.message = message;
	Error.captureStackTrace(this, HttpError)
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';



function getPhrase(name) {
	if (!phrases[name]) {
		throw new PhraseError("Нет такой фразы: " + name);
	}
	return phrases[name];
}

function makePage(url) {
	if (url != 'index.html') {
		throw new HttpError(404, "Нет такой страницы");
	}
	return util.format("%s, %s!", getPhrase("Hello"), getPhrase("world"));
}

try {
	var page = makePage('index.html');
	console.log(page);	
} catch (e) {
	if (e instanceof HttpError) {
		console.error(e.status, e.message);
	} else {
		console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack);
	}
}


/*------------- ОБЪЕКТ EVENTEMITTER -------------*/  /* ? ЕЩЁ РАЗ РАЗОБРАТЬ */
/* Основной объект, реализующий работу с событиями в node.js, остальные встроенные объекты(работающие с событиями) наследуются от него */
var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

/* метод подписка "on" */
server.on('request', function(request) {
	request.approved = true;
});

server.on('request', function(request) {
	console.log(request);
});

/* генерит событие и передает данные(эти данные попадают в функцию обработчик) "emit" */
server.emit('request', {from: "Клиент"});
server.emit('request', {from: "Ещё Клиент"});

console.log(util.inspect(server.listeners('request')));

/*------------- SUPERVISOR (процесс разработки) позволяет перезапустить node автоматически-------------*/ 

/*------------- МОДУЛЬ NODE-INSPECTOR позволяет отлаживать (нужно устанавливать) -------------*/