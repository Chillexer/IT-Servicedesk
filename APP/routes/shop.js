var express  = require("express"),
    router   = express.Router();
var path = require('path');
var mysql = require('mysql');


router.post("/bestilling", function (req, res) {

    //console.log(req.body);
    var model = req.body.model;
    var storage = req.body.storage;
    var RAM = req.body.RAM;
    var OS = req.body.OS;
    var customerID = "3";
    var showroomID = "1";
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var NewOrder = {model: model, storage: storage, RAM: RAM, OS: OS, firstname: firstname, lastname: lastname, address: address, mail: mail, phone: phone};

    var con = mysql.createConnection({
        host: "192.168.4.140",
        user: "root",
        password: "passw0rd",
        database: "Servicedesk"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO Customer (FirstName, LastName, Address, Phone) VALUES ('"+firstname+"', '"+lastname+"', '"+address+"', '"+phone+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;

          else {
            if (err) throw err;
            var sql = "INSERT INTO Waitinglist (CustomerID, ShowroomID, RAM, Lagring) VALUES ('"+customerID+"', '"+showroomID+"', '"+RAM+"', '"+storage+"')";
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
              con.end();
            });
        }
        });
    });
});


router.get("/bestilling/:id", function (req, res) {
    res.sendFile(path.resolve(__dirname +"/../views/bestilling.html"));
});




// standard route
router.get("/", function (req, res) {
    res.sendFile( path.resolve(__dirname +"/../views/shop.html"));
});

router.get("/product/:id", function (req, res){
    res.sendFile(path.resolve(__dirname +"/../views/product.html"));
});



module.exports = router;