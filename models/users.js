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
				}
			}
		}
	);
	return Users;
};
