"use strict";
module.exports = (sequelize, DataTypes) => {
	const review = sequelize.define("Review", {
		index: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: true,
			primaryKey: true,
			autoIncrement: true
		},
        market_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
