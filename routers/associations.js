var express = require("express");
var router = express.Router();

const seqeulize = require("sequelize");
var models = require("./../models");
var sequelize = models.sequelize;
var Users = models.Users;
var Profiles = models.Profiles;
var Likes = models.Likes;

//get people who have liked you
router.get("/likes", (req, res) => {
	Likes.findAll({
		where: {
			likee: req.session.currentUser.id,
			views: false
		},
		include: [
			{
				model: Users,
				include: [
					{
						model: Profiles
					}
				]
			}
		]
	}).then(likes => {
		// console.log("LIKES", JSON.stringify(likes, 0, 2));
		res.render("associations/likes", { likes });
	});
});

// this dont work
router.get("/peopleyouhaveliked", (req, res) => {
	Likes.findAll({
		where: {
			liker: req.session.currentUser.id,
			views: false
		},
		include: [
			{
				model: Users,
				as: "likee",
				include: [
					{
						model: Profiles
					}
				]
			}
		]
	}).then(likes => {
		console.log("LIKES", JSON.stringify(likes, 0, 2));
		res.render("associations/peopleyouhaveliked", { likes });
	});
});

//get people who have viewed you
router.get("/views", (req, res) => {
	Likes.findAll({
		where: {
			likee: req.session.currentUser.id,
			views: true
		},
		include: [
			{
				model: Users,
				include: [
					{
						model: Profiles
					}
				]
			}
		]
	}).then(views => {
		console.log("VIEWS", JSON.stringify(views, 0, 2));
		res.render("associations/views", { views });
	});
});

module.exports = router;
