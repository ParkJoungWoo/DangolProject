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
		            star: {
				                type: DataTypes.FLOAT,
				                allowNull: false,
				            },
		            tag: {
				                type: DataTypes.JSON,
				                allowNull: true,
				            },
		            number: {
				                type: DataTypes.INTEGER,
				                allowNull: false,
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

