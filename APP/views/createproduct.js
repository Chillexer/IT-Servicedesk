var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var multer  = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post("/createproduct", function (req, res) {

    console.log(req.body);
    var make = req.body.Make;
    var model = req.body.Model;
    var Image = req.body.Image;
    var CPU = req.body.CPU;
    var RAMID = req.body.RAMID;
    var HDDID = req.body.HDDID;
    var OS = req.body.OS;
    var description = req.body.Description;
    var Price = req.body.Price;
    var NewOrder = {make: make,model: model, HDDID: HDDID, RAMID: RAMID, Image: Image, CPU: CPU, description: description, Price: Price};

    var con = mysql.createConnection({
        host: "192.168.4.140",
        user: "root",
        password: "passw0rd",
        database: "Servicedesk"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO Showroom (PCMake, PCModel, Picture, CPU, RAMID, HDDID, OS, Description, Price) VALUES ('"+make+"', '"+model+"', '"+Image+"', '"+CPU+"', '"+RAMID+"', '"+HDDID+"', '"+OS+"', '"+description+"', '"+Price+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;

          console.log("1 record inserted");
          con.end();
        });
    });
});

app.get("/createproduct", function (req, res) {
    res.sendFile(__dirname+"/views/createproduct.html");
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })