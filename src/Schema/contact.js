const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectToDB");

const Contact = sequelize.define('Contact', {
    id: { type: DataTypes.NUMBER, allowNull: false, autoIncrement: true, primaryKey: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    linkedId: { type: DataTypes.NUMBER, allowNull: true },
    linkPrecedence: { 
        type: DataTypes.ENUM, 
        values: ['primary', 'secondary'], 
        allowNull: false 
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE, allowNull: true }
}, { 
    timestamps: true
});

module.exports = { Contact };
