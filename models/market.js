"use strict";
module.exports = (sequelize, DataTypes) => {
	const market = sequelize.define("Market", {
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: true,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		likenum: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		local: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		seatnum: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		M_1: {
			type: DataTypes.BOOL,
			allowNull: false,
		},
		M_2: {
			type: DataTypes.BOOL,
			allowNull: false,
		},
		M_3: {
			type: DataTypes.BOOL,
			allowNull: false,
		},
		M_4: {
			type: DataTypes.BOOL,
			allowNull: false,
		},
		categ: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		mood: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		weather: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'Market',
		timestamps: false,
		tableName: "market"
	});
	return market;
};
