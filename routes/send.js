const User = require("../models/User");

exports.send = async (req, res) => {
    try {
        const sender = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        const recipient = await User.findOne({
            where: {
                email: req.body.recipient,
            },
        });

        if (!recipient) {
            return res.json({ status: "Invalid recipient." });
        }

        if (req.body.amount > sender.balance) {
            return res.json({ status: "You dont have enough G1." });
        }

        await sender.decrement({ balance: req.body.amount });
        await recipient.increment({ balance: req.body.amount });

        return res.json(sender);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not send." });
    }
};
