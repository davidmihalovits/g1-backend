const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    zip: {
        type: DataTypes.STRING,
    },
    identification: {
        type: DataTypes.STRING,
    },
    balance: {
        type: DataTypes.STRING,
        defaultValue: 0,
    },
});

db.sync();
module.exports = User;
