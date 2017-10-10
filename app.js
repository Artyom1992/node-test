var server = require('server');
var util = require('util');

/* МОДУЛЬ(ОБЪЕКТ) UTIL */

/* 1. красиво выведт любой объект, можно и просто так: console.log(obj); Также имеются доп. параметры */
var obj = { a: 5, b: 6 }
obj.self = obj;
console.log(util.inspect(obj/*, {...} */));

/* 2. получает строку, а дальше: 1) вместо %s, будет выведена строка "string", 2) вместо %d, будет число 123, 3) вместо %j, будет объект в формате JSON*/
console.log(util.format("My %s %d %j", "string", 123, {test: "obj"}));


/* 3. создает наследование, внутри это метода лежит Object.create()*/
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


server.run();

/* МОДУЛЬ(ОБЪЕКТ) CONSOLE */
/* 1. Использует util.format, util.inspect */
/* 2. console - это глобальная переменная, её не надо подключать(require) */
/* 3. Имеет всего два метода: console.log() и console.error() */
console.log("Log"); // = info (out)
console.error("Error"); // = warn (err)


/* ОБЪЕКТ Error */

var phrases = {
	"Hello": "Привет",
	"world": "мир"
};


function PhraseError(message) {
	this.message = message;
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
	this.status = status;
	this.message = message;
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
	return util.format("%s, %s!", getPhrase("Hell"), getPhrase("world"));
}

var page = makePage('index.ht');
console.log(page);