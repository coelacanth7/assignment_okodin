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
	})
		.then(users => {
			// console.log("users: ", JSON.stringify(users, 0, 2));
			req.method = "GET";
			res.render("frontpage/index", { users });
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

// POST A FILTER SEARCH
router.post("/search", (req, res) => {
	console.log("SEARCH");

	if (req.body.profile.gender === undefined) {
		req.body.profile.gender[0] = "male";
		req.body.profile.gender[1] = "female";
	}

	Users.findAll({
		include: [
			{
				model: Profiles,
				where: {
					$or: [
						{ gender: req.body.profile.gender },
						{ gender: req.body.profile.gender[0] },
						{ gender: req.body.profile.gender[1] }
					],
					age: { $gte: req.body.profile.age },
					height: { $gte: req.body.profile.height },
					kids: req.body.profile.kids,
					distance: { $gte: req.body.profile.distance }
				}
			}
		]
	})
		.then(users => {
			// console.log("users: ", JSON.stringify(users, 0, 2));
			res.render("frontpage/index", { users });
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

//a redirect for myprofile
router.get("/myprofile", (req, res) => {
	res.redirect(`/profile/${req.session.currentUser.username}`);
});

// find one user
router.get("/profile/:username", (req, res) => {
	// edit profile button on show page IFF user is current user logged in
	var currentUserBtn = null;
	if (req.session.currentUser.username === req.params.username) {
		currentUserBtn = true;
	}
	Users.find({
		where: { username: req.params.username },
		include: [{ model: Profiles }]
	})
		.then(user => {
			// console.log("user: ", JSON.stringify(user, 0, 2));
			res.render("frontpage/show", { user, currentUserBtn });
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

//get a users edit profile page
router.get("/editprofile/:username", (req, res) => {
	Users.find({
		where: { username: req.params.username },
		include: [{ model: Profiles }]
	})
		.then(user => {
			res.render("frontpage/edit", { user });
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

// router post from edit profile
router.post("/submitprofilechanges/:username", (req, res) => {
	//here i go
	Profiles.update(
		{
			aboutMe: req.body.user.aboutMe,
			talents: req.body.user.talents,
			favoriteThings: req.body.user.favoriteThings,
			yMsgMe: req.body.user.yMsgMe,
			gender: req.body.user.gender,
			age: req.body.user.age,
			distance: req.body.user.distance,
			height: req.body.user.height,
			school: req.body.user.school,
			kids: req.body.user.kids,
			occupation: req.body.user.occupation,
			bodyType: req.body.user.bodyType
		},
		{
			where: { userId: req.session.currentUser.id },
			limit: 1
		}
	)
		.then(() => {
			console.log("great job");
			res.redirect(`/profile/${req.params.username}`);
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

module.exports = router;

//sequelize model:create --name Profiles --attributes "aboutMe:text talents:text favoriteThings:text yMsgMe:text userId:integer gender:string age:integer distance:integer height:string school:string kids:integer occupation:string bodyType:string image:string lastLogin:date"

// sequelize model:create --name Likes --attributes "liker:integer likee:integer views:boolean"

// associative table
//
// viewer   viewee likes  date
// 1        2      true
// 1        3      false
