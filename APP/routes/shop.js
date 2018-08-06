var express  = require("express"),
    router   = express.Router();
var path = require('path');

// standard route
router.get("/", function (req, res) {
    res.sendFile( path.resolve(__dirname +"/../views/shop.html"));
});

router.get("/product/:id", function (req, res){
    res.sendFile(path.resolve(__dirname +"/../views/product.html"));
});



module.exports = router;