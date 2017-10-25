/*------------- МОДУЛЬ WINSTON позволяет записывать логи -------------*/
var winston = require('winston');
//  log.debug() - сообщение маленькой важности
//  log.info() - сообщение средней важности
//  log.error() - сообщение об ошибке (все ошибки очень важные)
// Логгер выводит ошибки уровня info и error по умолчанию
// NODE_DEBUG - переменная окружения, которая используется внутри самого node.js, если в модуле используется данная переменная, они могут показыват, что происходит внутри них

module.exports = function (module) {
	return makeLogger(module.filename);
}

// transports - это опция то что умеет передовать информацию, например информайцию из логов
function makeLogger(path) {
	if (path.match(/.js$/)) {
		var transports = [
			new winston.transports.Console({ // Console - метод транспорта модуля winston
					timestamp: true, // время
					colorize: true, // подсветка
					level: 'info' // информация урвоня info и выше
			}),

			new winston.transports.File({ // File - метод транспорта модуля winston (записывает в файл debug.log) вообще все
				filename: 'debug.log',
				level: 'debug'
			})
		];
		
		return new winston.Logger({transports: transports});
	} else {
		return new winston.Logger({
			transports: []
		});
	}
}