// подключение express
var express = require("express");

// создадим объект приложения
var app = express();

// определяем обработчик для маршрута
app.use(function (req, res, next) { // промежуточная функция(middleware)
	console.log("Middleware 1");
	next();
});

app.use("/news", function(req, res){
  console.log("About Middleware");
  res.send("<h2>Новости сайта</h2>");
});

app.get('/', function(req, res) { // app.get() обрабатывает get-запросы протокола HTTP
	console.log("Route /");
	res.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);

// console.log(express);