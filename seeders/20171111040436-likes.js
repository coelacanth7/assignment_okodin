"use strict";

var models = require("./../models");

module.exports = {
	up: (queryInterface, Sequelize) => {
		var likes = [];

		for (var i = 1; i < 100; i++) {
			for (var j = 1; j < 100; j += 3) {
				var views = true;
				if (j % 2 === 0) {
					views = false;
				}

				likes.push({
					liker: i,
					likee: j,
					views: views
				});
			}
		}

		return queryInterface.bulkInsert("Likes", likes);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Likes", null, {}, models.Likes);
	}
};
