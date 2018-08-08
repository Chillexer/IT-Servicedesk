var methodOverride = require("method-override"),
  // LocalStrategy  = require("passport-local"),
  bodyParser = require("body-parser"),
  // passport       = require("passport"),
  express = require("express"),
  app = express(),
  server = require('http').Server(app),
  SocketIO = require('./Socket.io'); 
  io = require('socket.io')(server);

var shopRoutes = require(__dirname + "/routes/shop");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.use(methodOverride("_method"));

// Socket.io Configurations
io.on('connection', socket => SocketIO.Sockets(socket));

// Routes Configurations
app.use(shopRoutes);

server.listen(80, function () {
  console.log("Server has started!!!");
});