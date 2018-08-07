var methodOverride = require("method-override"),
  // LocalStrategy  = require("passport-local"),
  bodyParser = require("body-parser"),
  // passport       = require("passport"),
  mysql = require('mysql'),
  express = require("express"),
  app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var shopRoutes = require(__dirname + "/routes/shop");


io.on('connection', function (socket) {
  socket.on('ShopElements', function () {
    GetShopElements(function (err, data) {
      if (err) throw err;
      socket.emit("ShopElementResponse", data);
    });
  });
//Mangler at blive lavet
  socket.on('ProductElement', function (ID) {
    GetProduct(ID ,function (err, data) {
      if (err) throw err;
      socket.emit("ProductElementResponse", data);
    });
  });
});

// seed the database
// seedDB();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.use(methodOverride("_method"));

function GetShopElements(callback) {
  SQLQuery("CALL GetShopElements()", function (err, data) {
    callback(err, data);
  });
}

function GetProduct(ID,callback) {
    SQLQuery("CALL GetProduct("+ ID +")", function (err, data) {
      callback(err, data);
    });
}

function SQLQuery(querystring, callback){
  var con = mysql.createConnection({
    host: "192.168.4.140",
    user: "root",
    password: "passw0rd",
    database: "Servicedesk"
  });
  con.connect(function (err) {
    if (err) throw err;
    con.query(querystring, function (err, data) {
      callback(err, data);
    });
  });
}



// Routes Configurations
app.use(shopRoutes);

server.listen(80, "192.168.0.63", function () {
  console.log("Server has started!!!");
});