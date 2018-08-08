var express = require("express"),
    router = express.Router();
var path = require('path');
var SQL = require("./../Functions");


router.post("/bestilling", function (req, res) {
    SQL.InsertOrder(req.body, function (err, data) {
        if (err) throw err;
        var id = data[0][0]["LAST_INSERT_ID()"];
        SQL.SQLQuery("SELECT Customer.Mail FROM Waitinglist, Customer WHERE Waitinglist.ID ="+id+" AND Waitinglist.CustomerID = Customer.ID;", function (err, data) {
            if (err) throw err; 
            res.redirect("/ordre/"+data[0].Mail + "/" + id);
        });
        
    });
});


router.get("/bestilling/:id", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../views/bestilling.html"));
});


router.get("/product/:id", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../views/product.html"));
});

router.get("/ordre/*", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../views/ordre.html"));
});

// standard route
router.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../views/shop.html"));
});


module.exports = router;