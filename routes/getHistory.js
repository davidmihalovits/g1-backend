const Transaction = require("../models/Transaction");

exports.getHistory = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                email: req.user.email,
            },
            order: [["createdAt", "DESC"]],
        });

        return res.json(transactions);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get transactions." });
    }
};
