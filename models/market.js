"use strict";
module.exports = (sequelize, DataTypes) => {
    const market = sequelize.define("Market", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true,
        modelName: 'Market',
        timestamps: true,
        tableName: "market"
    });
    return market;
};
