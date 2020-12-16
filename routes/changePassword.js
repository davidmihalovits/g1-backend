const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        const validPassword = await bcrypt.compare(
            req.body.oldPassword,
            user.password
        );

        if (!validPassword) {
            return res.json({ status: "Invalid password." });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(req.body.newPassword, salt);

        await user.update({
            password: bcryptPassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not change password." });
    }
};
