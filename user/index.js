var log = require('logger')(module);
var db = require('db');

function User(name) {
	this.name = name;
}

User.prototype.hello = function (who) {
	log.info(db.getPhrase('Hello') + ", " + who.name);
} 

module.exports = User;

/* console.log(module); */