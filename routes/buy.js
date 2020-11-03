const Account = require("../models/Account");
const User = require("../models/User");

exports.buy = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        const account = await Account.findOne({
            where: {
                email: req.user.email,
                currency: req.body.currency,
            },
        });

        await account.decrement({ balance: req.body.amount });

        await user.increment({ balance: req.body.goldAmount });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not buy." });
    }
};
