"use strict";

var faker = require("faker");

module.exports = {
	up: (queryInterface, Sequelize) => {
		var profiles = [];

		console.log("Creating Profiles");
		for (var i = 1; i < 100; i++) {
			var aboutMe = faker.random.words(50);
			var talents = faker.random.words(50);
			var favoriteThings = faker.random.words(50);
			var yMsgMe = faker.random.words(50);
			var userId = i;
			var gender = "male";
			var age = 20 + i % 16;
			var distance = i % 30;
			var height = 60 + i % 16;
			var school = "University of " + faker.address.city();
			var kids = i % 3;
			var occupation = faker.name.jobTitle();
			var bodyType = "built like a thunder god";
			var image = "images/viking_guy.jpg";
			var lastLogin = faker.date.recent();

			if (i % 2 === 0) {
				gender = "female";
				image = "images/viking_girl.jpg";
			}

			profiles.push({
				aboutMe,
				talents,
				favoriteThings,
				yMsgMe,
				userId,
				gender,
				age,
				distance,
				height,
				school,
				kids,
				occupation,
				bodyType,
				image,
				lastLogin
			});

			return queryInterface.bulkInsert("Profiles", profiles);
		}
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Profiles", null, {}, models.Profiles);
	}
};
