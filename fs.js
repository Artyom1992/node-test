/*------------- МОДУЛЬ FS(файловая система) -------------*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/template';

http.createServer(function (req, res) {
	if (!checkAccess(req)) {
		res.statusCode = 403;
		res.end("Tell me the secret to access!");
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req) {
	return url.parse(req.url, true).query.secret == 'o_Och'
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