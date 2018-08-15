var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post("/createUser", function (req, res) {

    console.log(req.body);
    var BrugerNavn = req.body.BrugerNavn;
    var Password = req.body.Password;
    var Email = req.body.Email;

    var NewOrder = {BrugerNavn: BrugerNavn,Password: Password, Email: Email};

    var con = mysql.createConnection({
        host: "192.168.4.140",
        user: "root",
        password: "passw0rd",
        database: "Servicedesk"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO Employee (UserName, PASSWD, Email, Active) VALUES ('"+BrugerNavn+"', '"+Password+"', '"+Email+"','"+1+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;

          console.log("1 record inserted");
          con.end();
        });
    });
});

app.get("/createUser", function (req, res) {
    res.sendFile(__dirname+"/OpretBruger.html");
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })