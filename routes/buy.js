const Account = require("../models/Account");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

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

        await Transaction.create({
            email: req.user.email,
            type: req.body.type,
            amount: req.body.amount,
            goldAmount: req.body.goldAmount,
            fee: req.body.fee,
            wallet: req.body.currency,
            completed: true,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not buy." });
    }
};
