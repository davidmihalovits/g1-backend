const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Account = db.define("account", {
    email: {
        type: DataTypes.STRING,
    },
    currency: {
        type: DataTypes.STRING,
    },
    balance: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
});

module.exports = Account;
