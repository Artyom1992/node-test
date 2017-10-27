/*------------- МОДУЛЬ FS(файловая система) -------------*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/public/';

http.createServer(function (req, res) {
	console.log('Имя урла ' + url.parse(req.url).pathname);
	if (!checkAccess(req)) {
		res.statusCode = 403;
		res.end("Tell me the secret to access!");
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);
}).listen(1337);

function checkAccess(req) {
	return url.parse(req.url, true).query.secret == 'o';
}

function sendFileSafe(filePath, res) {
	try {
		filePath = decodeURIComponent(filePath);
	} catch (e) {
		res.statusCode = 400;
		res.end("Bad Request");
		return;
	}

	if (~filePath.indexOf('\0')) {
		res.statusCode = 400;
		res.end("Bad Request");
		return;
	}

	filePath = path.normalize(path.join(ROOT, filePath));
	console.log('Второе Имя урла ' + filePath);
	console.log('Второе Имя урла2 ' + ROOT);
	
	if (~filePath.indexOf(ROOT)) {
		console.log('есть совпадение!');
		res.statusCode = 404;
		res.end("File not found");
		return;
	}

	fs.stat(filePath, function(err, stats){
		if (err || !stats.isFile()) {
			res.statusCode = 404;
			res.end("File not found");
			return;
		}

		sendFile(filePath, res);
	});
}

function sendFile(filePath, res) {

	fs.readFile(filePath, function(err, content) {
		if (err) throw err;

		var mime = require('mime').lookup('text/html');
		console.log(mime.lookup('text/html')); // проверяет расширение
		res.setHeader('Content-type', mime + "; charset=utf-8");
		res.end(content);
	});
}

/* fs.readFile(__filename , function(err, data) {
	if (err) {
		if(err.code = 'ENOENT') {
			console.error(err.message);
		} else {
			console.log(err);
		}
	} else {
		console.log(data.toString());
	}
}); */