var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var multer  = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post("/createpc", function (req, res) {

    console.log(req.body);
    var make = req.body.Make;
    var model = req.body.Model;
    var serial = req.body.Serial;
    var CPU = req.body.CPU;
    var RAM = req.body.RAM;
    var storage = req.body.HDD;
    var description = req.body.Description;
    var status = req.body.Status;
    var NewOrder = {make: make,model: model, storage: storage, RAM: RAM, serial: serial, CPU: CPU, description: description, status: status};

    var con = mysql.createConnection({
        host: "192.168.4.140",
        user: "root",
        password: "passw0rd",
        database: "Servicedesk"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO PC (PCMake, PCModel, Serial, CPU, RAM, Storage, Description, ItemStatus) VALUES ('"+make+"', '"+model+"', '"+serial+"', '"+CPU+"', '"+RAM+"', '"+storage+"', '"+description+"', '"+status+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;

          console.log("1 record inserted");
          con.end();
        });
    });
});

app.get("/createpc", function (req, res) {
    res.sendFile(__dirname+"/views/createpc.html");
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })