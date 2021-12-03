"use strict";
module.exports = (sequelize, DataTypes) => {
	const pos = sequelize.define("Pos", {
		market_id: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
			primaryKey: true,
		},
        total_seat: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        now_seat: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'Pos',
		timestamps: false,
		tableName: "pos"
	});
	return pos;
};
