var methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    server = require('http').Server(app),
    SocketIO = require('./Socket.io'),
    io = require('socket.io')(server);
  // LocalStrategy  = require("passport-local"),
  // passport       = require("passport"),
  

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

server.listen(80,"127.0.0.1", function () {
  console.log("Server has started!!!");
});