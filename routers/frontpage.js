var express = require("express");
var router = express.Router();

const seqeulize = require("sequelize");
var models = require("./../models");
var sequelize = models.sequelize;
var Users = models.Users;
var Profiles = models.Profiles;

router.get("/frontpage", (req, res) => {
	// Find all users for frontpage
	Users.findAll({
		include: [{ model: Profiles }]
	}).then(users => {
		// console.log("users: ", JSON.stringify(users, 0, 2));
		res.render("frontpage/index", { users });
	});
});

module.exports = router;

//sequelize model:create --name Profiles --attributes "aboutMe:text talents:text favoriteThings:text yMsgMe:text userId:integer gender:string age:integer distance:integer height:string school:string kids:integer occupation:string bodyType:string image:string lastLogin:date"
