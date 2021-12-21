"use strict";
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define("User", {
        user_id: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
        tag_list: {
			type: DataTypes.JSON,
			allowNull: true,
			autoIncrement: false
		},
		like_list: {
			type: DataTypes.JSON,
			allowNull: true,
		},
        M_1: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		M_2: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		M_3: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		M_4: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
        local: {
			type: DataTypes.JSON,
			allowNull: true,
		}
	}, {
		underscored: true,
		freezeTableName: true,
		modelName: 'User',
		timestamps: false,
		tableName: "user"
	});
	return user;
};
