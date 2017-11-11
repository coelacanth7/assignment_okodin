"use strict";
module.exports = (sequelize, DataTypes) => {
	var Likes = sequelize.define(
		"Likes",
		{
			liker: DataTypes.INTEGER,
			likee: DataTypes.INTEGER,
			views: DataTypes.BOOLEAN
		},
		{
			classMethods: {
				associate: function(models) {
					// associations can be defined here
					Likes.belongsTo(models.Users, {
						foreignKey: "liker",
						otherKey: "likee"
					});
				}
			}
		}
	);
	return Likes;
};
