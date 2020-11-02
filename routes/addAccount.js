const Account = require("../models/Account");

exports.addAccount = async (req, res) => {
    try {
        const account = await Account.create({
            currency: req.body.currency,
            email: req.body.email,
        });

        return res.json(account);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not add job." });
    }
};
