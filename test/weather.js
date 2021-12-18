"use strict";
module.exports = (sequelize, DataTypes) => {
	const wea = sequelize.define("Wea", {
		weather_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
        weather_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
        tag_list: {
			type: DataTypes.JSON,
			allowNull: false
		}
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'Wea',
		timestamps: false,
		tableName: "wea"
	});
	return wea;
};
