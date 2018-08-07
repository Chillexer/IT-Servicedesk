var express  = require("express"),
    router   = express.Router();
var path = require('path');
var SQL = require("./../Functions");
var mysql = require('mysql');


router.post("/bestilling", function (req, res) {
SQL.InsertOrder(req.body,function(err,data){
    if(err) throw err;
    res.redirect("/");
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