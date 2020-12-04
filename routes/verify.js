const User = require("../models/User");

exports.verify = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        await user.update({
            phone: req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            street: req.body.street,
            city: req.body.city,
            country: req.body.country,
            zip: req.body.zip,
            employer: req.body.employer,
            identification: req.body.identification,
            verified: true,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not verify." });
    }
};
