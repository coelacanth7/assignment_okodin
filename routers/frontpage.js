var express = require("express");
var router = express.Router();

const seqeulize = require("sequelize");
var models = require("./../models");
var sequelize = models.sequelize;
var User = models.Users;

router.get("/frontpage", (req, res) => {
	// Find all users for frontpage
	User.findAll().then(users => {
		res.render("frontpage/index", { users });
	});
});

module.exports = router;

//sequelize model:create --name Profiles --attributes "aboutMe:text talents:text favoriteThings:text yMsgMe:text userId:integer gender:string age:integer distance:integer height:string school:string kids:integer occupation:string bodyType:string image:string lastLogin:date"
