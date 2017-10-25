/*------------- Таймеры в NodeJS -------------*/

fs.open(__filename, "r", function (err, file) {
	console.log("IO!");
});

setImmediate(function () { // сработала последней, так она запланировала (планирует выполнение на следующей итерации цилка LibUV, после обработки событий), либо хотим что-то сделать асинхронно, либо разбиваем сложную задачу на части
	console.log('immediate');
});
process.nextTick(function() { // process.nextTick вызовется первым, потмоу что планируется по оканчанию текущего js, но до callback (событий ввода/вывода)
	console.log('nextTick');
});

/* var server = new http.Server(function (req, res) {
	res.end("Таймеры NodeJS");
}).listen(3000); */

setTimeout(function() {
	server.close(function () {
		// process.exit(); либо прибиваем процесс
		// clearInterval(timer); либо очищаем интервал
	}); // server.close() сервер прекращает принимать принимать новые соединения, но пока есть принятые, но неоконченные запросы, они еще будут обрабатываться и только тогда процесс прекратится(сервер останавляивается)
}, 2500);

var timer = setInterval(function() {
	console.log(process.memoryUsage());
}, 1000);

timer.unref(); // метод unref указывает LibUV, что таймер является второстепенным, его не следует учитывать при проверке внутренних вотчеров на завершение процесса
timer.ref(); // работает наоборот, в отличие от unref