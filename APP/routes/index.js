var express  = require("express"),
    router   = express.Router();

// standard route
router.get("/", function (req, res) {
    res.render("landing");
});

// ============
// Auth Routes
// ============



module.exports = router;