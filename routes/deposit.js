const Account = require("../models/Account");

exports.deposit = async (req, res) => {
    try {
        const account = await Account.findOne({
            where: {
                email: req.user.email,
                currency: req.body.currency,
            },
        });

        await account.increment({ balance: req.body.deposit });

        const accounts = await Account.findAll({
            where: {
                email: req.user.email,
            },
            order: [["createdAt", "ASC"]],
        });

        return res.json(accounts);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not deposit." });
    }
};
