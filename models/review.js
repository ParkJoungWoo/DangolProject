"use strict";
module.exports = (sequelize, DataTypes) => {
	const review = sequelize.define("Review", {
        market_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: false
		},
        avg_star: {
			type: DataTypes.INTEGER,
			allowNull: true,
			autoIncrement: false
		},
        star_num: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: false
		},
        content: {
			type: DataTypes.STRING,
			allowNull: false,
			autoIncrement: false
		}    
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'Review',
		timestamps: false,
		tableName: "review"
	});
	return review;
};
