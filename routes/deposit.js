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

        return res.json({ status: "Deposit successful." });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not deposit." });
    }
};
