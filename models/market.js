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
		categ: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		seatnum: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		M_1: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		M_2: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		M_3: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		M_4: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		foodtag: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		mood: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		weather: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		initialAutoIncrement: 0,
		underscored: true,
		freezeTableName: true,
		timestamps: false,
		modelName: 'Market',
		tableName: "market"
	});
	return market;
};
