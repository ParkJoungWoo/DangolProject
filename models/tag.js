"use strict";
module.exports = (sequelize, DataTypes) => {
	const market = sequelize.define("Tag", {
        tag_id: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
        market_list: {
			type: DataTypes.JSON,
			allowNull: true,
			autoIncrement: false
		}
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'Tag',
		timestamps: false,
		tableName: "tag"
	});
	return tag;
};
