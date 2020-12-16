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
        type: DataTypes.FLOAT(3),
        defaultValue: 0,
    },
    goldAmount: {
        type: DataTypes.FLOAT(3),
        defaultValue: 0,
    },
    fee: {
        type: DataTypes.FLOAT(3),
        defaultValue: 0,
    },
    wallet: {
        type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.BOOLEAN,
    },
});

module.exports = Transaction;
