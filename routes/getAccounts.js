const Account = require("../models/Account");

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: {
                email: req.user.email,
            },
            order: [["createdAt", "ASC"]],
        });

        return res.json(accounts);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get accounts." });
    }
};
