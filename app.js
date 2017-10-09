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