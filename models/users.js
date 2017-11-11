"use strict";
module.exports = (sequelize, DataTypes) => {
	var Users = sequelize.define(
		"Users",
		{
			fname: DataTypes.STRING,
			lname: DataTypes.STRING,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			profileId: DataTypes.INTEGER
		},
		{
			classMethods: {
				associate: function(models) {
					// associations can be defined here
					Users.hasOne(models.Profiles, {
						foreignKey: "userId"
					});

					Users.hasMany(models.Likes, {
						foreignKey: "liker"
					});

					Users.hasMany(models.Likes, {
						foreignKey: "likee"
					});

					Users.belongsToMany(models.Users, {
						through: models.Likes,
						as: "likesTable",
						foreignKey: "liker"
					});

					Users.belongsToMany(models.Users, {
						through: models.Likes,
						as: "likesTable",
						foreignKey: "likee"
					});
				}
			}
		}
	);
	return Users;
};
