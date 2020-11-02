const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Transaction = db.define("transaction", {
    email: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.STRING,
    },
    wallet: {
        type: DataTypes.STRING,
    },
});

module.exports = Transaction;
