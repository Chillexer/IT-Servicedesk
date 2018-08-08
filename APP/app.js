var methodOverride = require("method-override"),
  // LocalStrategy  = require("passport-local"),
  bodyParser = require("body-parser"),
  // passport       = require("passport"),
  express = require("express"),
  app = express(),
  server = require('http').Server(app),
  SQL = require('./Functions'),
  io = require('socket.io')(server);

var shopRoutes = require(__dirname + "/routes/shop");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.use(methodOverride("_method"));

io.on('connection', function (socket) {
  socket.on('ShopElements', function () {
    SQL.GetShopElements(function (err, data) {
      if (err) throw err;
      socket.emit("ShopElementResponse", data);
    });
  });
  socket.on('ProductElement', function (ID) {
    SQL.GetProduct(ID, function (err, data) {
      if (err) throw err;
      socket.emit("ProductElementResponse", data);
    });
  });
  socket.on('OrderElement', function (Criteria) {
    SQL.GetOrder(Criteria, function (err, data) {
      if (err) throw err;
      socket.emit("OrderElementResponse", data);
    });
  });

  socket.on('RAMOptions', function () {
    SQL.GetRAMOptions(function (err, data) {
      if (err) throw err;
      socket.emit("RAMOptionsResponse", data);
    });
  });
  socket.on('SQLQuery', function (sqlstring) {
    SQL.SocketQuery(sqlstring, function (err, data) {
      if (err) throw err;
      socket.emit("SQLQueryResponse", data);

    });
  });
});






// Routes Configurations
app.use(shopRoutes);

server.listen(80, function () {
  console.log("Server has started!!!");
});