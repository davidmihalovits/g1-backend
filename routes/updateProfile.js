const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        await user.update({
            image: req.body.image,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not update profile." });
    }
};
