"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Profiles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			aboutMe: {
				type: Sequelize.TEXT
			},
			talents: {
				type: Sequelize.TEXT
			},
			favoriteThings: {
				type: Sequelize.TEXT
			},
			yMsgMe: {
				type: Sequelize.TEXT
			},
			userId: {
				type: Sequelize.INTEGER
			},
			gender: {
				type: Sequelize.STRING
			},
			age: {
				type: Sequelize.INTEGER
			},
			distance: {
				type: Sequelize.INTEGER
			},
			height: {
				type: Sequelize.INTEGER
			},
			school: {
				type: Sequelize.STRING
			},
			kids: {
				type: Sequelize.INTEGER
			},
			occupation: {
				type: Sequelize.STRING
			},
			bodyType: {
				type: Sequelize.STRING
			},
			image: {
				type: Sequelize.STRING
			},
			lastLogin: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW")
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW")
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW")
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Profiles");
	}
};
