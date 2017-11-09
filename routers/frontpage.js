var express = require("express");
var router = express.Router();

router.get("/frontpage", (req, res) => {
	res.render("frontpage/index");
});

module.exports = router;
