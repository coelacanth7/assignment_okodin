"use strict";
module.exports = (sequelize, DataTypes) => {
	var Profiles = sequelize.define(
		"Profiles",
		{
			aboutMe: DataTypes.TEXT,
			talents: DataTypes.TEXT,
			favoriteThings: DataTypes.TEXT,
			yMsgMe: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			gender: DataTypes.STRING,
			age: DataTypes.INTEGER,
			distance: DataTypes.INTEGER,
			height: DataTypes.INTEGER,
			school: DataTypes.STRING,
			kids: DataTypes.INTEGER,
			occupation: DataTypes.STRING,
			bodyType: DataTypes.STRING,
			image: DataTypes.STRING,
			lastLogin: DataTypes.DATE
		},
		{
			classMethods: {
				associate: function(models) {
					// associations can be defined here
					Profiles.belongsTo(models.Users, {
						foreignKey: "userId"
					});
				}
			}
		}
	);
	return Profiles;
};
