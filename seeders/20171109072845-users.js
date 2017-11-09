"use strict";

var faker = require("faker");

module.exports = {
	up: (queryInterface, Sequelize) => {
		var users = [];

		console.log("Creating Users");
		for (let i = 1; i < 100; i++) {
			var fname = faker.name.firstName();
			var lname = faker.name.lastName();
			var username = faker.internet.userName();

			users.push({
				fname: fname,
				lname: lname,
				username: username,
				email: `${fname}${lname}@gmail.com`
			});
		}

		return queryInterface.bulkInsert("Users", users);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {}, models.Users);
	}
};

// $ sequelize seed:create --name users

// sequelize db:seed:all
