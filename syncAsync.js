
/*------------- СИНХРОННЫЕ И АСИНХРОННЫЕ ВЫЗОВЫ -------------*/
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
		// 404
	}
}).listen(3000);

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
		// 404
	}
}).listen(3000);